import type { AddressInfo } from "net";
import MockAdapter from "axios-mock-adapter";

import { createApp } from "../src/app";
import { apiClient } from "../src/utils/apiClient";

const mock = new MockAdapter(apiClient);
const BASE_URL = process.env.BASE_URL || "https://api.chucknorris.io/jokes";

let baseUrl: string;
let host: string;
let server: ReturnType<ReturnType<typeof createApp>["listen"]>;

beforeAll(async () => {
  server = createApp().listen(0);
  await new Promise<void>((resolve) => server.once("listening", resolve));
  const { port } = server.address() as AddressInfo;
  host = `127.0.0.1:${port}`;
  baseUrl = `http://${host}`;
});

afterAll(async () => {
  await new Promise<void>((resolve) => server.close(() => resolve()));
});

beforeEach(() => {
  mock.reset();
  mock.onGet(`${BASE_URL}/random`).reply(200, { value: "a fact" });
});

const query = (origin?: string) =>
  fetch(`${baseUrl}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(origin ? { Origin: origin } : {}),
    },
    body: JSON.stringify({ query: "{ getChuckNorrisFact }" }),
  });

describe("CORS", () => {
  it("allows a request with no Origin at all", async () => {
    // curl, a server-to-server call, a same-origin GET.
    const res = await query();
    expect(res.status).toBe(200);
  });

  it("allows a same-origin request that still carries an Origin header", async () => {
    // The regression this guards: browsers attach Origin to same-origin
    // requests whenever the method is not GET or HEAD — which is every GraphQL
    // call. Reading a present Origin as proof of cross-origin made the deployed
    // app reject itself with a 403.
    const res = await query(`http://${host}`);

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({
      data: { getChuckNorrisFact: "a fact" },
    });
  });

  it("rejects a genuinely foreign origin with 403", async () => {
    const res = await query("https://evil.example");

    expect(res.status).toBe(403);
    await expect(res.json()).resolves.toMatchObject({
      error: "Origin is not allowed by CORS",
    });
  });

  it("allows a foreign origin once CLIENT_URL lists it", async () => {
    const previous = process.env.CLIENT_URL;
    process.env.CLIENT_URL = "https://app.example,https://other.example";

    try {
      const res = await query("https://other.example");
      expect(res.status).toBe(200);
    } finally {
      process.env.CLIENT_URL = previous;
    }
  });
});

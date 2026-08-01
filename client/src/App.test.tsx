import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import App from "./App";
import { GET_RANDOM_CHUCK_NORRIS_FACT } from "./queries/getChuckNorrisFact";

const FACT = "Chuck Norris counted to infinity. Twice.";

describe("App", () => {
  it("renders the landmarks and resolves the lazy sections", async () => {
    render(
      <MockedProvider
        mocks={[
          {
            request: { query: GET_RANDOM_CHUCK_NORRIS_FACT },
            result: { data: { getChuckNorrisFact: FACT } },
          },
        ]}
      >
        <App />
      </MockedProvider>
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(await screen.findByText(FACT)).toBeInTheDocument();
    expect(await screen.findByRole("contentinfo")).toBeInTheDocument();
  });
});

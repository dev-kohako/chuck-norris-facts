import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { GET_RANDOM_CHUCK_NORRIS_FACT } from "../../queries/getChuckNorrisFact";
import RandomFact from "./RandomFact";

const FIRST_FACT = "Chuck Norris counted to infinity. Twice.";
const SECOND_FACT = "Chuck Norris can divide by zero.";

const factMock = (value: string) => ({
  request: { query: GET_RANDOM_CHUCK_NORRIS_FACT },
  result: { data: { getChuckNorrisFact: value } },
});

describe("RandomFact", () => {
  it("renders the fact returned by the query", async () => {
    render(
      <MockedProvider mocks={[factMock(FIRST_FACT)]}>
        <RandomFact />
      </MockedProvider>
    );

    expect(await screen.findByText(FIRST_FACT)).toBeInTheDocument();
  });

  it("requests another fact when the button is pressed", async () => {
    const user = userEvent.setup();

    render(
      <MockedProvider mocks={[factMock(FIRST_FACT), factMock(SECOND_FACT)]}>
        <RandomFact />
      </MockedProvider>
    );

    await screen.findByText(FIRST_FACT);
    await user.click(
      screen.getByRole("button", { name: /get a new random chuck norris fact/i })
    );

    expect(await screen.findByText(SECOND_FACT)).toBeInTheDocument();
  });

  it("surfaces a query failure to the user", async () => {
    render(
      <MockedProvider
        mocks={[
          {
            request: { query: GET_RANDOM_CHUCK_NORRIS_FACT },
            error: new Error("upstream unavailable"),
          },
        ]}
      >
        <RandomFact />
      </MockedProvider>
    );

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "upstream unavailable"
    );
  });
});

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import { App } from "../../src/App";

afterEach(cleanup);

describe("App in a real browser", () => {
  it("supports keyboard interaction", async () => {
    const user = userEvent.setup();

    render(<App />);
    await user.tab();
    await user.keyboard("{Enter}");

    expect(
      screen.getByRole("button", { name: "Verification count: 1" }),
    ).toBeTruthy();
  });
});

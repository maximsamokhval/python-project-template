import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import { App } from "../../src/App";

afterEach(cleanup);

describe("App", () => {
  it("updates the verification count", async () => {
    const user = userEvent.setup();

    render(<App />);
    const button = screen.getByRole("button", {
      name: "Verification count: 0",
    });
    await user.click(button);

    expect(
      screen.getByRole("button", { name: "Verification count: 1" }),
    ).toBeTruthy();
  });
});

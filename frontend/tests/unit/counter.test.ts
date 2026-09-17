import { describe, expect, it } from "vitest";

import { nextCount } from "../../src/counter";

describe("nextCount", () => {
  it("increments the current count", () => {
    expect(nextCount(2)).toBe(3);
  });
});

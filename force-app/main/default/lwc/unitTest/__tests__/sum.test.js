import { sum } from "../sum";

describe("sum()", () => {
  it("should sum 1 + 2 returning 3", () => {
    expect(sum(1, 2)).toBe(3);
  });
});

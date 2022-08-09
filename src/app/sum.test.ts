import sum from "./sum";

describe("sum", () => {
  it("testing", () => {
    const result = sum(1, 1);

    expect(result).toEqual(2);
  });
});

describe("Function sortOrder", () => {
  const data = [
    { block: 1, column: 0, passenger: "", passengerSeat: "", row: 0 },
    { block: 1, column: 4, passenger: "", passengerSeat: "", row: 0 },
    { block: 1, column: 2, passenger: "", passengerSeat: "", row: 0 },
  ];
  var result = data.sort(main.sortOrder("column"));
  it("Check for correct result", () => {
    expect(result[0]).toEqual(data[0]);
  });
  it("Check for not correct result", () => {
    expect(result[0]).not.toEqual(data[1]);
  });
});
describe("function isInputValid", () => {
  it("check correct input", () => {
    expect(
      main.isInputValid(
        [
          [2, 3],
          [1, 6],
        ],
        3
      )
    ).not.toBe(false);
  });
  it("check incorrect string to array", () => {
    // expect(main.isInputValid([[NaN, 3]], 34)).toBe(false);
  });
  it("check too long string to array", () => {
    expect(
      main.isInputValid(
        [
          [2, 3],
          [1, 6],
          [2, 3],
          [1, 6],
          [2, 3],
          [1, 6],
          [2, 3],
          [1, 6],
          [2, 3],
          [1, 6],
        ],
        34
      )
    ).toBe(false);
  });
  it("check incorrect string to array", () => {
    expect(
      main.isInputValid(
        [
          [-5, 2],
          [1, 6],
        ],
        34
      )
    ).toBe(false);
  });
});

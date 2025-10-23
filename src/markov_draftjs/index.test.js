const index = require("./index");

describe("markov_draftjs", () => {
  it("exports its sample ContentState", () => {
    expect(index.length).toEqual(792);
  });
});

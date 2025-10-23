const test = require("node:test");
const assert = require("node:assert/strict");
const index = require("./index");

test("exports its sample ContentState", () => {
  assert.equal(index.length, 792);
});

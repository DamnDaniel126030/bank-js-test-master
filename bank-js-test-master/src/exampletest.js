import {describe, test, expect} from "vitest";


function sum (a, b) {
  return a + b;
}

describe("Example tests", () => {
  test("Successfull example", () => {
    expect(sum(3, 5)).toBe(8);
  });

  test("Failed example", () => {
    expect(sum(3, 5)).not.toBe(8);
  });
})



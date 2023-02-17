// const { sum } = require("../src/sum");

const express = require("express");

// test("adds 1", () => {
//   expect(sum(1, 2)).toBe(3);
// });

// test("adds 2", () => {
//   expect(sum(1, 2)).toBe(3);
// });

test("test ambil user", async () => {
  const response = await "http://localhost:5000".get("/api/users");
  expect(response.text).toBe([]);
});

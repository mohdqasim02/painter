const { describe, it, beforeEach } = require("node:test");
const { strictEqual } = require("assert");
const { Pencil } = require("../src/pencil");

describe("Pencil", () => {
  let pencil;
  beforeEach(() => {
    pencil = new Pencil({ x: 0, y: 0 }, "a");
  })

  describe("toggle", () => {
    it("should toggle the shouldDraw status of pencil", () => {
      pencil.toggle();
      strictEqual(pencil.shouldDraw, true);

      pencil.toggle();
      strictEqual(pencil.shouldDraw, false);
    });
  });
});
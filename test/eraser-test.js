const { describe, it, beforeEach } = require("node:test");
const { strictEqual } = require("assert");
const { Eraser } = require("../src/eraser");

describe("Eraser", () => {
  let eraser;
  beforeEach(() => {
    eraser = new Eraser({ x: 0, y: 0 }, "  ");
  })

  describe("toggle", () => {
    it("should toggle the shouldEraser status of eraser", () => {
      eraser.toggle();
      strictEqual(eraser.shouldErase, true);

      eraser.toggle();
      strictEqual(eraser.shouldErase, false);
    });
  });
});
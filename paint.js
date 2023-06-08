const { Canvas } = require("./src/canvas");
const { Eraser } = require("./src/eraser");
const { Pencil } = require("./src/pencil");
const { Controller } = require("./src/controller");
const { Cursor } = require("./src/cursor");
const { Position } = require("./src/position");

const MARGIN = 5;
const ICON = "▴";

const main = () => {
   const steps = {
      verticalStep: 1,
      horizontalStep: 2
   };
   const position = new Position(0, 0, steps);
   const cursor = new Cursor(position, ICON);

   const pencil = new Pencil({ x: 0, y: 0 }, "֍");
   const eraser = new Eraser({ x: 0, y: 0 }, " ");

   const [width, height] = process.stdout.getWindowSize();
   const canvas = new Canvas({ height, width }, MARGIN);

   const controller = new Controller({ pencil, eraser }, canvas, cursor, process);
   controller.start();
}

main();
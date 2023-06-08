const { Canvas } = require("./src/canvas");
const { Cursor } = require("./src/cursor");
const { Position } = require("./src/position");
const { Controller } = require("./src/controller");
const { Tool } = require("./src/tool");

const MARGIN = 5;
const ICON = "▴";

const main = () => {
   const steps = {
      verticalStep: 1,
      horizontalStep: 2
   };
   const position = new Position(0, 0, steps);
   const cursor = new Cursor(position, ICON);

   const pencil = new Tool("pencil", "P", "֍");
   const eraser = new Tool("eraser", "E", " ");

   const [width, height] = process.stdout.getWindowSize();
   const canvas = new Canvas({ height, width }, MARGIN);

   const controller = new Controller({ pencil, eraser }, canvas, cursor, process);
   controller.start();
}

main();
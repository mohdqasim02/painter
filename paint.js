const { Tool } = require("./src/tool");
const { Screen } = require("./src/screen");
const { Cursor } = require("./src/cursor");
const { Position } = require("./src/position");
const { Controller } = require("./src/controller");
const { ScreenLayer } = require("./src/screen-layer");

const MARGIN = 12;

const main = () => {
   const steps = {
      verticalStep: 1,
      horizontalStep: 2
   };
   const position = new Position(2, 1, steps);
   const cursor = new Cursor(position, "▴");

   const pencil = new Tool("pencil", "🖍", "֍");
   const eraser = new Tool("eraser", "🌫️", " ");

   const [width, height] = process.stdout.getWindowSize();

   const canvas = new ScreenLayer({ height, width }, MARGIN);
   const overlay = new ScreenLayer({ height, width }, MARGIN);
   const screen = new Screen(canvas, overlay);

   const controller = new Controller({ pencil, eraser }, screen, cursor, process);
   controller.start();
}

main();
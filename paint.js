const { Cursor } = require("./src/cursor");
const { Position } = require("./src/position");
const { Controller } = require("./src/controller");
const { Tool } = require("./src/tool");
const { ScreenLayer } = require("./src/screen-layer");
const { Screen } = require("./src/screen");

const MARGIN = 5;
const ICON = "▴";

const main = () => {
   const steps = {
      verticalStep: 1,
      horizontalStep: 2
   };
   const position = new Position(0, 0, steps);
   const cursor = new Cursor(position, ICON);

   const pencil = new Tool("pencil", "🖍", "֍");
   const eraser = new Tool("eraser", "🧽", " ");

   const [width, height] = process.stdout.getWindowSize();

   const canvas = new ScreenLayer({ height, width }, MARGIN);
   const overlay = new ScreenLayer({ height, width }, MARGIN);
   const screen = new Screen(canvas, overlay);

   const controller = new Controller({ pencil, eraser }, screen, cursor, process);
   controller.start();
}

main();
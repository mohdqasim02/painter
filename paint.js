const { Canvas } = require("./src/canvas");
const { Eraser } = require("./src/eraser");
const { Pencil } = require("./src/pencil");
const { Controller } = require("./src/controller");

const main = () => {
   const [width, height] = process.stdout.getWindowSize();
   const margin = 20;
   const canvas = new Canvas({ height, width }, margin);
   const pencil = new Pencil({ x: 0, y: 0 }, "֍");
   const eraser = new Eraser({ x: 0, y: 0 }, " ");
   const controller = new Controller({ pencil, eraser }, canvas, process);

   controller.start();
}

main();
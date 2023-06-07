const QUIT = 'q';
const DRAW = 'p';
const ERASE = "e";
const TOGGLE = "t";
const TOOLSKEYWORD = ['p', 'e'];

class Controller {
   #io;
   #tools;
   #canvas;

   constructor(tools, canvas, io) {
      this.#io = io;
      this.#canvas = canvas;
      this.#tools = { ...tools };
   }

   #chooseTool(keyPressed) {
      const toolsKeyWord = {
         p: this.#tools.pencil,
         e: this.#tools.eraser,
      }
      return toolsKeyWord[keyPressed];
   }

   #moveTool(currentTool, keyPressed) {
      switch (keyPressed) {
         case 'j': currentTool.down();
            break;
         case 'k': currentTool.up();
            break;
         case 'l': currentTool.right();
            break;
         case 'h': currentTool.left();
            break;
      }
   }

   titleBar(x, y) {
      return `\tx:${x} y:${y}`;
   }

   start() {
      const inputStream = this.#io.stdin.setRawMode(true);
      inputStream.setEncoding('utf-8');

      let currentTool = this.#chooseTool('e');

      inputStream.on('data', (keyPressed) => {
         if (keyPressed === QUIT) inputStream.destroy();
         if (keyPressed === TOGGLE) currentTool.toggle();
         if (TOOLSKEYWORD.includes(keyPressed))
            currentTool = this.#chooseTool(keyPressed);

         this.#moveTool(currentTool, keyPressed);
         currentTool.draw(this.#canvas);
         const { x, y } = currentTool.coordinates;
         this.#canvas.render(console);
         this.#canvas.title(console, this.titleBar(x, y));
         this.#io.stdout.cursorTo(x, y);

         if (inputStream._readableState.destroyed)
            console.log('ended')
      });

   }
}

exports.Controller = Controller;
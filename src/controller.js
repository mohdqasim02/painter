const QUIT = 'q';
const DRAW = 'p';
const ERASE = "e";
const TOGGLE = "t";
const TOOLSKEYWORD = ['p', 'e'];

class Controller {
   #io;
   #tools;
   #cursor;
   #canvas;

   constructor(tools, canvas, cursor, io) {
      this.#io = io;
      this.#canvas = canvas;
      this.#cursor = cursor;
      this.#tools = { ...tools };
   }

   #chooseTool(keyPressed) {
      const toolsKeyWord = {
         p: this.#tools.pencil,
         e: this.#tools.eraser,
      }
      return toolsKeyWord[keyPressed];
   }

   #moveCursor(keyPressed) {
      switch (keyPressed) {
         case 'j': this.#cursor.down();
            break;
         case 'k': this.#cursor.up();
            break;
         case 'l': this.#cursor.right();
            break;
         case 'h': this.#cursor.left();
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

         this.#moveCursor(keyPressed);
         const { x, y } = this.#cursor.coordinates;
         currentTool.draw(this.#cursor.coordinates, this.#canvas);
         this.#canvas.render(console);
         this.#canvas.title(console, this.titleBar(x, y));
         this.#io.stdout.cursorTo(x, y);

         if (inputStream._readableState.destroyed)
            console.log('ended')
      });

   }
}

exports.Controller = Controller;
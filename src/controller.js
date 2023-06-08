const QUIT = 'q';
const DRAW = 'p';
const ERASE = "e";
const TOGGLE = "t";
const TOOLSKEYWORD = ['p', 'e'];

class Controller {
   #io;
   #tools;
   #cursor;
   #screen;

   constructor(tools, screen, cursor, io) {
      this.#io = io;
      this.#screen = screen;
      this.#cursor = cursor;
      this.#tools = tools;
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

   hideCursor() {
      this.#io.stdout.write('\u001B[?25l');
   }

   start() {
      const inputStream = this.#io.stdin.setRawMode(true);
      inputStream.setEncoding('utf-8');
      this.hideCursor();

      let currentTool = this.#chooseTool('e');

      inputStream.on('data', (keyPressed) => {
         if (keyPressed === QUIT) inputStream.destroy();
         if (keyPressed === TOGGLE) currentTool.toggle();
         if (TOOLSKEYWORD.includes(keyPressed))
            currentTool = this.#chooseTool(keyPressed);

         this.#moveCursor(keyPressed);
         currentTool.draw(this.#cursor.coordinates, this.#screen.canvas);

         this.#screen.overlay.reset();
         this.#screen.overlay.put(this.#cursor.coordinates, currentTool.icon)

         this.#screen.render(console);
         this.#screen.title(console, this.#cursor.toString());

         if (inputStream._readableState.destroyed)
            console.log('ended')
      });

   }
}

exports.Controller = Controller;
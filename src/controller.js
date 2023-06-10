const VALIDKEYS = {
   QUIT: 'q',
   PENCIL: 'p',
   ERASER: "e",
   TOGGLE: "t",
   MOVES: {
      j: 'down',
      k: 'up',
      h: 'left',
      l: 'right'
   }
}

class Controller {
   #io;
   #tools;
   #cursor;
   #screen;

   constructor(tools, screen, cursor, io) {
      this.#io = io;
      this.#tools = tools;
      this.#screen = screen;
      this.#cursor = cursor;
   }

   #chooseTool(keyPressed) {
      const toolsKeyWord = {
         [VALIDKEYS.PENCIL]: this.#tools.pencil,
         [VALIDKEYS.ERASER]: this.#tools.eraser,
      }

      return toolsKeyWord[keyPressed];
   }

   #moveCursor(keyPressed) {
      const direction = VALIDKEYS.MOVES[keyPressed];
      if (direction)
         this.#cursor[direction]();
   }

   #hideCursor() {
      this.#io.stdout.write('\u001B[?25l');
   }

   #setupInputStream() {
      const inputStream = this.#io.stdin.setRawMode(true);
      inputStream.setEncoding('utf-8');
      this.#hideCursor();

      return inputStream;
   }

   #evaluateInput(keyPressed, inputStream, currentTool) {
      if (keyPressed === VALIDKEYS.QUIT) inputStream.destroy();
      if (keyPressed === VALIDKEYS.TOGGLE) currentTool.toggle();
      if ([VALIDKEYS.PENCIL, VALIDKEYS.ERASER].includes(keyPressed))
         currentTool = this.#chooseTool(keyPressed);

      this.#moveCursor(keyPressed);
      currentTool.draw(this.#cursor.coordinates, this.#screen.canvas);

      this.#screen.overlay.reset();
      this.#screen.overlay.put(this.#cursor.coordinates, currentTool.icon);

      this.#screen.render(console);
      this.#screen.title(console, this.#cursor.toString());
   }

   start() {
      let currentTool = this.#chooseTool('e');
      const inputStream = this.#setupInputStream();

      inputStream.on('data', (keyPressed) => {
         this.#evaluateInput(keyPressed, inputStream, currentTool);
      });
   }
}

exports.Controller = Controller;
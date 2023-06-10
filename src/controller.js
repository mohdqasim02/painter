const VALIDKEYS = {
   QUIT: 'q',
   PENCIL: 'p',
   ERASER: "e",
   TOGGLE: "t",
   TOOLS: ['p', 'e'],
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
   #currentTool;

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

      this.#currentTool = toolsKeyWord[keyPressed];
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

   #usage() {
      const message = "Instructions:" +
         '\n\t' + "Pressing the following keys will do:" +
         '\n\t' + `q: to quit the app ` +
         '\n\t' + `p: to select pencil ${this.#tools.pencil.icon}` +
         '\n\t' + `e: to select eraser ${this.#tools.eraser.icon}` +
         '\n\t' + "t: to toggle the current tool" +
         '\n\t' + "j: to move the tool down" +
         '\n\t' + "k: to move the tool up" +
         '\n\t' + "h: to move the tool left" +
         '\n\t' + "l: to move the tool right";

      return message;
   }

   #evaluateInput(keyPressed, inputStream) {
      if (keyPressed === VALIDKEYS.QUIT) inputStream.destroy();
      else if (keyPressed === VALIDKEYS.TOGGLE) this.#currentTool.toggle();
      else if (VALIDKEYS.TOOLS.includes(keyPressed)) this.#chooseTool(keyPressed);
      else {
         this.#moveCursor(keyPressed);
         this.#currentTool.draw(this.#cursor.coordinates, this.#screen.canvas);
      }

      this.#screen.overlay.reset();
      this.#screen.overlay.put(this.#cursor.coordinates, this.#currentTool.icon);

      this.#screen.render(console);
      this.#screen.title(console, this.#cursor.toString());
      this.#screen.title(console, this.#usage());
   }

   start() {
      this.#chooseTool('p');
      const inputStream = this.#setupInputStream();

      inputStream.on('data', (keyPressed) => {
         this.#evaluateInput(keyPressed, inputStream);
      });
   }
}

exports.Controller = Controller;
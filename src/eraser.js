class Eraser {
   #coordinates;
   #shouldErase;
   #character;

   constructor(startingPostition, eraserCharacter) {
      this.#coordinates = { ...startingPostition };
      this.#character = eraserCharacter;
      this.#shouldErase = false;
   }

   get shouldErase() {
      return this.#shouldErase;
   }

   get coordinates() {
      return this.#coordinates;
   }

   toggle() {
      this.#shouldErase = !this.#shouldErase;
   }

   up() {
      this.#coordinates.y -= 1;
   }

   down() {
      this.#coordinates.y += 1;
   }

   left() {
      this.#coordinates.x -= 2;
   }

   right() {
      this.#coordinates.x += 2;
   }

   draw(x, y, canvas) {
      if (this.#shouldErase)
         canvas.draw({ x, y }, this.#character);
   }
}

exports.Eraser = Eraser;
class Pencil {
   #coordinates;
   #shouldDraw;
   #character;

   constructor(startingPostition, characterToDraw) {
      this.#coordinates = { ...startingPostition };
      this.#character = characterToDraw;
      this.#shouldDraw = false;
   }

   get shouldDraw() {
      return this.#shouldDraw;
   }

   get coordinates() {
      return this.#coordinates;
   }

   toggle() {
      this.#shouldDraw = !this.#shouldDraw;
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
      if (this.#shouldDraw)
         canvas.draw({ x, y }, this.#character);
   }
}

exports.Pencil = Pencil;
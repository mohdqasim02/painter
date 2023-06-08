class Tool {
   #icon;
   #toolName;
   #character;
   #shouldDraw;

   constructor(name, icon, characterToDraw) {
      this.#icon = icon;
      this.#toolName = name;
      this.#shouldDraw = false;
      this.#character = characterToDraw;
   }

   toggle() {
      this.#shouldDraw = !this.#shouldDraw;
   }

   get shouldDraw() {
      return this.#shouldDraw;
   }

   get name() {
      return this.#toolName;
   }

   get icon() {
      return this.#icon;
   }

   draw(coordinate, canvas) {
      if (this.#shouldDraw)
         canvas.draw(coordinate, this.#character);
   }
}

exports.Tool = Tool;
class Eraser {
  #coordinates;
  #shouldErase;
  #character;

  constructor(startingPostition, eraserCharacter) {
    this.#coordinates = { ...startingPostition };
    this.#character = eraserCharacter;
    this.#shouldErase = false;
  }

  toggle() {
    this.#shouldErase != this.#shouldErase;
  }

  up() {
    this.#coordinates.y += 1;
  }

  down() {
    this.#coordinates.y -= 1;
  }

  left() {
    this.#coordinates.x -= 2;
  }

  right() {
    this.#coordinates.x += 2;
  }

  erase(canvas) {
    canvas.draw(this.#coordinates, this.#character);
  }
}

exports.Eraser = Eraser;
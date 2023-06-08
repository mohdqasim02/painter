class Cursor {
  #icon;
  #position;

  constructor(position, icon) {
    this.#icon = icon;
    this.#position = position;
  }

  up() {
    this.#position = this.#position.up();
  }

  down() {
    this.#position = this.#position.down();
  }

  left() {
    this.#position = this.#position.left();
  }

  right() {
    this.#position = this.#position.right();
  }

  set icon(newIcon) {
    this.#icon = newIcon;
  }

  get icon() {
    return this.#icon;
  }

  get coordinates() {
    return this.#position.coordinates();
  }
}

exports.Cursor = Cursor;
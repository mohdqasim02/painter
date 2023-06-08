class Position {
  #x;
  #y;
  #steps;

  constructor(x, y, steps) {
    this.#x = x;
    this.#y = y;
    this.#steps = steps;
  }

  left() {
    const { horizontalStep } = this.#steps;
    return new Position(this.#x - horizontalStep, this.#y, this.#steps);
  }

  right() {
    const { horizontalStep } = this.#steps;
    return new Position(this.#x + horizontalStep, this.#y, this.#steps);
  }

  up() {
    const { verticalStep } = this.#steps;
    return new Position(this.#x, this.#y - verticalStep, this.#steps);
  }

  down() {
    const { verticalStep } = this.#steps;
    return new Position(this.#x, this.#y + verticalStep, this.#steps);
  }
}

exports.Position = Position;
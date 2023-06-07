class Canvas {
   #grid;
   #height;
   #width;

   constructor(size, margin) {
      this.#height = size.height - margin;
      this.#width = size.width - margin;
      this.#grid = this.#generateGrid(this.#height, this.#width);
   }

   #generateGrid(height, width) {
      return new Array(height).fill().map(() => new Array(width).fill(' '))
   }

   draw({ x, y }, char) {
      if (x < 0 || y < 0) return;
      if (x >= this.#height || y >= this.#width) return;
      this.#grid[y][x] = char;
   }

   title(renderer, title) {
      renderer.log(title);
   }

   render(renderer) {
      renderer.clear();
      renderer.log(this.#grid.map(row => row.join('')).join('\n'));
   }
}

exports.Canvas = Canvas;
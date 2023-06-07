class Canvas {
   #grid;

   constructor(size) {
      this.#grid = this.#generateGrid(size);
   }

   #generateGrid({ height, width }) {
      return new Array(height).fill().map(() => new Array(width).fill(' '))
   }

   draw({ x, y }, char) {
      this.#grid[x][y] = char;
   }

   render(renderer) {
      renderer(this.#grid.map(row => row.join('')).join('\n'));
   }
}

exports.Canvas = Canvas;
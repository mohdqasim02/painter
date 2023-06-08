class Canvas {
   #grid;
   #height;
   #width;

   constructor(size, margin) {
      this.#width = size.width - margin;
      this.#height = size.height - margin;
      this.#grid = this.#generateGrid(this.#height, this.#width);
   }

   #generateGrid(height, width) {
      return new Array(height).fill().map(() => new Array(width).fill(' '))
   }

   #isCursorInsideCanvas({ x, y }) {
      return (x >= 0 && y >= 0) && (x < this.#height && y < this.#width);
   }

   draw(coordinates, charToDraw) {
      const { x, y } = coordinates;

      if (this.#isCursorInsideCanvas(coordinates))
         this.#grid[y][x] = charToDraw;
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
class ScreenLayer {
   #pixels;
   #height;
   #width;

   constructor(size, margin) {
      this.#height = size.height - margin;
      this.#width = size.width - margin;
      this.#pixels = this.#generateGrid(this.#height, this.#width);
   }

   #generateGrid(height, width) {
      return new Array(height).fill().map(() => new Array(width).fill(' '))
   }

   reset() {
      this.#pixels = this.#generateGrid(this.#height, this.#width);
   }

   put({ x, y }, glyph) {
      if (x < 0 || y < 0) return;
      if (x >= this.#height || y >= this.#width) return;
      this.#pixels[y][x] = glyph;
   }

   merge(otherLayer) {
      let mergedLayer = this.#generateGrid(this.#height, this.#width);

      this.#pixels.forEach((row, rowIndex) => {
         row.forEach((pixel, pixelIndex) => {
            const pixelToPut = pixel !== ' ' ? pixel : otherLayer.#pixels[rowIndex][pixelIndex];
            mergedLayer[rowIndex][pixelIndex] = pixelToPut;
         });
      });

      return mergedLayer;
   }
}

exports.ScreenLayer = ScreenLayer;
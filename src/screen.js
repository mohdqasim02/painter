class Screen {
   #pixels;
   #overlay;

   constructor(pixels, overlay) {
      this.#pixels = pixels;
      this.#overlay = overlay;
   }

   #merge() {
      return this.#overlay.merge(this.#pixels);
   }

   title(renderer, title) {
      renderer.log(title);
   }

   render(renderer) {
      const mergedLayer = this.#merge();
      renderer.clear();
      renderer.log(mergedLayer.map(row => row.join('')).join('\n'));
   }
}

exports.Screen = Screen;
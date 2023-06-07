const inputStream = process.stdin.setRawMode(true);
inputStream.setEncoding('utf-8');
console.clear();

const coordinate = {
  x: 0,
  y: 0
}

const QUIT = 'q';
const DRAW = 'c';
const ERASE = "e";
let shouldPaint = false;
let shouldErase = false;
const toggleBrush = () => shouldPaint = !shouldPaint;
const toggleEraser = () => shouldErase = !shouldErase;

inputStream.on('data', (data) => {
  if (data === QUIT) inputStream.destroy();
  if (data === DRAW) toggleBrush();
  if (data === ERASE) toggleEraser();

  updateCursorCoordinate(data, coordinate);

  if (shouldPaint) paint(coordinate, data);
  if (shouldErase) erase(coordinate, data);

  if (inputStream._readableState.destroyed) console.log('ended')
});

const paint = ({ x, y }, move) => {
  const putPixel = () => {
    if (['j', 'k', 'l', 'h'].includes(move))
      process.stdout.write('֍');
  }

  process.stdout.cursorTo(x, y, putPixel);
}

const erase = ({ x, y }, move) => {
  const putPixel = () => {
    if (['j', 'k', 'l', 'h'].includes(move))
      process.stdout.write(' ');
  }

  process.stdout.cursorTo(x, y, putPixel);
}

const updateCursorCoordinate = (data, coordinate) => {
  switch (data) {
    case 'j': coordinate.y += 1;
      break;
    case 'k': coordinate.y -= 1;
      break;
    case 'l': coordinate.x += 2;
      break;
    case 'h': coordinate.x -= 2;
      break;
  }
}
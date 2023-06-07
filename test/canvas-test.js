const { describe, it, beforeEach } = require('node:test');
const assert = require('assert');
const { Canvas } = require('../src/canvas');

const createSpyFunction = () => {
   let calls = 0;

   const fn = (...args) => {
      calls++;
      fn.calls = [...(fn.calls || []), { args }];
   }

   fn.wasCalledOnce = (...args) => {
      if (calls !== 1) return false;
      if (args.length === 0) return true;
      if (args.length != fn.calls[0].args.length) return false;
      return args.every((arg, index) => arg === fn.calls[0].args[index]);
   }

   return fn;
}

let fakeRender = {};

describe('canvas', () => {
   beforeEach(() => {
      fakeRender.log = createSpyFunction();
      fakeRender.clear = createSpyFunction();
   });

   describe('draw', () => {
      it('should draw char on given coordinate of the canvas', () => {
         const canvas = new Canvas({ height: 2, width: 2 }, 0);
         canvas.draw({ x: 1, y: 1 }, 'a');
         canvas.render(fakeRender);
         assert.ok(fakeRender.log.wasCalledOnce('  \n a'));
         assert.ok(fakeRender.clear.wasCalledOnce());
      });
   });
});
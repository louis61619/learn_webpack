(function (global, factory) {
  // 判斷commonjs
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  // 判斷amd
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  // 判斷全局變量環境
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.rennyUtils = {}));
}(this, (function (exports) { 'use strict';

  const message = "Hello Rollup";
  console.log(message);

  const sum = (num1, num2) => {
    return num1 + num2
  };

  exports.sum = sum;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

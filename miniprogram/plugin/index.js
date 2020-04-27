require("./runtime");
require("./vendors");

module.exports=(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["plugin/index"],{

/***/ "./src/plugin/index.ts":
/*!*****************************!*\
  !*** ./src/plugin/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.answer = undefined;
exports.sayHello = sayHello;

var _taroWeapp = __webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js");

var _taroWeapp2 = _interopRequireDefault(_taroWeapp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sayHello() {
  console.log('Hello plugin!');
}
var answer = exports.answer = 42;

/***/ })

},[["./src/plugin/index.ts","plugin/runtime","plugin/vendors"]]]);;
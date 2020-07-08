module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/countries/[slug].js":
/*!***********************************!*\
  !*** ./pages/countries/[slug].js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_components_CountryStatistic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../src/components/CountryStatistic */ "./src/components/CountryStatistic/index.jsx");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "D:\\personal\\react\\react_group_1\\homework2\\pages\\countries\\[slug].js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const Index = props => __jsx("div", {
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 5,
    columnNumber: 3
  }
}, __jsx(_src_components_CountryStatistic__WEBPACK_IMPORTED_MODULE_1__["default"], {
  countryData: props.countryData,
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 6,
    columnNumber: 5
  }
}));

Index.getInitialProps = async context => {
  const resposne = await axios__WEBPACK_IMPORTED_MODULE_2___default.a.get(`https://api.covid19api.com/total/country/${context.query.slug}`);
  return {
    countryData: resposne.data
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Index);

/***/ }),

/***/ "./src/components/CountryStatistic/index.jsx":
/*!***************************************************!*\
  !*** ./src/components/CountryStatistic/index.jsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_number_format__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-number-format */ "react-number-format");
/* harmony import */ var react_number_format__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_number_format__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "D:\\personal\\react\\react_group_1\\homework2\\src\\components\\CountryStatistic\\index.jsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const CountryStatistic = ({
  countryData
}) => {
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("table", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 11
    }
  }, __jsx("thead", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 15
    }
  }, __jsx("tr", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 19
    }
  }, __jsx("th", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 23
    }
  }, "\u10E5\u10D5\u10D4\u10E7\u10D0\u10DC\u10D0"), __jsx("th", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 23
    }
  }, "\u10D3\u10D0\u10D8\u10DB\u10E4\u10D8\u10EA\u10D8\u10E0\u10D4\u10D1\u10E3\u10DA\u10D8"), __jsx("th", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 23
    }
  }, "\u10D2\u10D0\u10E0\u10D3\u10D0\u10EA\u10D5\u10DA\u10D8\u10DA\u10D8"), __jsx("th", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 23
    }
  }, "\u10D2\u10D0\u10DB\u10DD\u10EF\u10D0\u10DC\u10DB\u10E0\u10D7\u10D4\u10DA\u10D4\u10D1\u10E3\u10DA"), __jsx("th", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 23
    }
  }, "\u10D7\u10D0\u10E0\u10D8\u10E6\u10D8")))), __jsx("div", {
    className: "table-wrapper",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 11
    }
  }, __jsx("table", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 13
    }
  }, __jsx("tbody", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 17
    }
  }, countryData.sort((a, b) => b.Confirmed - a.Confirmed).map((data, i) => __jsx("tr", {
    key: i,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 21
    }
  }, __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 21
    }
  }, data.Country), __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 21
    }
  }, __jsx(react_number_format__WEBPACK_IMPORTED_MODULE_1___default.a, {
    value: data.Confirmed,
    thousandSeparator: true,
    displayType: 'text',
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 25
    }
  })), __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 21
    }
  }, __jsx("span", {
    className: "red",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 25
    }
  }, __jsx(react_number_format__WEBPACK_IMPORTED_MODULE_1___default.a, {
    value: data.Deaths,
    thousandSeparator: true,
    displayType: 'text',
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 25
    }
  }))), __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 21
    }
  }, __jsx("span", {
    className: "green",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 25
    }
  }, __jsx(react_number_format__WEBPACK_IMPORTED_MODULE_1___default.a, {
    value: data.Recovered,
    thousandSeparator: true,
    displayType: 'text',
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 29
    }
  }))), __jsx("td", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 21
    }
  }, data.Date.split('T')[0])))))));
};

/* harmony default export */ __webpack_exports__["default"] = (CountryStatistic);

/***/ }),

/***/ 4:
/*!*****************************************!*\
  !*** multi ./pages/countries/[slug].js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\personal\react\react_group_1\homework2\pages\countries\[slug].js */"./pages/countries/[slug].js");


/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-number-format":
/*!**************************************!*\
  !*** external "react-number-format" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-number-format");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvY291bnRyaWVzL1tzbHVnXS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Db3VudHJ5U3RhdGlzdGljL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJheGlvc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtbnVtYmVyLWZvcm1hdFwiIl0sIm5hbWVzIjpbIkluZGV4IiwicHJvcHMiLCJjb3VudHJ5RGF0YSIsImdldEluaXRpYWxQcm9wcyIsImNvbnRleHQiLCJyZXNwb3NuZSIsImF4aW9zIiwiZ2V0IiwicXVlcnkiLCJzbHVnIiwiZGF0YSIsIkNvdW50cnlTdGF0aXN0aWMiLCJzb3J0IiwiYSIsImIiLCJDb25maXJtZWQiLCJtYXAiLCJpIiwiQ291bnRyeSIsIkRlYXRocyIsIlJlY292ZXJlZCIsIkRhdGUiLCJzcGxpdCJdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLElBQUk7UUFDSjtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7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WEEsRUFvQkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNJO0FBQU0sYUFBUyxFQUFDLE9BQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDSSxNQUFDLDBEQUFEO0FBQ0ksU0FBSyxFQUFFVCxJQUFJLENBQUNVLFNBRGhCO0FBRUkscUJBQWlCLEVBQUUsSUFGdkI7QUFHSSxlQUFXLEVBQUUsTUFIakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQURKLENBREosQ0FwQkEsRUE2QkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFLVixJQUFJLENBQUNXLElBQUwsQ0FBVUMsS0FBVixDQUFnQixHQUFoQixFQUFxQixDQUFyQixDQUFMLENBN0JBLENBREEsQ0FGSixDQURKLENBREYsQ0FiSixDQURGO0FBeURILENBM0REOztBQTZEZVgsK0VBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqRUEsa0M7Ozs7Ozs7Ozs7O0FDQUEsa0M7Ozs7Ozs7Ozs7O0FDQUEsZ0QiLCJmaWxlIjoic3RhdGljXFxkZXZlbG9wbWVudFxccGFnZXNcXGNvdW50cmllc1xcW3NsdWddLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSByZXF1aXJlKCcuLi8uLi8uLi8uLi9zc3ItbW9kdWxlLWNhY2hlLmpzJyk7XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdHZhciB0aHJldyA9IHRydWU7XG4gXHRcdHRyeSB7XG4gXHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4gXHRcdFx0dGhyZXcgPSBmYWxzZTtcbiBcdFx0fSBmaW5hbGx5IHtcbiBcdFx0XHRpZih0aHJldykgZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHR9XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDQpO1xuIiwiaW1wb3J0IENvdW50cnlTdGF0aXN0aWMgZnJvbSAnLi4vLi4vc3JjL2NvbXBvbmVudHMvQ291bnRyeVN0YXRpc3RpYydcclxuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJ1xyXG5cclxuY29uc3QgSW5kZXggPSAocHJvcHMpID0+IChcclxuICA8ZGl2ID5cclxuICAgIDxDb3VudHJ5U3RhdGlzdGljIGNvdW50cnlEYXRhPXtwcm9wcy5jb3VudHJ5RGF0YX0gLz5cclxuICA8L2Rpdj5cclxuKVxyXG5cclxuSW5kZXguZ2V0SW5pdGlhbFByb3BzID0gYXN5bmMgKGNvbnRleHQpID0+IHtcclxuICBjb25zdCByZXNwb3NuZSA9IGF3YWl0IGF4aW9zLmdldChgaHR0cHM6Ly9hcGkuY292aWQxOWFwaS5jb20vdG90YWwvY291bnRyeS8ke2NvbnRleHQucXVlcnkuc2x1Z31gKVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgY291bnRyeURhdGE6IHJlc3Bvc25lLmRhdGFcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEluZGV4XHJcbiIsIlxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgTnVtYmVyRm9ybWF0IGZyb20gJ3JlYWN0LW51bWJlci1mb3JtYXQnO1xyXG5cclxuY29uc3QgQ291bnRyeVN0YXRpc3RpYyA9ICh7IGNvdW50cnlEYXRhIH0pID0+IHtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8PlxyXG4gICAgICAgICAgPHRhYmxlPlxyXG4gICAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHRoPuGDpeGDleGDlOGDp+GDkOGDnOGDkDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8dGg+4YOT4YOQ4YOY4YOb4YOk4YOY4YOq4YOY4YOg4YOU4YOR4YOj4YOa4YOYPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgIDx0aD7hg5Lhg5Dhg6Dhg5Phg5Dhg6rhg5Xhg5rhg5jhg5rhg5g8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHRoPuGDkuGDkOGDm+GDneGDr+GDkOGDnOGDm+GDoOGDl+GDlOGDmuGDlOGDkeGDo+GDmjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8dGg+4YOX4YOQ4YOg4YOY4YOm4YOYPC90aD5cclxuICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgPC90YWJsZT5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYmxlLXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgPHRhYmxlPlxyXG4gICAgICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50cnlEYXRhLnNvcnQoKGEsIGIpID0+IGIuQ29uZmlybWVkIC0gYS5Db25maXJtZWQpLm1hcCgoZGF0YSwgaSkgPT5cclxuICAgICAgICAgICAgICAgICAgICA8dHIga2V5PXtpfT5cclxuICAgICAgICAgICAgICAgICAgICA8dGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtkYXRhLkNvdW50cnl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxOdW1iZXJGb3JtYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtkYXRhLkNvbmZpcm1lZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRob3VzYW5kU2VwYXJhdG9yPXt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheVR5cGU9eyd0ZXh0J31cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxOdW1iZXJGb3JtYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtkYXRhLkRlYXRoc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRob3VzYW5kU2VwYXJhdG9yPXt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheVR5cGU9eyd0ZXh0J31cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J2dyZWVuJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxOdW1iZXJGb3JtYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17ZGF0YS5SZWNvdmVyZWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhvdXNhbmRTZXBhcmF0b3I9e3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheVR5cGU9eyd0ZXh0J31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZD57ZGF0YS5EYXRlLnNwbGl0KCdUJylbMF19PC90ZD5cclxuICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvPlxyXG4gICAgKVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ291bnRyeVN0YXRpc3RpYztcclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtbnVtYmVyLWZvcm1hdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9
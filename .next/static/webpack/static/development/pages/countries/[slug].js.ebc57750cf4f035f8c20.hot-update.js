webpackHotUpdate("static\\development\\pages\\countries\\[slug].js",{

/***/ "./pages/countries/[slug].js":
/*!***********************************!*\
  !*** ./pages/countries/[slug].js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_components_CountryStatistic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../src/components/CountryStatistic */ "./src/components/CountryStatistic/index.jsx");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
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

_c = Index;

Index.getInitialProps = async context => {
  const resposne = await axios__WEBPACK_IMPORTED_MODULE_2___default.a.get(`https://api.covid19api.com/total/country/${context.query.slug}`);
  return {
    countryData: resposne.data
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Index);

var _c;

$RefreshReg$(_c, "Index");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports_1 = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports_1, module.i);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports_1)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports_1;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports_1)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/next/node_modules/webpack/buildin/harmony-module.js */ "./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9jb3VudHJpZXMvW3NsdWddLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwicHJvcHMiLCJjb3VudHJ5RGF0YSIsImdldEluaXRpYWxQcm9wcyIsImNvbnRleHQiLCJyZXNwb3NuZSIsImF4aW9zIiwiZ2V0IiwicXVlcnkiLCJzbHVnIiwiZGF0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7O0FBRUEsTUFBTUEsS0FBSyxHQUFJQyxLQUFELElBQ1o7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUNFLE1BQUMsd0VBQUQ7QUFBa0IsYUFBVyxFQUFFQSxLQUFLLENBQUNDLFdBQXJDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFERixDQURGOztLQUFNRixLOztBQU1OQSxLQUFLLENBQUNHLGVBQU4sR0FBd0IsTUFBT0MsT0FBUCxJQUFtQjtBQUN6QyxRQUFNQyxRQUFRLEdBQUcsTUFBTUMsNENBQUssQ0FBQ0MsR0FBTixDQUFXLDRDQUEyQ0gsT0FBTyxDQUFDSSxLQUFSLENBQWNDLElBQUssRUFBekUsQ0FBdkI7QUFFQSxTQUFPO0FBQ0xQLGVBQVcsRUFBRUcsUUFBUSxDQUFDSztBQURqQixHQUFQO0FBR0QsQ0FORDs7QUFRZVYsb0VBQWYiLCJmaWxlIjoic3RhdGljL3dlYnBhY2svc3RhdGljXFxkZXZlbG9wbWVudFxccGFnZXNcXGNvdW50cmllc1xcW3NsdWddLmpzLmViYzU3NzUwY2Y0ZjAzNWY4YzIwLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ291bnRyeVN0YXRpc3RpYyBmcm9tICcuLi8uLi9zcmMvY29tcG9uZW50cy9Db3VudHJ5U3RhdGlzdGljJ1xyXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnXHJcblxyXG5jb25zdCBJbmRleCA9IChwcm9wcykgPT4gKFxyXG4gIDxkaXYgPlxyXG4gICAgPENvdW50cnlTdGF0aXN0aWMgY291bnRyeURhdGE9e3Byb3BzLmNvdW50cnlEYXRhfSAvPlxyXG4gIDwvZGl2PlxyXG4pXHJcblxyXG5JbmRleC5nZXRJbml0aWFsUHJvcHMgPSBhc3luYyAoY29udGV4dCkgPT4ge1xyXG4gIGNvbnN0IHJlc3Bvc25lID0gYXdhaXQgYXhpb3MuZ2V0KGBodHRwczovL2FwaS5jb3ZpZDE5YXBpLmNvbS90b3RhbC9jb3VudHJ5LyR7Y29udGV4dC5xdWVyeS5zbHVnfWApXHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBjb3VudHJ5RGF0YTogcmVzcG9zbmUuZGF0YVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW5kZXhcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==
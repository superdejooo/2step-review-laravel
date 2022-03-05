(self["webpackChunk"] = self["webpackChunk"] || []).push([["/js/app"],{

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
__webpack_require__(/*! ./bootstrap */ "./resources/js/bootstrap.js");

$(function () {
  $("#input-id").rating({
    theme: 'krajee-fa',
    step: 1.0,
    showClear: false,
    showCaption: false,
    emptyStar: '<i class="fa fa-star"></i>'
  });
  $('#input-id').on('rating:change', function (event, value, caption) {
    if (value >= 3) {
      $('#step2').addClass('d-none');
    } else {
      $('#step2').removeClass('d-none');
    }
  });
});

/***/ }),

/***/ "./resources/js/bootstrap.js":
/*!***********************************!*\
  !*** ./resources/js/bootstrap.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
window._ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
/*
* Basically, the plugin I found for the rating system requires jQuery, so we'll load jQuery and bootstrap-rating plugin.
* I don't think this part is that important in my task, because I definitely applied for a backend position.
*/

__webpack_require__.g.$ = __webpack_require__.g.jQuery = jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

__webpack_require__(/*! bootstrap-star-rating */ "./node_modules/bootstrap-star-rating/js/star-rating.min.js");

__webpack_require__(/*! bootstrap-star-rating/themes/krajee-fa/theme.min */ "./node_modules/bootstrap-star-rating/themes/krajee-fa/theme.min.js");

/***/ }),

/***/ "./resources/scss/app.scss":
/*!*********************************!*\
  !*** ./resources/scss/app.scss ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["css/app","/js/vendor"], () => (__webpack_exec__("./resources/js/app.js"), __webpack_exec__("./resources/scss/app.scss")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
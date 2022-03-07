(self["webpackChunk"] = self["webpackChunk"] || []).push([["/js/app"],{

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
__webpack_require__(/*! ./bootstrap */ "./resources/js/bootstrap.js");

$(function () {
  /*
  * Initiation of bootstrap-rating plugin
  * Font Awesome is used as dependency
   */
  $("#stars_rating").rating({
    theme: 'krajee-fa',
    step: 1.0,
    showClear: false,
    showCaption: false,
    emptyStar: '<i class="fa fa-star"></i>'
  }); // Get data from data-* html properties of input

  var stars_rating = $("#stars_rating").data('review_stars');
  var min_stars = $("#stars_rating").data('min_stars');
  var link_id = $("#stars_rating").data('link_id');
  var redirect_to = $("#stars_rating").data('redirect');
  var star_count;
  $('#stars_rating').on('rating:change', function (event, value, caption) {
    star_count = value;

    if (value >= min_stars) {
      $('#step2').addClass('d-none');
    } else {
      $('#step2').removeClass('d-none');
    }
  }); // if review already have stars, disable input and set number of stars

  if (stars_rating > 0) {
    $("#stars_rating").rating('update', $("#stars_rating").data('review_stars'));
    $("#stars_rating").rating('refresh', {
      disabled: true
    });
  }

  $('body.review form').on('submit', function (e) {
    e.preventDefault();
    showLoader();

    if (stars_rating == 0) {
      axios.post('/api/review/store', {
        link_id: link_id,
        star_count: star_count,
        review_text: $('textarea[name=review_text]').val()
      }).then(function (response) {
        console.log(response.data);
        hideLoader('Success!'); // redirect to thank you or link from store settings

        if (star_count >= min_stars) {
          setTimeout(function () {
            window.location = redirect_to;
          }, 200);
        } else {
          setTimeout(function () {
            window.location = '/thank-you';
          }, 200);
        }
      })["catch"](function (error) {
        hideLoader('Error!', 'error');
        showToast(error.response.data.message);
      });
    } else {
      axios.put('/api/review/update', {
        link_id: link_id,
        review_text: $('textarea[name=review_text]').val()
      }).then(function (response) {
        console.log(response.data);
        hideLoader('Success!'); // redirect

        setTimeout(function () {
          window.location = '/thank-you';
        }, 200);
      })["catch"](function (error) {
        hideLoader('Error!', 'error');
        showToast(error.response.data.message);
      });
    }
  }); // Simple function to animate btn -> Processing..

  function showLoader() {
    $('#submit-btn').attr('disabled', 'disabled').addClass('disabled');
    $('#submit-btn span').addClass('d-none');
    $('#submit-btn div, #submit-btn div span').removeClass('d-none');
  } // Simple function to stop animation, and show that request is completed


  function hideLoader(message) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'success';

    if (type == 'success') {
      $('#submit-btn div span').html('<i class="fa fa-check"></i>').removeClass('spinner-border');
      $('#submit-btn').removeClass('btn-primary').addClass('btn-success');
      $('#submit-btn div #loader-text').text(message);
    } else {
      $('#submit-btn').removeAttr('disabled').removeClass('disabled');
      $('#submit-btn span').removeClass('d-none');
      $('#submit-btn div, #submit-btn div span').addClass('d-none');
      $('#submit-btn div #loader-text').text('Processing...');
    }
  } // Show error messages using bootstrap toast


  function showToast(message) {
    var bootstrapToast = document.getElementById('bootstrapToast'); //select id of toast

    bootstrapToast.getElementsByClassName('toast-body')[0].innerHTML = message; // set toast message

    var bsToast = new bootstrap.Toast(bootstrapToast); // initiate toast

    bsToast.show();
  }
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
window.bootstrap = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");

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
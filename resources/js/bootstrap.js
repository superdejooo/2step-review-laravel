window._ = require('lodash');

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


/*
* Basically, the plugin I found for the rating system requires jQuery, so we'll load jQuery and bootstrap-rating plugin.
* I don't think this part is that important in my task, because I definitely applied for a backend position.
*/
global.$ = global.jQuery = jQuery = require("jquery");
window.bootstrap = require('bootstrap');
require('bootstrap-star-rating');
require('bootstrap-star-rating/themes/krajee-fa/theme.min');

require('./bootstrap')



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
    });

    // Get data from data-* html properties of input
    let stars_rating = $("#stars_rating").data('review_stars');
    let min_stars = $("#stars_rating").data('min_stars');
    let link_id = $("#stars_rating").data('link_id');
    let redirect_to = $("#stars_rating").data('redirect');

    let star_count;

    $('#stars_rating').on('rating:change', function(event, value, caption) {

        star_count = value;

        if (value >= min_stars) {
            $('#step2').addClass('d-none');
        } else {
            $('#step2').removeClass('d-none');
        }
    });


    // if review already have stars, disable input and set number of stars
    if (stars_rating > 0) {
        $("#stars_rating").rating('update', $("#stars_rating").data('review_stars'));
        $("#stars_rating").rating('refresh', {disabled: true});
    }


    $('body.review form').on('submit', function (e){
        e.preventDefault();
        showLoader();

        if (stars_rating == 0) {
            axios.post('/api/review/store', {
                link_id: link_id,
                star_count: star_count,
                review_text: $('textarea[name=review_text]').val()
            })
                .then(function (response) {
                    console.log(response.data);
                    hideLoader('Success!');

                    // redirect to thank you or link from store settings
                    if (star_count >= min_stars) {
                        setTimeout(function (){
                            window.location = redirect_to;
                        }, 200)
                    } else {
                        setTimeout(function (){
                            window.location = '/thank-you';
                        }, 200)
                    }
                })
                .catch(function (error) {
                    hideLoader('Error!', 'error');
                    showToast(error.response.data.message);
                });
        } else {
            axios.put('/api/review/update', {
                link_id: link_id,
                review_text: $('textarea[name=review_text]').val()
            })
                .then(function (response) {
                    console.log(response.data);
                    hideLoader('Success!');

                    // redirect
                    setTimeout(function (){
                        window.location = '/thank-you';
                    }, 200)
                })
                .catch(function (error) {
                    hideLoader('Error!', 'error');
                    showToast(error.response.data.message);
                });
        }
    });

    // Simple function to animate btn -> Processing..
    function showLoader() {
        $('#submit-btn').attr('disabled', 'disabled').addClass('disabled');
        $('#submit-btn span').addClass('d-none');
        $('#submit-btn div, #submit-btn div span').removeClass('d-none');
    }

    // Simple function to stop animation, and show that request is completed
    function hideLoader(message, type = 'success') {

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
    }

    // Show error messages using bootstrap toast
    function showToast(message) {
        let bootstrapToast = document.getElementById('bootstrapToast'); //select id of toast
        bootstrapToast.getElementsByClassName('toast-body')[0].innerHTML = message; // set toast message

        let bsToast = new bootstrap.Toast(bootstrapToast); // initiate toast
        bsToast.show();
    }

});


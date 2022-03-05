require('./bootstrap')



$(function () {

    $("#input-id").rating({
        theme: 'krajee-fa',
        step: 1.0,
        showClear: false,
        showCaption: false,
        emptyStar: '<i class="fa fa-star"></i>'
    });

    $('#input-id').on('rating:change', function(event, value, caption) {
        if (value >= 3) {
            $('#step2').addClass('d-none');
        } else {
            $('#step2').removeClass('d-none');
        }
    });

});


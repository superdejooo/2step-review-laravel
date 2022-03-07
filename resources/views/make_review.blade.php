<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="Dejan Njezic">
    <title>2step Review</title>




    <!-- App CSS -->
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Open+Sans&display=swap" rel="stylesheet">



    <meta name="theme-color" content="#18314F">

</head>
<body class="text-center bg-primary review">

<main class="main-box p-4 bg-white">
    <form>

        <h1 class="custom-margin-bottom fw-bold main-title text-uppercase text-center text-secondary">Review Us</h1>

        <p class="mb-3 text-center main-subtitle text-primary">How was your experience at {{ $link->store->name }} yesterday?</p>

        {{--   bootstrap-rating-plugin     --}}
        {{--   all data is load in data-* attributes     --}}
        <input id="stars_rating" type="text" data-size="lg"
               data-min_stars="{{ $link->store->settings['min_stars'] }}"
               data-link_id="{{ $link->id }}"
               data-redirect="{{ $link->settings['redirect_to'] }}"
               data-review_stars="{{ $review->star_count }}"
               required>

        <div class="px-3 custom-margin-bottom @if($review->star_count > 0 && $review->star_count < $link->store->settings['min_stars']) d-block @else d-none @endif" id="step2">
            <p class="info-text custom-margin-bottom">Oh no! We hate hearing that. We'd love to hear how we can do better if you wouldn't mind sharing your thoughts with us:</p>

            <textarea name="review_text" id="review_text" cols="30" rows="4" placeholder="Type here..." class="form-control"></textarea>
        </div>

        <div class="px-4">

            <button class="w-100 btn btn-lg btn-primary text-uppercase rounded-pill mb-4 main-btn btn-primary" type="submit" id="submit-btn">
                <span>Share Feedback</span>

                {{-- Loader --}}
                <div class="d-none">
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span id="loader-text">Processing...</span>
                </div>
                {{-- Loader End --}}
            </button>

            <a class="custom-margin-bottom scnd-btn text-primary" href="#">No thanks</a>
        </div>
    </form>

    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
        <div id="bootstrapToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <div class="rounded me-2 bg-danger" style="width: 15px; height: 15px"></div>
                <strong class="me-auto">Error</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body text-start">
                Hello, world! This is a toast message.
            </div>
        </div>
    </div>
</main>

<script src="{{ mix('js/manifest.js') }}"
        rel="preconnect"
        defer
></script>
<script src="{{ mix('js/vendor.js') }}"
        rel="preconnect"
        defer
></script>
<script src="{{ mix('js/app.js') }}"
        rel="preconnect"
        defer
></script>
</body>
</html>

<?php

namespace App\Http\Controllers;

use App\Models\Link;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;

class ReviewController extends Controller
{

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector|\never
     */
    public function show($slug)
    {
        $link = Link::where('slug', $slug)->firstOrFail();

        /*
         * READ THIS
         *
         * Here we first search if there is already review in DB for that shop and user.
         * So, with this implementation, we only can have one review per user/shop.
         *
         * I think it would be much easier and cleaner if there were relation between Review and Link model. I suggest implementing link_id on model Review.
         */

        $review = Review::where([
            'store_id'  => $link->store_id,
            'user_id'   => $link->user_id,
        ])->first();

        if ($review === NULL) {
            $review = new Review();
        }

        // Check if link is expired
        if ($link->expiration_date < Date::now()->format('Y-m-d')) {
            return abort(403, 'Link Expired');
        }

        // Check if review is fully completed and if so, redirect to thank-you page
        if ($review->reviewed_at !== NULL) {
            return redirect('thank-you');
        }

        // Check if review is fully completed with more stars from settings column
        if ($review->star_count >= $link->store->settings['min_stars']) {
            return redirect($link->store->settings['redirect_to']);
        }

        return view('make_review', compact('link', 'review'));

        /*
         * END
         * READ THIS
         */
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Link;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Response;

class ReviewController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'link_id'       => 'required',
            'star_count'    => 'required'
        ]);

        $input = $request->all();

        $link = Link::where('id', $input['link_id'])->firstOrFail();

        if ($link->usage_count == 0) {
            $review = Review::create([
                'store_id'      => $link->store_id,
                'user_id'       => $link->user_id,
                'star_count'    => $input['star_count'],
                'starred_at'    => Date::now(),
                'review_text'   => $input['review_text'] != NULL ? $input['review_text'] : NULL,
                'reviewed_at'   => $input['review_text'] != NULL ? Date::now() : NULL
            ]);
        } else {
            $review = Review::where([
                'store_id'  => $link->store_id,
                'user_id'   => $link->user_id,
            ])->firstOrFail();

            $review->review_text = $input['review_text'];
            $review->review_at = Date::now();
        }

        $link->usage_count++;
        $link->save();

        //        TO DO
        //        send email ...

        return Response::JSON($review, 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update(Request $request)
    {
        $this->validate($request, [
            'link_id'       => 'required',
            'review_text'   => 'required'
        ]);

        $input = $request->all();

        // first we find link in DB
        $link = Link::where('id', $input['link_id'])->firstOrFail();

        // based on link data, we find review in DB
        $review = Review::where([
            'store_id'  => $link->store_id,
            'user_id'   => $link->user_id,
        ])->firstOrFail();

        // put new data
        $review->review_text = $input['review_text'];
        $review->reviewed_at = Date::now();
        $review->save();

        // increment link usage
        $link->usage_count++;
        $link->save();

        //        TO DO
        //        send email ...

        return Response::JSON($review, 200);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Link;
use App\Models\Store;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class LinkController extends Controller
{
    /**
     * Show the form for creating a new resource, with list of all already created
     *
     * @return \Illuminate\View\View
     */
    public function create() {
        $stores = Store::all()
        ->pluck('name', 'id');

        $users = User::all()
            ->pluck('full_name', 'id');

        $links = Link::all();

        return view('welcome', compact('stores', 'users', 'links'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'store_id'=>'required',
            'user_id' => 'required',
            'expiration_date' => 'required|date'
        ]);

        $input = $request->all();

        if ($input['slug'] == '') {
            $input['slug'] = Str::random(40);
        }
        else {
            $input['slug'] = Str::slug($input['slug'], '-');
        }

        $link = Link::create($input);

        return back();
    }
}

<?php

use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\ReviewController;
use \App\Http\Controllers\LinkController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [LinkController::class, 'create']);
Route::post('/store-link', [LinkController::class, 'store']);

Route::get('/review/{slug}', [ReviewController::class, 'show']);

Route::view('/thank-you', 'thank_you');



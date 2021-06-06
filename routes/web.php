<?php

use Illuminate\Support\Facades\Route;

/**
 * Set the default documentation version...
 */
if (! defined('DEFAULT_VERSION')) {
    define('DEFAULT_VERSION', '8.x');
}

Route::get('/', function () {
    return view('marketing');
});

Route::get('docs', 'DocsController@showRootPage');
Route::get('docs/{version}/{page?}', 'DocsController@show')->name('docs.version');

Route::get('partners', function () {
    return view('partners');
});

Route::get('/partner/tighten', function () {
    return view('community-partner-tighten');
});

Route::get('/partner/vehikl', function () {
    return view('community-partner-vehikl');
});

Route::get('/partner/kirschbaum-development-group', function () {
    return view('community-partner-kirschbaum');
});

Route::get('/partner/byte5', function () {
    return view('community-partner-byte5');
});

Route::get('/partner/64robots', function () {
    return view('community-partner-64robots');
});

Route::get('/partner/cubet', function () {
    return view('community-partner-cubet');
});

Route::get('/partner/dev-squad', function () {
    return view('community-partner-dev-squad');
});

Route::get('/partner/ideil', function () {
    return view('community-partner-ideil');
});

Route::get('/partner/cyber-duck', function () {
    return view('community-partner-cyber-duck');
});


Route::get('/discord', function () {
    return redirect('https://discord.gg/mPZNm7A');
});

Route::get('/certification', function () {
    return redirect('https://certification.laravel.com');
});

// Route::get('/partner/insider', function () {
//     return view('community-partner-insider');
// });

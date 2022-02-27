<?php

use App\Http\Controllers\DocsController;
use Illuminate\Support\Facades\Route;

/**
 * Set the default documentation version...
 */
if (! defined('DEFAULT_VERSION')) {
    define('DEFAULT_VERSION', '9.x');
}

Route::get('/', function () {
    return view('marketing');
});

Route::get('docs', [DocsController::class, 'showRootPage']);
Route::get('docs/{version}/{page?}', [DocsController::class, 'show'])->name('docs.version');

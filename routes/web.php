<?php

use App\Http\Controllers\DocsController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('marketing');
});

Route::get('docs', [DocsController::class, 'showRootPage']);
Route::get('docs/{version}/{page?}', [DocsController::class, 'show'])->name('docs.version');

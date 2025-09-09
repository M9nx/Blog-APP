<?php

use Illuminate\Support\Facades\Route;

// Test route for the React issue using CDN
Route::get('/test-react', function () {
    return view('test-react');
});

// Test route for simple React setup
Route::get('/react-test-page', function () {
    return response()->file(public_path('react-test.html'));
});

// Test route for the minimal React app
Route::get('/simple-react', function () {
    return view('simple-react');
});

// Include auth routes
require __DIR__.'/auth.php';

// Include settings routes
require __DIR__.'/settings.php';

// Main application route - serves the React SPA
Route::get('/{any?}', function () {
    return view('react-app');
})->where('any', '.*')->name('home');

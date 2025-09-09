<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

// Dashboard route for authenticated users (Inertia.js)
Route::middleware('auth')->get('/dashboard', function () {
    return Inertia::render('dashboard');
})->name('dashboard');

// Include auth routes
require __DIR__.'/auth.php';

// Include settings routes - COMMENTED OUT: Using React settings instead
// require __DIR__.'/settings.php';

// Main application route - serves the React SPA
// Settings route is now handled by React Router
Route::get('/{any?}', function () {
    return view('react-app');
})->where('any', '(?!dashboard).*')->name('home');

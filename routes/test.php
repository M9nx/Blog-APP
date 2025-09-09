<?php

use Illuminate\Support\Facades\Route;

// Test route for the React issue
Route::get('/test-react', function () {
    return view('test-react');
});

// Main application route - serves the React SPA
Route::get('/{any?}', function () {
    return view('react-app');
})->where('any', '.*')->name('home');

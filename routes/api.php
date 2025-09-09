<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\LikeController;
use App\Http\Controllers\Api\TagController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\FeedController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public posts routes (read-only)
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{post}', [PostController::class, 'show']);
Route::get('/posts/{post}/comments', [CommentController::class, 'index']);

// Public tags routes
Route::get('/tags', [TagController::class, 'index']);
Route::get('/tags/{tag}', [TagController::class, 'show']);

// Public user profile routes
Route::get('/users/{user}', [UserController::class, 'show']);
Route::get('/users/{user}/posts', [UserController::class, 'posts']);
Route::get('/users/{user}/followers', [UserController::class, 'followers']);
Route::get('/users/{user}/following', [UserController::class, 'following']);
// Legacy route support (if your frontend is using this pattern)
Route::get('/profile/{user}', [UserController::class, 'show']);

// Public feed routes
Route::get('/feed', [FeedController::class, 'index']);
Route::get('/feed/popular', [FeedController::class, 'popular']);
Route::get('/feed/trending-tags', [FeedController::class, 'trendingTags']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Posts routes
    Route::post('/posts', [PostController::class, 'store']);
    Route::put('/posts/{post}', [PostController::class, 'update']);
    Route::delete('/posts/{post}', [PostController::class, 'destroy']);

    // Comments routes
    Route::post('/posts/{post}/comments', [CommentController::class, 'store']);
    Route::post('/comments/{comment}/replies', [CommentController::class, 'storeReply']);
    Route::post('/comments/{comment}/like', [CommentController::class, 'toggleLike']);
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy']);

    // Likes routes
    Route::post('/posts/{post}/like', [LikeController::class, 'toggle']);

    // Tags management routes
    Route::post('/tags', [TagController::class, 'store']);
    Route::put('/tags/{tag}', [TagController::class, 'update']);
    Route::delete('/tags/{tag}', [TagController::class, 'destroy']);
    
    // Tag-post relationship routes
    Route::post('/tags/{tag}/attach', [TagController::class, 'attachToPost']);
    Route::post('/tags/{tag}/detach', [TagController::class, 'detachFromPost']);
    
    // Follow/Unfollow routes
    Route::post('/users/{user}/follow', [UserController::class, 'follow']);
    Route::delete('/users/{user}/follow', [UserController::class, 'unfollow']);
});

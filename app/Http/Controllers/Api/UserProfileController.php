<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class UserProfileController extends Controller
{
    public function show(User $user)
    {
        // Get published posts only
        $posts = $user->posts()
            ->where('status', 'published')
            ->whereNotNull('published_at')
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'bio' => $user->bio,
                'avatar' => $user->avatar,
                'created_at' => $user->created_at,
                'posts_count' => $posts->count(),
                'posts' => $posts
            ]
        ]);
    }

    public function posts(User $user, Request $request)
    {
        $perPage = 10;
        
        $posts = $user->posts()
            ->where('status', 'published')
            ->whereNotNull('published_at')
            ->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $posts
        ]);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class FeedController extends Controller
{
    /**
     * Display the home feed with latest published posts.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Post::published()
            ->with(['user:id,name,avatar'])
            ->withCount(['comments', 'likes'])
            ->latest('published_at');
        
        // Search functionality
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%");
            });
        }
        
        $posts = $query->paginate(10);
        
        return response()->json([
            'success' => true,
            'data' => $posts
        ]);
    }
    
    /**
     * Get popular posts (most liked/commented in the last week).
     */
    public function popular(): JsonResponse
    {
        $posts = Post::published()
            ->with(['user:id,name,avatar'])
            ->withCount(['comments', 'likes'])
            ->where('published_at', '>=', now()->subWeek())
            ->orderByDesc('likes_count')
            ->orderByDesc('comments_count')
            ->take(10)
            ->get();
        
        return response()->json([
            'success' => true,
            'data' => $posts
        ]);
    }
    
    /**
     * Get trending tags.
     */
    public function trendingTags(): JsonResponse
    {
        $tags = Tag::withCount(['posts' => function ($query) {
                $query->published()->where('published_at', '>=', now()->subWeek());
            }])
            ->having('posts_count', '>', 0)
            ->orderByDesc('posts_count')
            ->take(10)
            ->get();
        
        return response()->json([
            'success' => true,
            'data' => $tags
        ]);
    }
}

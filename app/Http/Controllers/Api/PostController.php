<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class PostController extends Controller
{
    /**
     * Display a listing of published posts.
     */
    public function index(Request $request)
    {
        $query = Post::with(['user:id,name,email'])
            ->published()
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
            'data' => [
                'posts' => $posts->items(),
                'pagination' => [
                    'current_page' => $posts->currentPage(),
                    'last_page' => $posts->lastPage(),
                    'per_page' => $posts->perPage(),
                    'total' => $posts->total(),
                ]
            ]
        ]);
    }

    /**
     * Store a newly created post.
     */
    public function store(Request $request)
    {
        $user = $request->user('sanctum');
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not authenticated'
            ], 401);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'nullable|string|max:500',
            'status' => ['required', Rule::in(['draft', 'published'])],
        ]);

        $post = Post::create([
            'title' => $request->input('title'),
            'content' => $request->input('content'),
            'excerpt' => $request->input('excerpt'),
            'status' => $request->input('status'),
            'user_id' => $user->id,
            'published_at' => $request->input('status') === 'published' ? now() : null,
        ]);

        $post->load(['user:id,name,email']);

        return response()->json([
            'success' => true,
            'message' => 'Post created successfully',
            'data' => [
                'post' => $post
            ]
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified post.
     */
    public function show(Post $post)
    {
        $post->load(['user:id,name,email,bio,avatar', 'tags', 'likes', 'comments' => function($query) {
                $query->with('user:id,name,avatar')
                      ->latest();
            }
        ]);

        return response()->json([
            'success' => true,
            'data' => [
                'post' => $post
            ]
        ]);
    }

    /**
     * Update the specified post.
     */
    public function update(Request $request, Post $post)
    {
        $user = $request->user('sanctum');
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not authenticated'
            ], 401);
        }

        // Check if user can update this post
        if ($post->user_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to update this post'
            ], Response::HTTP_FORBIDDEN);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'nullable|string|max:500',
            'status' => ['required', Rule::in(['draft', 'published'])],
        ]);

        $wasPublished = $post->status === 'published';
        $isNowPublished = $request->input('status') === 'published';

        $post->update([
            'title' => $request->input('title'),
            'content' => $request->input('content'),
            'excerpt' => $request->input('excerpt'),
            'status' => $request->input('status'),
            'published_at' => !$wasPublished && $isNowPublished ? now() : $post->published_at,
        ]);

        $post->load(['user:id,name,email']);

        return response()->json([
            'success' => true,
            'message' => 'Post updated successfully',
            'data' => [
                'post' => $post
            ]
        ]);
    }

    /**
     * Remove the specified post.
     */
    public function destroy(Request $request, Post $post)
    {
        $user = $request->user('sanctum');
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not authenticated'
            ], 401);
        }

        // Check if user can delete this post
        if ($post->user_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to delete this post'
            ], Response::HTTP_FORBIDDEN);
        }

        $post->delete();

        return response()->json([
            'success' => true,
            'message' => 'Post deleted successfully'
        ]);
    }
}

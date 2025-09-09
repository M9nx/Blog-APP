<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\CommentLike;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CommentController extends Controller
{
    /**
     * Display a listing of comments for a post.
     */
    public function index(Post $post)
    {
        $comments = $post->comments()
            ->whereNull('parent_id') // Only get top-level comments
            ->with([
                'user:id,name,avatar',
                'replies' => function ($query) {
                    $query->with('user:id,name,avatar')
                          ->orderBy('created_at', 'asc');
                }
            ])
            ->withCount(['replies'])
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'comments' => $comments
            ]
        ]);
    }

    /**
     * Store a newly created comment.
     */
    public function store(Request $request, Post $post)
    {
        $user = $request->user('sanctum');
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not authenticated'
            ], 401);
        }

        $request->validate([
            'body' => 'required|string|max:1000',
            'parent_id' => 'nullable|exists:comments,id'
        ]);

        $comment = Comment::create([
            'body' => $request->body,
            'user_id' => $user->id,
            'post_id' => $post->id,
            'parent_id' => $request->parent_id,
        ]);

        $comment->load('user:id,name,avatar');

        return response()->json([
            'success' => true,
            'message' => 'Comment created successfully',
            'data' => [
                'comment' => $comment
            ]
        ], Response::HTTP_CREATED);
    }

    /**
     * Store a reply to a comment.
     */
    public function storeReply(Request $request, Comment $comment)
    {
        $user = $request->user('sanctum');
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not authenticated'
            ], 401);
        }

        $request->validate([
            'body' => 'required|string|max:1000',
        ]);

        $reply = Comment::create([
            'body' => $request->body,
            'user_id' => $user->id,
            'post_id' => $comment->post_id,
            'parent_id' => $comment->id,
        ]);

        $reply->load('user:id,name,avatar');

        return response()->json([
            'success' => true,
            'message' => 'Reply created successfully',
            'data' => [
                'comment' => $reply
            ]
        ], Response::HTTP_CREATED);
    }

    /**
     * Like or unlike a comment.
     */
    public function toggleLike(Request $request, Comment $comment)
    {
        $user = $request->user('sanctum');
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not authenticated'
            ], 401);
        }
        
        $existingLike = CommentLike::where('user_id', $user->id)
            ->where('comment_id', $comment->id)
            ->first();

        if ($existingLike) {
            // Unlike the comment
            $existingLike->delete();
            $liked = false;
            $message = 'Comment unliked successfully';
        } else {
            // Like the comment
            CommentLike::create([
                'user_id' => $user->id,
                'comment_id' => $comment->id,
            ]);
            $liked = true;
            $message = 'Comment liked successfully';
        }

        // Get updated like count
        $likesCount = $comment->likes()->count();

        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => [
                'liked' => $liked,
                'likes_count' => $likesCount
            ]
        ]);
    }

    /**
     * Remove the specified comment.
     */
    public function destroy(Request $request, Comment $comment)
    {
        $user = $request->user('sanctum');
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not authenticated'
            ], 401);
        }

        // Check if user can delete this comment
        if ($comment->user_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to delete this comment'
            ], Response::HTTP_FORBIDDEN);
        }

        $comment->delete();

        return response()->json([
            'success' => true,
            'message' => 'Comment deleted successfully'
        ]);
    }
}

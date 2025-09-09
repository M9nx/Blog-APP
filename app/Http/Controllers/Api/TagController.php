<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class TagController extends Controller
{
    public function index(): JsonResponse
    {
        $tags = Tag::all();
        
        return response()->json([
            'success' => true,
            'data' => $tags
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:tags,name'
        ]);

        $tag = new Tag();
        $tag->name = $request->input('name');
        $tag->slug = \Illuminate\Support\Str::slug($request->input('name'));
        $tag->save();

        return response()->json([
            'success' => true,
            'data' => ['tag' => $tag]
        ], 201);
    }

    public function show(Tag $tag): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => ['tag' => $tag]
        ]);
    }

    public function update(Request $request, Tag $tag): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:tags,name,' . $tag->id
        ]);

        $tag->name = $request->input('name');
        $tag->save();

        return response()->json([
            'success' => true,
            'data' => ['tag' => $tag]
        ]);
    }

    public function destroy(Tag $tag): JsonResponse
    {
        $tag->delete();

        return response()->json([
            'success' => true,
            'message' => 'Tag deleted successfully'
        ]);
    }

    public function attachToPost(Request $request, Tag $tag): JsonResponse
    {
        $request->validate([
            'post_id' => 'required|exists:posts,id'
        ]);
        
        $post = Post::findOrFail($request->post_id);
        
        if ($post->user_id !== auth('sanctum')->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized.'
            ], 403);
        }
        
        $post->tags()->attach($tag->id);
        
        return response()->json([
            'success' => true,
            'message' => 'Tag attached to post successfully'
        ]);
    }

    public function detachFromPost(Request $request, Tag $tag): JsonResponse
    {
        $request->validate([
            'post_id' => 'required|exists:posts,id'
        ]);
        
        $post = Post::findOrFail($request->post_id);
        
        if ($post->user_id !== auth('sanctum')->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized.'
            ], 403);
        }
        
        $post->tags()->detach($tag->id);
        
        return response()->json([
            'success' => true,
            'message' => 'Tag detached from post successfully'
        ]);
    }
}

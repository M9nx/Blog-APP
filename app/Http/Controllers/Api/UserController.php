<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function show(Request $request, $id)
    {
        try {
            // First check if user exists
            $user = User::find($id);
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found'
                ], 404);
            }

            // Get authenticated user using Sanctum
            $currentUser = $request->user('sanctum');
            
            // Load relationships only if user exists
            $user->load([
                'posts' => function ($query) {
                    $query->where('status', 'published')->latest();
                },
                'followers',
                'following'
            ]);

            // Safely load posts without problematic appends if needed
            $posts = $user->posts->map(function ($post) use ($currentUser) {
                try {
                    // Only include appends if we have proper auth context
                    return [
                        'id' => $post->id,
                        'title' => $post->title,
                        'slug' => $post->slug,
                        'excerpt' => $post->excerpt,
                        'content' => $post->content,
                        'featured_image' => $post->featured_image,
                        'status' => $post->status,
                        'created_at' => $post->created_at,
                        'updated_at' => $post->updated_at,
                        'user_id' => $post->user_id,
                        'likes_count' => $post->likes_count ?? 0,
                        'comments_count' => $post->comments_count ?? 0,
                        'is_liked' => $currentUser ? $post->is_liked : false,
                    ];
                } catch (\Exception $e) {
                    // Fallback without is_liked if there's an error
                    return [
                        'id' => $post->id,
                        'title' => $post->title,
                        'slug' => $post->slug,
                        'excerpt' => $post->excerpt,
                        'content' => $post->content,
                        'featured_image' => $post->featured_image,
                        'status' => $post->status,
                        'created_at' => $post->created_at,
                        'updated_at' => $post->updated_at,
                        'user_id' => $post->user_id,
                        'likes_count' => $post->likes_count ?? 0,
                        'comments_count' => $post->comments_count ?? 0,
                        'is_liked' => false,
                    ];
                }
            });

            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'bio' => $user->bio,
                    'avatar' => $user->avatar,
                    'email_verified_at' => $user->email_verified_at,
                    'created_at' => $user->created_at,
                    'updated_at' => $user->updated_at,
                    'followers_count' => $user->followers->count(),
                    'following_count' => $user->following->count(),
                    'posts_count' => $posts->count(),
                    'is_following' => $currentUser && $currentUser->following->contains($user->id),
                    'is_own_profile' => $currentUser && $currentUser->id === $user->id,
                    'posts' => $posts
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving user data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function posts($id)
    {
        try {
            $user = User::findOrFail($id);
            // Only get published posts with pagination
            $posts = $user->posts()
                ->where('status', 'published')
                ->latest()
                ->paginate(10);

            // Transform the paginated posts
            $transformedPosts = $posts->getCollection()->map(function ($post) use ($user) {
                try {
                    return [
                        'id' => $post->id,
                        'title' => $post->title,
                        'slug' => $post->slug,
                        'excerpt' => $post->excerpt,
                        'user' => [
                            'id' => $post->user_id,
                            'name' => $user->name,
                        ],
                        'comments_count' => $post->comments_count ?? 0,
                        'likes_count' => $post->likes_count ?? 0,
                    ];
                } catch (\Exception $e) {
                    return [
                        'id' => $post->id,
                        'title' => $post->title,
                        'slug' => $post->slug,
                        'excerpt' => $post->excerpt,
                        'user' => [
                            'id' => $post->user_id,
                            'name' => $user->name,
                        ],
                        'comments_count' => 0,
                        'likes_count' => 0,
                    ];
                }
            });

            // Replace the collection with transformed posts
            $posts->setCollection($transformedPosts);

            return response()->json([
                'success' => true,
                'data' => $posts
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }
    }

    public function followers($id)
    {
        try {
            $user = User::with('followers')->findOrFail($id);
            return response()->json($user->followers);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error retrieving followers',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function following($id)
    {
        try {
            $user = User::with('following')->findOrFail($id);
            return response()->json($user->following);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error retrieving following',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function follow(Request $request, $id)
    {
        try {
            $userToFollow = User::findOrFail($id);
            $currentUser = $request->user('sanctum');

            if (!$currentUser) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }

            if ($currentUser->id === $userToFollow->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'You cannot follow yourself'
                ], 400);
            }

            if (!$currentUser->following->contains($userToFollow->id)) {
                $currentUser->following()->attach($userToFollow->id);
            }

            return response()->json([
                'success' => true,
                'message' => 'User followed successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error following user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function unfollow(Request $request, $id)
    {
        try {
            $userToUnfollow = User::findOrFail($id);
            $currentUser = $request->user('sanctum');

            if (!$currentUser) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }

            $currentUser->following()->detach($userToUnfollow->id);

            return response()->json([
                'success' => true,
                'message' => 'User unfollowed successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error unfollowing user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updateProfile(Request $request)
    {
        try {
            $user = $request->user('sanctum');

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }

            $request->validate([
                'name' => 'sometimes|required|string|max:255',
                'username' => 'sometimes|nullable|string|max:255|unique:users,username,' . $user->id,
                'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $user->id,
                'bio' => 'sometimes|nullable|string|max:1000',
            ]);

            $user->update($request->only(['name', 'username', 'email', 'bio']));

            return response()->json([
                'success' => true,
                'message' => 'Profile updated successfully',
                'data' => $user
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating profile',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updateAvatar(Request $request)
    {
        try {
            $user = $request->user('sanctum');

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }

            $request->validate([
                'avatar' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // max 5MB
            ]);

            if ($request->hasFile('avatar')) {
                $file = $request->file('avatar');
                
                // Delete old avatar if exists
                if ($user->avatar && file_exists(public_path($user->avatar))) {
                    unlink(public_path($user->avatar));
                }
                
                // Store new avatar
                $filename = time() . '_' . $user->id . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs('avatars', $filename, 'public');
                
                // Update user avatar path
                $user->update([
                    'avatar' => '/storage/' . $path
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Avatar updated successfully',
                    'data' => [
                        'avatar' => $user->avatar
                    ]
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => 'No file uploaded'
            ], 400);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating avatar',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
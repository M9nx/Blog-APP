<?php

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('guest can view comments for a post', function () {
    $user = User::factory()->create();
    $post = Post::factory()->published()->create(['user_id' => $user->id]);
    
    Comment::factory()->count(3)->create([
        'post_id' => $post->id,
        'user_id' => $user->id
    ]);

    $response = $this->getJson("/api/posts/{$post->slug}/comments");

    $response->assertStatus(200)
        ->assertJsonStructure([
            'success',
            'data' => [
                'comments' => [
                    '*' => [
                        'id',
                        'body',
                        'created_at',
                        'user' => [
                            'id',
                            'name',
                            'avatar'
                        ]
                    ]
                ]
            ]
        ]);

    $responseData = $response->json();
    expect($responseData['data']['comments'])->toHaveCount(3);
});

test('authenticated user can create a comment', function () {
    $user = User::factory()->create();
    $post = Post::factory()->published()->create(['user_id' => $user->id]);

    $commentData = [
        'body' => 'This is a test comment'
    ];

    $response = $this->actingAs($user, 'sanctum')
        ->postJson("/api/posts/{$post->slug}/comments", $commentData);

    $response->assertStatus(201)
        ->assertJsonStructure([
            'success',
            'message',
            'data' => [
                'comment' => [
                    'id',
                    'body',
                    'created_at',
                    'user'
                ]
            ]
        ]);

    $this->assertDatabaseHas('comments', [
        'body' => 'This is a test comment',
        'user_id' => $user->id,
        'post_id' => $post->id
    ]);
});

test('unauthenticated user cannot create a comment', function () {
    $user = User::factory()->create();
    $post = Post::factory()->published()->create(['user_id' => $user->id]);

    $commentData = [
        'body' => 'This is a test comment'
    ];

    $response = $this->postJson("/api/posts/{$post->slug}/comments", $commentData);

    $response->assertStatus(401);
});

test('user cannot create comment with invalid data', function () {
    $user = User::factory()->create();
    $post = Post::factory()->published()->create(['user_id' => $user->id]);

    $response = $this->actingAs($user, 'sanctum')
        ->postJson("/api/posts/{$post->slug}/comments", []);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['body']);
});

test('user can delete their own comment', function () {
    $user = User::factory()->create();
    $post = Post::factory()->published()->create(['user_id' => $user->id]);
    $comment = Comment::factory()->create([
        'user_id' => $user->id,
        'post_id' => $post->id
    ]);

    $response = $this->actingAs($user, 'sanctum')
        ->deleteJson("/api/comments/{$comment->id}");

    $response->assertStatus(200)
        ->assertJson([
            'success' => true,
            'message' => 'Comment deleted successfully'
        ]);

    $this->assertDatabaseMissing('comments', ['id' => $comment->id]);
});

test('user cannot delete another users comment', function () {
    $user1 = User::factory()->create();
    $user2 = User::factory()->create();
    $post = Post::factory()->published()->create(['user_id' => $user1->id]);
    $comment = Comment::factory()->create([
        'user_id' => $user1->id,
        'post_id' => $post->id
    ]);

    $response = $this->actingAs($user2, 'sanctum')
        ->deleteJson("/api/comments/{$comment->id}");

    $response->assertStatus(403);
});

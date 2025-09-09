<?php

use App\Models\Like;
use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('authenticated user can like a post', function () {
    $user = User::factory()->create();
    $post = Post::factory()->published()->create(['user_id' => $user->id]);

    $response = $this->actingAs($user, 'sanctum')
        ->postJson("/api/posts/{$post->slug}/like");

    $response->assertStatus(200)
        ->assertJsonStructure([
            'success',
            'message',
            'data' => [
                'liked',
                'likes_count'
            ]
        ])
        ->assertJson([
            'success' => true,
            'data' => [
                'liked' => true,
                'likes_count' => 1
            ]
        ]);

    $this->assertDatabaseHas('likes', [
        'user_id' => $user->id,
        'post_id' => $post->id
    ]);
});

test('authenticated user can unlike a post', function () {
    $user = User::factory()->create();
    $post = Post::factory()->published()->create(['user_id' => $user->id]);
    
    // First like the post
    Like::create([
        'user_id' => $user->id,
        'post_id' => $post->id
    ]);

    $response = $this->actingAs($user, 'sanctum')
        ->postJson("/api/posts/{$post->slug}/like");

    $response->assertStatus(200)
        ->assertJson([
            'success' => true,
            'data' => [
                'liked' => false,
                'likes_count' => 0
            ]
        ]);

    $this->assertDatabaseMissing('likes', [
        'user_id' => $user->id,
        'post_id' => $post->id
    ]);
});

test('unauthenticated user cannot like a post', function () {
    $user = User::factory()->create();
    $post = Post::factory()->published()->create(['user_id' => $user->id]);

    $response = $this->postJson("/api/posts/{$post->slug}/like");

    $response->assertStatus(401);
});

test('user cannot like the same post twice', function () {
    $user = User::factory()->create();
    $post = Post::factory()->published()->create(['user_id' => $user->id]);

    // Like the post first time
    $this->actingAs($user, 'sanctum')
        ->postJson("/api/posts/{$post->slug}/like");

    // Try to like the same post again (should unlike)
    $response = $this->actingAs($user, 'sanctum')
        ->postJson("/api/posts/{$post->slug}/like");

    $response->assertStatus(200)
        ->assertJson([
            'success' => true,
            'data' => [
                'liked' => false,
                'likes_count' => 0
            ]
        ]);

    $this->assertDatabaseMissing('likes', [
        'user_id' => $user->id,
        'post_id' => $post->id
    ]);
});

test('multiple users can like the same post', function () {
    $user1 = User::factory()->create();
    $user2 = User::factory()->create();
    $post = Post::factory()->published()->create(['user_id' => $user1->id]);

    // User 1 likes the post
    $this->actingAs($user1, 'sanctum')
        ->postJson("/api/posts/{$post->slug}/like")
        ->assertJson([
            'data' => ['liked' => true, 'likes_count' => 1]
        ]);

    // User 2 likes the same post
    $response = $this->actingAs($user2, 'sanctum')
        ->postJson("/api/posts/{$post->slug}/like");

    $response->assertStatus(200)
        ->assertJson([
            'data' => ['liked' => true, 'likes_count' => 2]
        ]);

    $this->assertDatabaseHas('likes', [
        'user_id' => $user1->id,
        'post_id' => $post->id
    ]);

    $this->assertDatabaseHas('likes', [
        'user_id' => $user2->id,
        'post_id' => $post->id
    ]);
});

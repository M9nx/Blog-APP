<?php

use App\Models\User;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('can list all tags', function () {
    $user = User::factory()->create();
    $tags = Tag::factory()->count(3)->create();
    
    $response = $this->getJson('/api/tags');
    
    $response->assertStatus(200)
        ->assertJsonStructure([
            'success',
            'data' => [
                '*' => ['id', 'name', 'slug']
            ]
        ]);
});

test('can create a new tag', function () {
    $user = User::factory()->create();
    
    $response = $this->actingAs($user, 'sanctum')
        ->postJson('/api/tags', [
            'name' => 'Laravel'
        ]);
    
    $response->assertStatus(201)
        ->assertJson([
            'success' => true,
            'data' => [
                'tag' => [
                    'name' => 'Laravel',
                    'slug' => 'laravel'
                ]
            ]
        ]);
    
    $this->assertDatabaseHas('tags', [
        'name' => 'Laravel',
        'slug' => 'laravel'
    ]);
});

test('cannot create duplicate tag names', function () {
    $user = User::factory()->create();
    Tag::factory()->create(['name' => 'Laravel']);
    
    $response = $this->actingAs($user, 'sanctum')
        ->postJson('/api/tags', [
            'name' => 'Laravel'
        ]);
    
    $response->assertStatus(422)
        ->assertJsonValidationErrors(['name']);
});

test('can show a tag with its posts', function () {
    $user = User::factory()->create();
    $tag = Tag::factory()->create();
    $post = Post::factory()->create(['user_id' => $user->id, 'status' => 'published']);
    $tag->posts()->attach($post);
    
    $response = $this->getJson("/api/tags/{$tag->slug}");
    
    $response->assertStatus(200)
        ->assertJsonStructure([
            'success',
            'data' => [
                'id', 'name', 'slug',
                'posts' => [
                    '*' => ['id', 'title', 'slug', 'user', 'tags']
                ]
            ]
        ]);
});

test('can update a tag', function () {
    $user = User::factory()->create();
    $tag = Tag::factory()->create(['name' => 'Old Name']);
    
    $response = $this->actingAs($user, 'sanctum')
        ->putJson("/api/tags/{$tag->slug}", [
            'name' => 'New Name'
        ]);
    
    $response->assertStatus(200)
        ->assertJson([
            'success' => true,
            'message' => 'Tag updated successfully.'
        ]);
    
    $this->assertDatabaseHas('tags', [
        'id' => $tag->id,
        'name' => 'New Name',
        'slug' => 'new-name'
    ]);
});

test('can delete a tag', function () {
    $user = User::factory()->create();
    $tag = Tag::factory()->create();
    
    $response = $this->actingAs($user, 'sanctum')
        ->deleteJson("/api/tags/{$tag->slug}");
    
    $response->assertStatus(200)
        ->assertJson([
            'success' => true,
            'message' => 'Tag deleted successfully.'
        ]);
    
    $this->assertDatabaseMissing('tags', ['id' => $tag->id]);
});

test('can attach tag to post', function () {
    $user = User::factory()->create();
    $post = Post::factory()->create(['user_id' => $user->id]);
    $tag = Tag::factory()->create();
    
    $response = $this->actingAs($user, 'sanctum')
        ->postJson("/api/tags/{$tag->slug}/attach", [
            'post_id' => $post->id
        ]);
    
    $response->assertStatus(200)
        ->assertJson([
            'success' => true,
            'message' => 'Tag attached to post successfully.'
        ]);
    
    $this->assertDatabaseHas('post_tag', [
        'post_id' => $post->id,
        'tag_id' => $tag->id
    ]);
});

test('cannot attach tag to post owned by another user', function () {
    $user1 = User::factory()->create();
    $user2 = User::factory()->create();
    $post = Post::factory()->create(['user_id' => $user2->id]);
    $tag = Tag::factory()->create();
    
    $response = $this->actingAs($user1, 'sanctum')
        ->postJson("/api/tags/{$tag->slug}/attach", [
            'post_id' => $post->id
        ]);
    
    $response->assertStatus(403)
        ->assertJson([
            'success' => false,
            'message' => 'Unauthorized.'
        ]);
});

test('can detach tag from post', function () {
    $user = User::factory()->create();
    $post = Post::factory()->create(['user_id' => $user->id]);
    $tag = Tag::factory()->create();
    $post->tags()->attach($tag);
    
    $response = $this->actingAs($user, 'sanctum')
        ->postJson("/api/tags/{$tag->slug}/detach", [
            'post_id' => $post->id
        ]);
    
    $response->assertStatus(200)
        ->assertJson([
            'success' => true,
            'message' => 'Tag detached from post successfully.'
        ]);
    
    $this->assertDatabaseMissing('post_tag', [
        'post_id' => $post->id,
        'tag_id' => $tag->id
    ]);
});

test('cannot detach tag from post owned by another user', function () {
    $user1 = User::factory()->create();
    $user2 = User::factory()->create();
    $post = Post::factory()->create(['user_id' => $user2->id]);
    $tag = Tag::factory()->create();
    $post->tags()->attach($tag);
    
    $response = $this->actingAs($user1, 'sanctum')
        ->postJson("/api/tags/{$tag->slug}/detach", [
            'post_id' => $post->id
        ]);
    
    $response->assertStatus(403)
        ->assertJson([
            'success' => false,
            'message' => 'Unauthorized.'
        ]);
});

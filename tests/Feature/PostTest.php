<?php

use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('guest can view published posts', function () {
    $user = User::factory()->create();
    
    Post::factory()->published()->count(3)->create(['user_id' => $user->id]);
    Post::factory()->draft()->count(2)->create(['user_id' => $user->id]);

    $response = $this->getJson('/api/posts');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'success',
            'data' => [
                'posts' => [
                    '*' => [
                        'id',
                        'title',
                        'slug',
                        'excerpt',
                        'status',
                        'published_at',
                        'user' => [
                            'id',
                            'name',
                            'email'
                        ]
                    ]
                ],
                'pagination'
            ]
        ]);

    $responseData = $response->json();
    expect($responseData['data']['posts'])->toHaveCount(3);
});

test('guest can view single published post', function () {
    $user = User::factory()->create();
    $post = Post::factory()->published()->create(['user_id' => $user->id]);

    $response = $this->getJson("/api/posts/{$post->slug}");

    $response->assertStatus(200)
        ->assertJsonStructure([
            'success',
            'data' => [
                'post' => [
                    'id',
                    'title',
                    'slug',
                    'content',
                    'excerpt',
                    'status',
                    'published_at',
                    'user' => [
                        'id',
                        'name',
                        'email',
                        'bio',
                        'avatar'
                    ],
                    'likes_count',
                    'comments_count',
                    'is_liked'
                ]
            ]
        ]);
});

test('authenticated user can create a post', function () {
    $user = User::factory()->create();

    $postData = [
        'title' => 'Test Post',
        'content' => 'This is test content',
        'status' => 'published'
    ];

    $response = $this->actingAs($user, 'sanctum')
        ->postJson('/api/posts', $postData);

    $response->assertStatus(201)
        ->assertJsonStructure([
            'success',
            'message',
            'data' => [
                'post' => [
                    'id',
                    'title',
                    'slug',
                    'content',
                    'excerpt',
                    'status',
                    'published_at',
                    'user'
                ]
            ]
        ]);

    $this->assertDatabaseHas('posts', [
        'title' => 'Test Post',
        'slug' => 'test-post',
        'content' => 'This is test content',
        'status' => 'published',
        'user_id' => $user->id
    ]);
});

test('unauthenticated user cannot create a post', function () {
    $postData = [
        'title' => 'Test Post',
        'content' => 'This is test content',
        'status' => 'published'
    ];

    $response = $this->postJson('/api/posts', $postData);

    $response->assertStatus(401);
});

test('user cannot create post with invalid data', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user, 'sanctum')
        ->postJson('/api/posts', []);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['title', 'content', 'status']);
});

test('user can update their own post', function () {
    $user = User::factory()->create();
    $post = Post::factory()->create(['user_id' => $user->id]);

    $updateData = [
        'title' => 'Updated Title',
        'content' => 'Updated content',
        'status' => 'published'
    ];

    $response = $this->actingAs($user, 'sanctum')
        ->putJson("/api/posts/{$post->slug}", $updateData);

    $response->assertStatus(200)
        ->assertJson([
            'success' => true,
            'message' => 'Post updated successfully'
        ]);

    $this->assertDatabaseHas('posts', [
        'id' => $post->id,
        'title' => 'Updated Title',
        'content' => 'Updated content',
        'status' => 'published'
    ]);
});

test('user cannot update another users post', function () {
    $user1 = User::factory()->create();
    $user2 = User::factory()->create();
    $post = Post::factory()->create(['user_id' => $user1->id]);

    $updateData = [
        'title' => 'Updated Title',
        'content' => 'Updated content',
        'status' => 'published'
    ];

    $response = $this->actingAs($user2, 'sanctum')
        ->putJson("/api/posts/{$post->slug}", $updateData);

    $response->assertStatus(403);
});

test('user can delete their own post', function () {
    $user = User::factory()->create();
    $post = Post::factory()->create(['user_id' => $user->id]);

    $response = $this->actingAs($user, 'sanctum')
        ->deleteJson("/api/posts/{$post->slug}");

    $response->assertStatus(200)
        ->assertJson([
            'success' => true,
            'message' => 'Post deleted successfully'
        ]);

    $this->assertDatabaseMissing('posts', ['id' => $post->id]);
});

test('user cannot delete another users post', function () {
    $user1 = User::factory()->create();
    $user2 = User::factory()->create();
    $post = Post::factory()->create(['user_id' => $user1->id]);

    $response = $this->actingAs($user2, 'sanctum')
        ->deleteJson("/api/posts/{$post->slug}");

    $response->assertStatus(403);
});

test('posts can be searched', function () {
    $user = User::factory()->create();
    
    Post::factory()->published()->create([
        'title' => 'Laravel Tutorial',
        'content' => 'Learn Laravel framework',
        'user_id' => $user->id
    ]);
    
    Post::factory()->published()->create([
        'title' => 'React Guide',
        'content' => 'Learn React library',
        'user_id' => $user->id
    ]);

    $response = $this->getJson('/api/posts?search=Laravel');

    $response->assertStatus(200);
    
    $responseData = $response->json();
    expect($responseData['data']['posts'])->toHaveCount(1);
    expect($responseData['data']['posts'][0]['title'])->toBe('Laravel Tutorial');
});

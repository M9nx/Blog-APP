<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserProfileTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_view_user_profile()
    {
        $user = User::factory()->create([
            'name' => 'John Doe',
            'bio' => 'Software Developer',
            'avatar' => 'avatar.jpg'
        ]);
        
        $post = Post::factory()->create([
            'user_id' => $user->id,
            'status' => 'published',
            'published_at' => now()
        ]);
        
        $response = $this->getJson("/api/users/{$user->id}");
        
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'id' => $user->id,
                    'name' => 'John Doe',
                    'bio' => 'Software Developer',
                    'avatar' => 'avatar.jpg',
                    'posts_count' => 1
                ]
            ])
            ->assertJsonStructure([
                'success',
                'data' => [
                    'id', 'name', 'bio', 'avatar', 'created_at', 'posts_count', 'posts'
                ]
            ]);
    }

    public function test_user_profile_only_shows_published_posts()
    {
        $user = User::factory()->create();
        
        // Create published and draft posts
        Post::factory()->create(['user_id' => $user->id, 'status' => 'published', 'published_at' => now()]);
        Post::factory()->create(['user_id' => $user->id, 'status' => 'draft']);
        
        $response = $this->getJson("/api/users/{$user->id}");
        
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'posts_count' => 1
                ]
            ]);
    }

    public function test_can_view_user_posts_with_pagination()
    {
        $user = User::factory()->create();
        
        // Create multiple published posts
        Post::factory()->count(15)->create([
            'user_id' => $user->id,
            'status' => 'published',
            'published_at' => now()
        ]);
        
        $response = $this->getJson("/api/users/{$user->id}/posts");

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    'data' => [
                        '*' => ['id', 'title', 'slug', 'excerpt', 'user', 'comments_count', 'likes_count']
                    ],
                    'current_page',
                    'per_page',
                    'total'
                ]
            ]);
            
        $data = $response->json('data');
        $this->assertEquals(10, $data['per_page']);
        $this->assertCount(10, $data['data']);
        $this->assertEquals(15, $data['total']);
    }

    public function test_user_posts_include_relationships_and_counts()
    {
        $user = User::factory()->create();
        $post = Post::factory()->create([
            'user_id' => $user->id,
            'status' => 'published',
            'published_at' => now()
        ]);
        
        $response = $this->getJson("/api/users/{$user->id}/posts");
        
        $response->assertStatus(200);
        // Add assertions for relationships and counts
    }

    public function test_returns_404_for_non_existent_user()
    {
        $response = $this->getJson('/api/users/999');
        
        $response->assertStatus(404);
    }

    public function test_returns_404_for_non_existent_user_posts()
    {
        $response = $this->getJson('/api/users/999/posts');
        
        $response->assertStatus(404);
    }
}

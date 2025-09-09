<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Post;
use App\Models\Comment;
use App\Models\Like;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create test users with proper bio data
        $testUser = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'bio' => 'I am a passionate developer who loves to write about technology and share knowledge with the community.',
            'avatar' => null,
        ]);

        $johnDoe = User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'bio' => 'Full-stack developer with expertise in Laravel, React, and modern web technologies.',
            'avatar' => null,
        ]);

        // Create some sample posts
        $posts = [
            [
                'title' => 'Welcome to Our Blog',
                'content' => 'This is our first blog post! We\'re excited to share our thoughts and ideas with you. In this post, we\'ll introduce you to what we\'re all about and what you can expect from our content going forward.',
                'status' => 'published',
                'published_at' => now(),
                'user_id' => $testUser->id,
            ],
            [
                'title' => 'Getting Started with Laravel',
                'content' => 'Laravel is an amazing PHP framework that makes web development a joy. In this tutorial, we\'ll walk through the basics of setting up a Laravel application, creating models, controllers, and views. We\'ll also cover routing and middleware.',
                'status' => 'published',
                'published_at' => now()->subDays(1),
                'user_id' => $johnDoe->id,
            ],
            [
                'title' => 'React and Modern Frontend Development',
                'content' => 'React has revolutionized how we build user interfaces. With its component-based architecture and virtual DOM, React makes it easy to build complex, interactive web applications. Let\'s explore some of the key concepts and best practices.',
                'status' => 'published',
                'published_at' => now()->subDays(2),
                'user_id' => $testUser->id,
            ],
            [
                'title' => 'Building APIs with Laravel Sanctum',
                'content' => 'Laravel Sanctum provides a featherweight authentication system for SPAs, mobile applications, and simple, token-based APIs. In this guide, we\'ll show you how to set up authentication for your React frontend.',
                'status' => 'published',
                'published_at' => now()->subDays(3),
                'user_id' => $johnDoe->id,
            ],
            [
                'title' => 'Draft Post - Coming Soon',
                'content' => 'This is a draft post that hasn\'t been published yet. Only the author can see this in their dashboard.',
                'status' => 'draft',
                'published_at' => null,
                'user_id' => $testUser->id,
            ],
        ];

        foreach ($posts as $postData) {
            $post = Post::factory()->create($postData);

            // Add some likes to published posts
            if ($post->status === 'published') {
                // Create unique likes (user can only like once)
                if (rand(0, 1)) {
                    Like::factory()->create([
                        'post_id' => $post->id,
                        'user_id' => $testUser->id,
                    ]);
                }
                if (rand(0, 1)) {
                    Like::factory()->create([
                        'post_id' => $post->id,
                        'user_id' => $johnDoe->id,
                    ]);
                }

                // Add some comments
                $commentCount = rand(1, 3);
                for ($i = 0; $i < $commentCount; $i++) {
                    Comment::factory()->create([
                        'post_id' => $post->id,
                        'user_id' => rand(1, 2) === 1 ? $testUser->id : $johnDoe->id,
                        'body' => 'This is a great post! Thanks for sharing your insights.',
                    ]);
                }
            }
        }
    }
}

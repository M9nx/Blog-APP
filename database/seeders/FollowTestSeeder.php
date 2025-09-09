<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class FollowTestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create test users if they don't exist
        $users = [];
        
        $testUsers = [
            ['name' => 'John Doe', 'email' => 'john@example.com', 'bio' => 'Software developer and tech enthusiast'],
            ['name' => 'Jane Smith', 'email' => 'jane@example.com', 'bio' => 'UI/UX designer creating beautiful interfaces'],
            ['name' => 'Bob Johnson', 'email' => 'bob@example.com', 'bio' => 'Full-stack developer with 10+ years experience'],
            ['name' => 'Alice Brown', 'email' => 'alice@example.com', 'bio' => 'Data scientist exploring machine learning'],
            ['name' => 'Charlie Wilson', 'email' => 'charlie@example.com', 'bio' => 'DevOps engineer automating everything'],
        ];

        foreach ($testUsers as $userData) {
            $user = User::firstOrCreate(
                ['email' => $userData['email']],
                [
                    'name' => $userData['name'],
                    'bio' => $userData['bio'],
                    'password' => Hash::make('password'),
                ]
            );
            $users[] = $user;
        }

        // Create some follow relationships
        if (count($users) >= 3) {
            // Make first user follow others
            $users[0]->follow($users[1]);
            $users[0]->follow($users[2]);
            $users[0]->follow($users[3]);

            // Make others follow first user
            $users[1]->follow($users[0]);
            $users[2]->follow($users[0]);
            
            // Create some cross-follows
            $users[1]->follow($users[2]);
            $users[2]->follow($users[3]);
        }

        $this->command->info('Created test users and follow relationships');
    }
}

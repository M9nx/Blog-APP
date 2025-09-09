<?php

require 'vendor/autoload.php';
$app = require 'bootstrap/app.php';

echo "Testing Tag model...\n";

try {
    $tag = new App\Models\Tag();
    echo "Tag model loaded successfully.\n";
    echo "Posts method exists: " . (method_exists($tag, 'posts') ? 'YES' : 'NO') . "\n";
    
    // Test the relationship
    $reflection = new ReflectionClass($tag);
    $methods = $reflection->getMethods(ReflectionMethod::IS_PUBLIC);
    echo "Public methods: ";
    foreach ($methods as $method) {
        if ($method->class === 'App\Models\Tag') {
            echo $method->name . " ";
        }
    }
    echo "\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}

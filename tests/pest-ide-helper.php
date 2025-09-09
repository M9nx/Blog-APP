<?php

/**
 * This file provides IDE support for Pest test functions.
 * It helps static analysis tools understand the context of test methods.
 */

use Illuminate\Foundation\Testing\TestCase;
use Tests\TestCase as BaseTestCase;

// Pest IDE helper functions
if (!function_exists('test')) {
    function test(string $description, callable $closure = null): void {}
}

if (!function_exists('it')) {
    function it(string $description, callable $closure = null): void {}
}

if (!function_exists('uses')) {
    function uses(...$traits): void {}
}

if (!function_exists('expect')) {
    function expect($value) {
        return new \Pest\Expectation($value);
    }
}

// Additional Pest functions
if (!function_exists('beforeEach')) {
    function beforeEach(callable $closure): void {}
}

if (!function_exists('afterEach')) {
    function afterEach(callable $closure): void {}
}

if (!function_exists('beforeAll')) {
    function beforeAll(callable $closure): void {}
}

if (!function_exists('afterAll')) {
    function afterAll(callable $closure): void {}
}

if (!function_exists('skip')) {
    function skip(string $reason = ''): void {}
}

if (!function_exists('todo')) {
    function todo(string $description = ''): void {}
}

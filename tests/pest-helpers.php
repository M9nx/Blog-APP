<?php

/**
 * This file helps IDE understand Pest test context
 */

// Add this to your test files to help with IDE completion
use Tests\TestCase;

if (!class_exists('PestTestCase')) {
    class PestTestCase extends TestCase {
        // This class helps IDEs understand test context
    }
}

/**
 * Global test helper functions with proper type hints
 */

/**
 * @param string $description
 * @param callable(): void|null $closure
 */
function test(string $description, ?callable $closure = null): void {}

/**
 * @param string $description  
 * @param callable(): void|null $closure
 */
function it(string $description, ?callable $closure = null): void {}

/**
 * @param mixed ...$traits
 */
function uses(...$traits): void {}

/**
 * @param mixed $value
 * @return \Pest\Expectation
 */
function expect($value) {}

/**
 * @param callable(): void $closure
 */
function beforeEach(callable $closure): void {}

/**
 * @param callable(): void $closure
 */
function afterEach(callable $closure): void {}

/**
 * @param string $reason
 */
function skip(string $reason = ''): void {}

// Add test method signatures that IDEs can understand
if (false) {
    /**
     * @mixin \Illuminate\Foundation\Testing\TestCase
     */
    class TestHelper {
        public function actingAs($user, ?string $guard = null) {}
        public function getJson(string $uri, array $headers = []) {}
        public function postJson(string $uri, array $data = [], array $headers = []) {}
        public function putJson(string $uri, array $data = [], array $headers = []) {}
        public function patchJson(string $uri, array $data = [], array $headers = []) {}
        public function deleteJson(string $uri, array $data = [], array $headers = []) {}
        public function assertDatabaseHas(string $table, array $data) {}
        public function assertDatabaseMissing(string $table, array $data) {}
        public function assertJson(array $data) {}
        public function assertJsonStructure(array $structure) {}
        public function assertStatus(int $status) {}
        public function assertRedirect(?string $uri = null) {}
        public function assertSessionHas($key, $value = null) {}
        public function assertSessionHasErrors($keys = []) {}
        public function assertSessionHasNoErrors() {}
        public function from(string $url) {}
        public function withHeaders(array $headers) {}
    }
}

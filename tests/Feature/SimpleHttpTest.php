<?php

use Illuminate\Http\Client\Response;

// Test endpoint using Illuminate HTTP Client
test('can use illuminate http client', function () {
    $response = \Illuminate\Support\Facades\Http::get('https://httpbin.org/status/200');
    expect($response->status())->toBe(200);
});

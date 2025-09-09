<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SpaPathRewrite
{
    /**
     * Handle an incoming request for SPA paths.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // If the request starts with /settings, serve the SPA
        if (str_starts_with($request->getPathInfo(), '/settings')) {
            return response()->view('react-app');
        }

        return $next($request);
    }
}

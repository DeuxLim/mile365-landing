<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Middleware\HandleCors;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Foundation\Http\Middleware\ValidateCsrfToken;

return Application::configure(basePath: dirname(__DIR__))
    ->withCommands()
    ->withRouting(
        api: [
            __DIR__ . '/../routes/api.php',
            __DIR__ . '/../routes/landing.php',
        ],
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->append(HandleCors::class);
        $middleware->encryptCookies(except: ['XSRF-TOKEN']);
        $middleware->api();
        // Railway + Vercel runs cross-site (different eTLD+1), so we need
        // SameSite=None cookies for session-based auth. Sanctum's
        // EnsureFrontendRequestsAreStateful forces SameSite=Lax which breaks
        // cross-site requests, so we explicitly enable cookie + session +
        // CSRF middleware for API routes instead.
        $middleware->prependToGroup('api', [
            EncryptCookies::class,
            AddQueuedCookiesToResponse::class,
            StartSession::class,
        ]);
        $middleware->appendToGroup('api', ValidateCsrfToken::class);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (AuthenticationException $e, $request) {
            return response()->json([
                'message' => 'Unauthenticated'
            ], 401);
        });
    })->create();

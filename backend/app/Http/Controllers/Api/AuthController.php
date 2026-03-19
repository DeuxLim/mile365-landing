<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
            'token_name' => ['nullable', 'string', 'max:255'],
        ]);

        if (!Auth::attempt([
            'email' => $credentials['email'],
            'password' => $credentials['password'],
        ])) {
            return response()->json([
                'message' => 'The provided credentials are incorrect.',
            ], 401);
        }

        $user = $request->user();

        if ($user->status !== 'active') {
            Auth::logout();
            return response()->json([
                'message' => 'Inactive users cannot access.',
            ], 403);
        }

        if (!Gate::forUser($user)->allows('admin_access')) {
            Auth::logout();

            return response()->json([
                'message' => 'You are not authorized to access admin.',
            ], 403);
        }

        $user->tokens()->delete();
        $token = $user->createToken($request->token_name ?? 'web-token');

        return response()->json([
            'message' => 'Login successful',
            'token' => $token->plainTextToken,
            'user' => $user->only(['id', 'email', 'first_name', 'last_name']),
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()?->delete();

        return response()->json([
            'message' => 'Logged out successfully',
        ]);
    }

    public function me(Request $request)
    {
        return response()->json([
            'user' => $request->user(),
        ]);
    }
}

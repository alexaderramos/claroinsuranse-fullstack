<?php

namespace Src\Auth\Infrastructure\Controllers;


use Illuminate\Http\Request;

class LoginController
{

    public function __invoke(Request $request): \Illuminate\Http\JsonResponse
    {
        $credentials = $request->only('email', 'password');
        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }
        return $this->respondWithToken($token);
    }

    protected function respondWithToken($token): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}

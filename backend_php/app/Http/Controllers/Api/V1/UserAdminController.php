<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserAdminRequest;
use App\Http\Requests\UpdateUserAdminRequest;
use App\Models\UserAdmin;
use App\Http\Resources\UserAdminResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;

class UserAdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return UserAdminResource::collection(UserAdmin::all());
    }

    /**
     * Display the specified resource.
     */
    public function show(UserAdmin $userAdmin)
    {
        return UserAdminResource::make($userAdmin);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserAdminRequest $request, UserAdmin $userAdmin)
    {
        $userAdmin->update($request->validated());
        return UserAdminResource::make($userAdmin);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserAdmin $userAdmin)
    {
        $userAdmin->delete();
        return response()->noContent();
    }

    /**
     * Login user and create token
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = UserAdmin::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password_hash)) {
            return response()->json([
                'message' => 'The provided credentials are incorrect.'
            ], 401);
        }

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ]);
    }

    public function register(Request $request)
    {
        $user = UserAdmin::create([
            'email' => $request->email,
            'password_hash' => Hash::make($request->password),
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ]);
    }

    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return response()->json([
            'access_token' => auth()->refresh(),
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Kreait\Firebase\Factory;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log; 

class AuthController extends Controller
{
    public function facebookAuth(Request $request)
    {
        $request->validate([
            'idToken' => 'required|string',
        ]);

        try {
            Log::info('Starting Facebook authentication'); // Log start


            $firebase = (new Factory)->withServiceAccount(storage_path('shkolo-interview-movie-app-firebase-adminsdk-fbsvc-c12180b921.json'));
            $auth = $firebase->createAuth();
            
            $verifiedIdToken = $auth->verifyIdToken($request->idToken);
            $uid = $verifiedIdToken->claims()->get('sub');
            $firebaseUser = $auth->getUser($uid);

            Log::info('Firebase user retrieved', [
                'uid' => $uid,
                'email' => $firebaseUser->email,
                'displayName' => $firebaseUser->displayName,
            ]);

            $user = User::updateOrCreate(
                ['email' => $firebaseUser->email],
                [
                    'name' => $firebaseUser->displayName,
                    'email' => $firebaseUser->email,
                    'firebase_uid' => $uid,
                    'password' => Hash::make(str_random(16)),
                ]
            );

            $token = $user->createToken('auth_token')->plainTextToken;

            Log::info('Token created successfully', ['token' => $token]);

            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
            ]);
        } catch (\Exception $e) {

            Log::error('Authentication failed', ['error' => $e->getMessage()]);
            
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }
}
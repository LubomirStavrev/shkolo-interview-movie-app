<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Kreait\Firebase\Factory;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class FacebookAuthController extends Controller
{
    public function authenticate(Request $request)
    {
        Log::info('Facebook auth request received', [
            'headers' => $request->headers->all(),
            'token_length' => strlen($request->input('idToken', '')),
        ]);

        try {
            $request->validate([
                'idToken' => 'required|string',
            ]);

            Log::info('Starting Facebook authentication');

            try {
                $credentialsPath = base_path('shkolo-interview-movie-app-firebase-adminsdk-fbsvc-c12180b921.json');
                Log::info('Loading Firebase credentials from: ' . $credentialsPath);
                
                if (!file_exists($credentialsPath)) {
                    throw new \Exception('Firebase credentials file not found at: ' . $credentialsPath);
                }

                // Simplified Firebase initialization
                $firebase = (new Factory)->withServiceAccount($credentialsPath);
                $auth = $firebase->createAuth();
                Log::info('Firebase initialized successfully');
            } catch (\Exception $e) {
                Log::error('Firebase initialization failed', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString(),
                    'path' => $credentialsPath
                ]);
                return response()->json(['error' => 'Firebase initialization failed: ' . $e->getMessage()], 500);
            }

            // Verify token
            try {
                $verifiedIdToken = $auth->verifyIdToken($request->idToken);
                Log::info('Token verified successfully');
            } catch (\Exception $e) {
                Log::error('Token verification failed', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);
                return response()->json(['error' => 'Token verification failed: ' . $e->getMessage()], 401);
            }

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
                    'password' => Hash::make(Str::random(16)),
                ]
            );

            $token = $user->createToken('auth_token')->plainTextToken;

            Log::info('Authentication successful', [
                'user_id' => $user->id,
            ]);

            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
            ]);

        } catch (\Exception $e) {
            Log::error('Authentication failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'error' => 'Authentication failed: ' . $e->getMessage()
            ], 500);
        }
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MainController extends Controller
{
    public function signUp(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|min:3|max:8',
            'phoneNumber' => 'required|numeric|digits:10',
            'password' => 'required|min:3|max:15',
        ]);
        $user = User::where('phoneNumber', $data['phoneNumber'])->first();
        if ($user) {
            return response()->json(['message' => 'this phone number already used'], 500);
        } else {
            return response()->json([
                'message' => 'registered successfuly',
                'status' => 201,
            ], 201);
        }
    }
    public function verify(Request $request)
    {
        $data = $request->validate([
            'otp' => 'required|numeric',
            'name' => 'required|min:3|max:8',
            'phoneNumber' => 'required|numeric|digits:10',
            'password' => 'required|min:3|max:15',
        ]);
        if ($data['otp'] == '1234') {
            $user = new User;
            $user->phoneNumber = $data['phoneNumber'];
            $user->name = $data['name'];
            $user->password = $data['password'];
            if ($user->save()) {
                return response()->json([
                    'message' => 'verified',
                    'status' => 201,
                ], 201);
            } else {
                return response()->json([
                    'message' => 'can not verified',
                    'status' => 500,
                ], 500);
            }
        } else {
            return response()->json([
                'message' => 'otp not matching'
            ], 500);
        }
    }
    public function login(Request $request)
    {
        $request->validate([
            'phone' => 'required',
            'password' => 'required',
        ]);
        $phone = $request->input('phone');
        $password = $request->input('password');

        $user = User::where('phoneNumber', $request->phone)->first();

        if (Auth::attempt(['phoneNumber' => $phone, 'password' => $password])) {

            return response()->json([
                'message' => 'log in succefully'
            ], 201);
        } else {

            return response()->json([
                'message' => 'can not log in succefully'
            ], 500);
        }
    }
}

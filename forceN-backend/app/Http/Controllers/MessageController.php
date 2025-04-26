<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function index(User $user)
    {
        $authId = Auth::id();

        $messages = Message::where(function ($query) use ($authId, $user) {
            $query->where('sender_id', $authId)->where('receiver_id', $user->id);
        })->orWhere(function ($query) use ($authId, $user) {
            $query->where('sender_id', $user->id)->where('receiver_id', $authId);
        })->orderBy('created_at')->get();

        return response()->json($messages);
    }

    public function store(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'message' => 'required|string',
        ]);

        $message = Message::create([
            'sender_id' => Auth::id(),
            'receiver_id' => $request->receiver_id,
            'message' => $request->message,
        ]);

        return response()->json($message, 201);
    }
}
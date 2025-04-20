<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getMentors()
    {
        // Supposons que les mentors ont un rôle "mentor" dans la base de données
        $mentors = User::where('role', 'mentor')->get(['id', 'firstname', 'name']);
        return response()->json($mentors);
    }
}
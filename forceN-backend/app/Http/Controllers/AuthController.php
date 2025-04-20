<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Connexion de l'utilisateur.
     */
    public function login(Request $request)
    {

        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);


        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Identifiants incorrects'
            ], 401);
        }


        $token = $user->createToken('auth_token')->plainTextToken;


        return response()->json([
            'user' => $user,
            'token' => $token,
            'role' => $user->role,
            'message' => ''
        ], 200);
    }

    /**
     * Afficher la liste des utilisateurs.
     */
    public function index()
    {
        return response()->json(User::all(), 200);
    }

    /**
     * Créer un nouvel utilisateur.
     */
    public function store(Request $request)
    {
        // Validation des données entrantes
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'firstname' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => [
                'required',
                'string',
                'min:8',                // Min 8 caractères
                'regex:/^[A-Z]/',       // Doit commencer par une majuscule
                'regex:/[a-z]/',        // Doit contenir une minuscule
                'regex:/\d/',           // Doit contenir un chiffre
                'regex:/[@$!%*?&]/'     // Doit contenir un caractère spécial
            ],
            'role' => ['required', Rule::in(['admin', 'consultant', 'mentor', 'comptable'])],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Création de l'utilisateur
        $user = User::create([
            'name' => $request->name,
            'firstname' => $request->firstname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        return response()->json(['message' => 'Utilisateur créé avec succès', 'user' => $user], 201);
    }

    /**
     * Afficher un utilisateur spécifique.
     */
    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }
        return response()->json($user, 200);
    }
    public function user(Request $request)
    {
        return response()->json($request->user(), 200);
    }
    /**
     * Déconnexion de l'utilisateur.
     */
    public function logout(Request $request)
    {
        $user = $request->user(); // Récupérer l'utilisateur authentifié

        if ($user) {
            $user->tokens()->delete(); // Révoquer tous les tokens de l'utilisateur
            return response()->json(['message' => 'Déconnexion réussie'], 200);
        }

        return response()->json(['message' => 'Aucun utilisateur authentifié'], 401);
    }

    /**
     * Mettre à jour un utilisateur.
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }

        // Validation des données
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'firstname' => 'sometimes|string|max:255',
            'email' => ['sometimes', 'email', Rule::unique('users')->ignore($user->id)],
            'password' => [
                'nullable',
                'string',
                'min:8',
                'regex:/^[A-Z]/',
                'regex:/[a-z]/',
                'regex:/\d/',
                'regex:/[@$!%*?&]/'
            ],
            'role' => ['sometimes', Rule::in(['admin', 'consultant', 'mentor', 'comptable'])],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Mise à jour des données
        $user->update([
            'name' => $request->name ?? $user->name,
            'firstname' => $request->firstname ?? $user->firstname,
            'email' => $request->email ?? $user->email,
            'password' => $request->password ? Hash::make($request->password) : $user->password,
            'role' => $request->role ?? $user->role,
        ]);

        return response()->json(['message' => 'Utilisateur mis à jour avec succès', 'user' => $user], 200);
    }

    /**
     * Supprimer un utilisateur.
     */
    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }

        $user->delete();
        return response()->json(['message' => 'Utilisateur supprimé avec succès'], 200);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Presence extends Model
{
    use HasFactory;

    protected $table = 'presence';

    protected $fillable = [
        'date',
        'time',
        'cours',
        'notes',
        'faith_declaration',
        'mentor_id',
        'status',
        'validated_by_consultant',
        'validated_by_certificate_manager',
        'validated_by_finance',
        'validated_by_finance_id'
    ];

    // Relation avec le mentor
    public function mentor()
    {
        return $this->belongsTo(User::class, 'mentor_id'); // Assurez-vous que `mentor_id` est la clé étrangère
    }

    // Relation avec le comptable qui a validé
    public function validatedBy()
    {
        return $this->belongsTo(User::class, 'validated_by_finance_id'); // Assurez-vous que cette colonne existe
    }
}

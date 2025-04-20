<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mission extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'date',
        'time',
        'mentor_id',
        'status',
    ];

    // Relation avec le mentor (utilisateur)
    public function mentor()
    {
        return $this->belongsTo(User::class, 'mentor_id');
    }
}

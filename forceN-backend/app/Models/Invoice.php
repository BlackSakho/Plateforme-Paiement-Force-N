<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'presence_id',
        'mentor_name',
        'accountant_name',
        'amount',
        'date',
    ];

    // Relation avec le modèle Presence
    public function presence()
    {
        return $this->belongsTo(Presence::class);
    }
}
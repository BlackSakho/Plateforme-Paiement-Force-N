<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Presence extends Model
{
    use HasFactory;


    protected $table = 'presence';

    protected $fillable = ['date', 'time', 'cours', 'notes', 'faith_declaration'];
}

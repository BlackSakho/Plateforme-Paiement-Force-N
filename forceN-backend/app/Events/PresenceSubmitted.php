<?php

namespace App\Events;

use App\Models\Presence;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PresenceSubmitted
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $presence;

    public function __construct(Presence $presence)
    {
        $this->presence = $presence;
    }
}

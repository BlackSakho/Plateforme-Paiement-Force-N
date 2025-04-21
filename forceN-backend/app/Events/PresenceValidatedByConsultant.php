<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\Presence;

class PresenceValidatedByConsultant
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $presence;

    public function __construct(Presence $presence)
    {
        $this->presence = $presence;
    }
}
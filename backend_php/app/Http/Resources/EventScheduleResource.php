<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventScheduleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'event_name' => $this->event_name,
            'event_date' => $this->event_date,
            'circuit_name' => $this->circuit_name,
            'location' => $this->location,
            'country' => $this->country,
        ];
    }
}

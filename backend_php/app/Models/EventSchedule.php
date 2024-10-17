<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventSchedule extends Model
{
    /** @use HasFactory<\Database\Factories\EventScheduleFactory> */
    use HasFactory;

    protected $fillable = [
        'event_name',
        'event_date',
        'circuit_name',
        'location',
        'country',
    ];
}

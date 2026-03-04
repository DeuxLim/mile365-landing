<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'birthdate',
        'gender',
        'country',
        'province',
        'city',
        'barangay',
        'training_types',
        'experience_level',
        'years_running',
        'weekly_distance_km',
        'average_run_pace',
        'preferred_run_time',
        'goals',
        'joined_at',
    ];

    protected $casts = [
        'training_types' => 'array',
        'platforms_joined' => 'array',
        'birthdate' => 'date',
        'joined_at' => 'date',
    ];
}

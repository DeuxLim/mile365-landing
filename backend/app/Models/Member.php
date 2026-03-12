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
        'location_confirmation',

        'training_types',
        'experience_level',
        'years_running',
        'weekly_distance_km',
        'average_run_pace',
        'preferred_run_time',
        'goals',

        'fb_group_requested',
        'platforms_followed',
        'social_media_display_name',

        'emergency_contact_name',
        'emergency_contact_phone',
        'medical_conditions',
        'fitness_acknowledgment',

        'attendance_commitment',
        'activity_expectation',
        'community_behavior',

        'how_did_you_hear',
        'motivation',

        'agreed_to_rules',
        'agreed_at',
        'safety_commitment',
        'media_consent',

        'joined_at',
    ];

    protected $casts = [
        'training_types' => 'array',
        'platforms_followed' => 'array',
        'birthdate' => 'date',
        'joined_at' => 'date',
        'agreed_at' => 'datetime',

        'location_confirmation' => 'boolean',
        'fb_group_requested' => 'boolean',
        'fitness_acknowledgment' => 'boolean',
        'attendance_commitment' => 'boolean',
        'activity_expectation' => 'boolean',
        'community_behavior' => 'boolean',
        'agreed_to_rules' => 'boolean',
        'safety_commitment' => 'boolean',
        'media_consent' => 'boolean',
    ];
}

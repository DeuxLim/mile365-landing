<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MembershipRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        /*
        |--------------------------------------------------------------------------
        | BASIC IDENTITY
        |--------------------------------------------------------------------------
        */
        'first_name',
        'last_name',
        'email',
        'phone',
        'birthdate',
        'gender',

        /*
        |--------------------------------------------------------------------------
        | LOCATION
        |--------------------------------------------------------------------------
        */
        'country',
        'province',
        'city',
        'barangay',
        'location_confirmation',

        /*
        |--------------------------------------------------------------------------
        | TRAINING PROFILE
        |--------------------------------------------------------------------------
        | Multi-select: running, gym, hybrid, swimming, cycling, triathlon
        */
        'training_types',
        'experience_level',
        'years_running',
        'average_run_pace',
        'weekly_distance_km',
        'preferred_run_time',
        'goals',

        /*
        |--------------------------------------------------------------------------
        | COMMUNITY PLATFORMS
        |--------------------------------------------------------------------------
        */
        'fb_group_requested',
        'community_chat_joined',
        'platforms_joined',
        'facebook_profile_name',
        'messenger_name',

        /*
        |--------------------------------------------------------------------------
        | HEALTH & SAFETY
        |--------------------------------------------------------------------------
        */
        'emergency_contact_name',
        'emergency_contact_phone',
        'medical_conditions',
        'fitness_acknowledgment',

        /*
        |--------------------------------------------------------------------------
        | MEMBERSHIP EXPECTATIONS
        |--------------------------------------------------------------------------
        */
        'attendance_commitment',
        'activity_expectation',
        'community_behavior',

        /*
        |--------------------------------------------------------------------------
        | COMMUNITY / CULTURE FIT
        |--------------------------------------------------------------------------
        */
        'how_did_you_hear',
        'motivation',

        /*
        |--------------------------------------------------------------------------
        | WAIVER / AGREEMENT
        |--------------------------------------------------------------------------
        */
        'agreed_to_rules',
        'agreed_at',
        'safety_commitment',
        'media_consent',

        /*
        |--------------------------------------------------------------------------
        | ADMIN REVIEW SYSTEM
        |--------------------------------------------------------------------------
        */
        'status',
        'reviewed_by',
        'reviewed_at',
        'admin_notes',
    ];

    protected $casts = [
        'training_types' => 'array',
        'platforms_joined' => 'array',
        'birthdate' => 'date',
        'agreed_at' => 'datetime',
        'reviewed_at' => 'datetime',

        'location_confirmation' => 'boolean',
        'fb_group_requested' => 'boolean',
        'community_chat_joined' => 'boolean',
        'fitness_acknowledgment' => 'boolean',
        'attendance_commitment' => 'boolean',
        'activity_expectation' => 'boolean',
        'community_behavior' => 'boolean',
        'safety_commitment' => 'boolean',
        'media_consent' => 'boolean',
    ];
}

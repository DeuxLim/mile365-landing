<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class _MembershipRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // public endpoint
    }

    public function rules(): array
    {
        return [
            /*
            |--------------------------------------------------------------------------
            | BASIC IDENTITY
            |--------------------------------------------------------------------------
            */
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'email' => 'required|email|max:255|unique:membership_requests,email',
            'phone' => 'nullable|string|max:20',
            'birthdate' => 'nullable|date',
            'gender' => 'nullable|in:male,female,other',

            /*
            |--------------------------------------------------------------------------
            | LOCATION
            |--------------------------------------------------------------------------
            */
            'country' => 'nullable|string|max:100',
            'province' => 'nullable|string|max:100',
            'city' => 'nullable|string|max:100',
            'barangay' => 'nullable|string|max:100',
            'location_confirmation' => 'boolean',


            /*
            |--------------------------------------------------------------------------
            | TRAINING PROFILE
            |--------------------------------------------------------------------------
            | Multi-select: running, gym, hybrid, swimming, cycling, triathlon
            */
            'training_types' => 'nullable|array',
            'training_types.*' => 'string|max:50',
            'experience_level' => 'nullable|in:beginner,intermediate,advanced',
            'years_running' => 'nullable|integer|min:0|max:80',
            'average_run_pace' => 'nullable|string|max:20',
            'weekly_distance_km' => 'nullable|integer|min:0|max:500',
            'preferred_run_time' => 'nullable|string|max:50',
            'goals' => 'nullable|string|max:2000',

            /*
            |--------------------------------------------------------------------------
            | COMMUNITY PLATFORMS
            |--------------------------------------------------------------------------
            */
            'fb_group_joined' => 'required|boolean',
            'community_chat_joined' => 'required|boolean',
            'platforms_joined' => 'nullable|array',
            'platforms_joined.*' => 'string|max:50',
            'facebook_profile_name' => 'required|string|max:255',
            'messenger_name' => 'required|string|max:255',

            /*
            |--------------------------------------------------------------------------
            | HEALTH & SAFETY
            |--------------------------------------------------------------------------
            */
            'emergency_contact_name' => 'nullable|string|max:255',
            'emergency_contact_phone' => 'nullable|string|max:20',
            'medical_conditions' => 'nullable|string|max:2000',
            'fitness_acknowledgment' => 'boolean',

            /*
            |--------------------------------------------------------------------------
            | MEMBERSHIP EXPECTATIONS
            |--------------------------------------------------------------------------
            */
            'attendance_commitment' => 'boolean',
            'activity_expectation' => 'boolean',
            'community_behavior' => 'boolean',

            /*
            |--------------------------------------------------------------------------
            | COMMUNITY / CULTURE FIT
            |--------------------------------------------------------------------------
            */
            'how_did_you_hear' => 'nullable|string|max:255',
            'motivation' => 'nullable|string|max:2000',

            /*
            |--------------------------------------------------------------------------
            | WAIVER / AGREEMENT
            |--------------------------------------------------------------------------
            */
            'agreed_to_rules' => 'required|boolean',
            'safety_commitment' => 'boolean',
            'media_consent' => 'boolean',
        ];
    }

    protected function prepareForValidation()
    {
        if ($this->has('experience_level')) {
            $this->merge([
                'experience_level' => strtolower($this->experience_level),
            ]);
        }
    }
}

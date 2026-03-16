<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MembershipRequest;
use App\Models\Member;

class MembershipRequestSeeder extends Seeder
{
    public function run(): void
    {
        MembershipRequest::factory()
            ->count(5)
            ->create()
            ->each(function ($request) {
                if ($request->status !== "approved") {
                    return;
                }

                Member::firstOrCreate(['email' => $request->email], [
                    ...$request->only([
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
                    ]),
                    'joined_at' => now(),
                ]);
            });
    }
}

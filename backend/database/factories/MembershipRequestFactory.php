<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class MembershipRequestFactory extends Factory
{
    public function definition(): array
    {
        return [
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'birthdate' => fake()->dateTimeBetween('-45 years', '-18 years'),
            'gender' => fake()->randomElement(['male', 'female']),

            'country' => 'Philippines',
            'province' => fake()->randomElement([
                'Cavite',
                'Laguna',
                'Batangas',
                'Rizal'
            ]),
            'city' => fake()->city(),
            'barangay' => fake()->streetName(),
            'location_confirmation' => true,

            'training_types' => fake()->randomElements(
                ['running', 'gym', 'cycling', 'swimming', 'triathlon'],
                fake()->numberBetween(1, 3)
            ),

            'experience_level' => fake()->randomElement([
                'beginner',
                'intermediate',
                'advanced'
            ]),

            'years_running' => fake()->numberBetween(0, 10),
            'average_run_pace' => fake()->randomElement([
                '4:30/km',
                '5:00/km',
                '5:30/km',
                '6:00/km'
            ]),
            'weekly_distance_km' => fake()->numberBetween(10, 80),
            'preferred_run_time' => fake()->randomElement([
                'morning',
                'evening',
                'weekends'
            ]),
            'goals' => fake()->sentence(),

            'fb_group_requested' => fake()->boolean(80),
            'community_chat_joined' => fake()->boolean(70),
            'platforms_joined' => [
                "Facebook Page",
                "Instagram",
                "TikTok",
                "Strava Club"
            ],

            'facebook_profile_name' => fake()->name(),
            'messenger_name' => fake()->name(),

            'emergency_contact_name' => fake()->name(),
            'emergency_contact_phone' => fake()->phoneNumber(),
            'medical_conditions' => fake()->optional()->sentence(),
            'fitness_acknowledgment' => true,

            'attendance_commitment' => true,
            'activity_expectation' => true,
            'community_behavior' => true,

            'how_did_you_hear' => fake()->randomElement([
                'Facebook',
                'Friend',
                'Instagram',
                'Running Event'
            ]),

            'motivation' => fake()->paragraph(),

            'agreed_to_rules' => true,
            'safety_commitment' => true,
            'media_consent' => fake()->boolean(70),

            'status' => fake()->randomElement([
                'pending',
                'approved',
                'rejected'
            ]),
        ];
    }
}

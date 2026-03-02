<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MembershipRequestResource extends JsonResource
{
	public function toArray(Request $request): array
	{
		return [
			'id' => $this->id,

			/*
			|--------------------------------------------------------------------------
			| BASIC IDENTITY
			|--------------------------------------------------------------------------
			*/
			'identity' => [
				'first_name' => $this->first_name,
				'last_name' => $this->last_name,
				'email' => $this->email,
				'phone' => $this->phone,
				'birthdate' => $this->birthdate,
				'gender' => $this->gender,
			],

			/*
			|--------------------------------------------------------------------------
			| LOCATION
			|--------------------------------------------------------------------------
			*/
			'location' => [
				'country' => $this->country,
				'province' => $this->province,
				'city' => $this->city,
				'barangay' => $this->barangay,
				'location_confirmation' => $this->location_confirmation,
			],


			/*
            |--------------------------------------------------------------------------
            | TRAINING PROFILE
            |--------------------------------------------------------------------------
            | Multi-select: running, gym, hybrid, swimming, cycling, triathlon
            */
			'training' => [
				'training_types' => $this->training_types,
				'experience_level' => $this->experience_level,
				'years_running' => $this->years_running,
				'average_run_pace' => $this->average_run_pace,
				'weekly_distance_km' => $this->weekly_distance_km,
				'preferred_run_time' => $this->preferred_run_time,
				'goals' => $this->goals,
			],

			/*
            |--------------------------------------------------------------------------
            | COMMUNITY PLATFORMS
            |--------------------------------------------------------------------------
            */
			'community_platforms' => [
				'fb_group_joined' => $this->fb_group_joined,
				'community_chat_joined' => $this->community_chat_joined,
				'platforms_joined' => $this->platforms_joined,
				'facebook_profile_name' => $this->facebook_profile_name,
				'messenger_name' => $this->messenger_name,
			],

			/*
            |--------------------------------------------------------------------------
            | HEALTH & SAFETY
            |--------------------------------------------------------------------------
            */
			'health' => [
				'emergency_contact_name' => $this->emergency_contact_name,
				'emergency_contact_phone' => $this->emergency_contact_phone,
				'medical_conditions' => $this->medical_conditions,
				'fitness_acknowledgment' => $this->fitness_acknowledgment,
			],

			/*
            |--------------------------------------------------------------------------
            | MEMBERSHIP EXPECTATIONS
            |--------------------------------------------------------------------------
            */
			'membership_expectations' => [
				'attendance_commitment' => $this->attendance_commitment,
				'activity_expectation' => $this->activity_expectation,
				'community_behavior' => $this->community_behavior,
			],

			/*
			|--------------------------------------------------------------------------
			| COMMUNITY / CULTURE FIT
			|--------------------------------------------------------------------------
			*/
			'culture_fit' => [
				'how_did_you_hear' => $this->how_did_you_hear,
				'motivation' => $this->motivation,
			],

			/*
			|--------------------------------------------------------------------------
			| WAIVER / AGREEMENT
			|--------------------------------------------------------------------------
			*/
			'waiver' => [
				'agreed_to_rules' => $this->agreed_to_rules,
				'agreed_at' => $this->agreed_at,
				'safety_commitment' => $this->safety_commitment,
				'media_consent' => $this->media_consent,
			],

			/*
            |--------------------------------------------------------------------------
            | ADMIN REVIEW SYSTEM
            |--------------------------------------------------------------------------
            */
			'review' => [
				'status' => $this->status,
				'submitted_at' => $this->created_at,
				'reviewed_at' => $this->reviewed_at,
				'admin_notes' => $this->admin_notes,
			],
		];
	}
}

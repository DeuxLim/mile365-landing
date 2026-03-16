<?php

namespace App\Services\MembershipRequest\StatusHandlers;

use App\Events\MembershipRequestApproved;
use App\Models\Member;
use App\Models\MembershipRequest;
use Illuminate\Validation\ValidationException;
use InvalidStatusTransitionException;

class ApprovedStatusHandler implements StatusHandlerInterface
{
    /* Before update */
    public function validate(MembershipRequest $membershipRequest, array $inputs)
    {
        /* Can only approve if status is from "trial" */
        if (!$membershipRequest->status === "trial") {
            return throw new InvalidStatusTransitionException("Status cannot be approved if previous status is not 'trial'");
        }

        // Can't create another member if requestor email already exists
        if (Member::where('email', $membershipRequest->email)->exists()) {
            throw ValidationException::withMessages([
                'email' => 'Member already exists for this email.'
            ]);
        }
    }

    /* Trigger side effects */
    public function handle(MembershipRequest $membershipRequest, array $inputs)
    {
        // Create member
        Member::create([
            'first_name' => $membershipRequest->first_name,
            'last_name' => $membershipRequest->last_name,
            'email' => $membershipRequest->email,
            'phone' => $membershipRequest->phone,
            'birthdate' => $membershipRequest->birthdate,
            'gender' => $membershipRequest->gender,

            'country' => $membershipRequest->country,
            'province' => $membershipRequest->province,
            'city' => $membershipRequest->city,
            'barangay' => $membershipRequest->barangay,
            'location_confirmation' => $membershipRequest->location_confirmation,

            'training_types' => $membershipRequest->training_types,
            'experience_level' => $membershipRequest->experience_level,
            'years_running' => $membershipRequest->years_running,
            'weekly_distance_km' => $membershipRequest->weekly_distance_km,
            'average_run_pace' => $membershipRequest->average_run_pace,
            'preferred_run_time' => $membershipRequest->preferred_run_time,
            'goals' => $membershipRequest->goals,

            'fb_group_requested' => $membershipRequest->fb_group_requested,
            'platforms_followed' => $membershipRequest->platforms_followed,
            'social_media_display_name' => $membershipRequest->social_media_display_name,

            'emergency_contact_name' => $membershipRequest->emergency_contact_name,
            'emergency_contact_phone' => $membershipRequest->emergency_contact_phone,
            'medical_conditions' => $membershipRequest->medical_conditions,
            'fitness_acknowledgment' => $membershipRequest->fitness_acknowledgment,

            'attendance_commitment' => $membershipRequest->attendance_commitment,
            'activity_expectation' => $membershipRequest->activity_expectation,
            'community_behavior' => $membershipRequest->community_behavior,

            'how_did_you_hear' => $membershipRequest->how_did_you_hear,
            'motivation' => $membershipRequest->motivation,

            'agreed_to_rules' => $membershipRequest->agreed_to_rules,
            'agreed_at' => $membershipRequest->agreed_at,
            'safety_commitment' => $membershipRequest->safety_commitment,
            'media_consent' => $membershipRequest->media_consent,

            'joined_at' => now(),
        ]);

        event(new MembershipRequestApproved($membershipRequest));
    }
}

<?php

namespace App\Services;

use App\Models\MembershipRequest;
use App\Models\Member;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class MembershipRequestService
{
    public function submitApplication(array $data): MembershipRequest | null
    {
        $membershipRequest = null;

        DB::transaction(function () {
            // set default status
            $data['status'] = 'pending';

            // if user agreed to rules, set timestamp
            if (!empty($data['agreed_to_rules'])) {
                $data['agreed_at'] = now();
            }

            // create record
            $membershipRequest = MembershipRequest::create($data);
        });

        return $membershipRequest;
    }

    public function getAllRequests(?string $status = null, ?string $search = null)
    {
        $query = MembershipRequest::query()
            ->latest()
            ->when(
                filled($status),
                fn($q) => $q->where('status', trim($status))
            )
            ->when(
                filled($search),
                function ($q) use ($search) {
                    $term = '%' . str_replace('%', '\\%', trim($search)) . '%';

                    $q->where(function ($sub) use ($term) {
                        $sub->where('first_name', 'like', $term)
                            ->orWhere('last_name', 'like', $term)
                            ->orWhere('email', 'like', $term)
                            ->orWhere('phone', 'like', $term)
                            ->orWhere('city', 'like', $term)
                            ->orWhere('province', 'like', $term);
                    });
                }
            );

        return $query->paginate(10);
    }

    public function approveRequest(int $id, int $adminId): MembershipRequest
    {
        return DB::transaction(function () use ($id, $adminId) {
            // Lock row to prevent race condition
            $request = MembershipRequest::whereKey($id)
                ->lockForUpdate()
                ->firstOrFail();

            // Idempotency: approving an already-approved request should be a no-op.
            if ($request->status === 'approved') {
                return $request;
            }

            if ($request->status !== 'pending') {
                throw ValidationException::withMessages([
                    'request' => 'Request already processed.'
                ]);
            }

            // Prevent duplicate member (based on email for example)
            if (Member::where('email', $request->email)->exists()) {
                throw ValidationException::withMessages([
                    'email' => 'Member already exists for this email.'
                ]);
            }

            // Approve request
            $request->update([
                'status' => 'approved',
                'reviewed_by' => $adminId,
                'reviewed_at' => now(),
            ]);

            // Create member
            Member::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'phone' => $request->phone,
                'birthdate' => $request->birthdate,
                'gender' => $request->gender,

                'country' => $request->country,
                'province' => $request->province,
                'city' => $request->city,
                'barangay' => $request->barangay,
                'location_confirmation' => $request->location_confirmation,

                'training_types' => $request->training_types,
                'experience_level' => $request->experience_level,
                'years_running' => $request->years_running,
                'weekly_distance_km' => $request->weekly_distance_km,
                'average_run_pace' => $request->average_run_pace,
                'preferred_run_time' => $request->preferred_run_time,
                'goals' => $request->goals,

                'fb_group_joined' => $request->fb_group_joined,
                'community_chat_joined' => $request->community_chat_joined,
                'platforms_joined' => $request->platforms_joined,
                'facebook_profile_name' => $request->facebook_profile_name,
                'messenger_name' => $request->messenger_name,

                'emergency_contact_name' => $request->emergency_contact_name,
                'emergency_contact_phone' => $request->emergency_contact_phone,
                'medical_conditions' => $request->medical_conditions,
                'fitness_acknowledgment' => $request->fitness_acknowledgment,

                'attendance_commitment' => $request->attendance_commitment,
                'activity_expectation' => $request->activity_expectation,
                'community_behavior' => $request->community_behavior,

                'how_did_you_hear' => $request->how_did_you_hear,
                'motivation' => $request->motivation,

                'agreed_to_rules' => $request->agreed_to_rules,
                'agreed_at' => $request->agreed_at,
                'safety_commitment' => $request->safety_commitment,
                'media_consent' => $request->media_consent,

                'joined_at' => now(),
            ]);

            return $request->fresh(); // return updated version
        });
    }

    public function rejectRequest(int $id, int $adminId, ?string $notes = null): MembershipRequest
    {
        return DB::transaction(function () use ($id, $adminId, $notes) {
            // Lock row to prevent race condition
            $request = MembershipRequest::whereKey($id)
                ->lockForUpdate()
                ->firstOrFail();

            if ($request->status !== 'pending') {
                throw ValidationException::withMessages([
                    'request' => 'Request already processed.'
                ]);
            }

            $request->update([
                'status' => 'rejected',
                'reviewed_by' => $adminId,
                'reviewed_at' => now(),
                'admin_notes' => $notes,
            ]);

            return $request->fresh();
        });
    }
}

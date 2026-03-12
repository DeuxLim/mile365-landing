<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('membership_requests', function (Blueprint $table) {
            $table->id();

            /*
            |--------------------------------------------------------------------------
            | BASIC IDENTITY
            |--------------------------------------------------------------------------
            */
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->date('birthdate')->nullable();
            $table->enum('gender', ['male', 'female', 'other'])->nullable();

            /*
            |--------------------------------------------------------------------------
            | LOCATION
            |--------------------------------------------------------------------------
            */
            $table->string('country')->default('Philippines');
            $table->string('province')->nullable();
            $table->string('city')->nullable();
            $table->string('barangay')->nullable();
            $table->boolean('location_confirmation')->default(false);

            /*
            |--------------------------------------------------------------------------
            | TRAINING PROFILE
            |--------------------------------------------------------------------------
            */
            $table->json('training_types')->nullable(); // Multi-select: running, gym, hybrid, swimming, cycling, triathlon
            $table->enum('experience_level', ['beginner', 'intermediate', 'advanced'])->nullable();
            $table->integer('years_running')->nullable();
            $table->string('average_run_pace')->nullable(); // example: 5:30/km
            $table->integer('weekly_distance_km')->nullable();
            $table->string('preferred_run_time')->nullable(); // morning / evening / weekends
            $table->text('goals')->nullable(); // marathon, weight loss, fitness etc

            /*
            |--------------------------------------------------------------------------
            | COMMUNITY PLATFORMS
            |--------------------------------------------------------------------------
            */
            $table->boolean('fb_group_requested')->default(false);
            $table->json('platforms_joined')->nullable();
            $table->string('facebook_profile_name')->nullable();
            $table->string('messenger_name')->nullable();

            /*
            |--------------------------------------------------------------------------
            | HEALTH & SAFETY
            |--------------------------------------------------------------------------
            */
            $table->string('emergency_contact_name')->nullable();
            $table->string('emergency_contact_phone')->nullable();
            $table->text('medical_conditions')->nullable();
            $table->boolean('fitness_acknowledgment')->default(false);

            /*
            |--------------------------------------------------------------------------
            | MEMBERSHIP EXPECTATIONS
            |--------------------------------------------------------------------------
            */
            $table->boolean('attendance_commitment')->default(false);
            $table->boolean('activity_expectation')->default(false);
            $table->boolean('community_behavior')->default(false);

            /*
            |--------------------------------------------------------------------------
            | COMMUNITY / CULTURE FIT
            |--------------------------------------------------------------------------
            */
            $table->string('how_did_you_hear')->nullable();
            $table->text('motivation')->nullable();

            /*
            |--------------------------------------------------------------------------
            | WAIVER / AGREEMENT
            |--------------------------------------------------------------------------
            */
            $table->boolean('agreed_to_rules')->default(false);
            $table->timestamp('agreed_at')->nullable();
            $table->boolean('safety_commitment')->default(false);
            $table->boolean('media_consent')->default(false);

            /*
            |--------------------------------------------------------------------------
            | ADMIN REVIEW SYSTEM
            |--------------------------------------------------------------------------
            */
            $table->enum('status', ['pending', 'approved', 'rejected', 'waitlisted'])->default('pending');
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('reviewed_at')->nullable();
            $table->text('admin_notes')->nullable();


            /**
             * Metadata
             */
            $table->timestamps();
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('membership_requests');
    }
};

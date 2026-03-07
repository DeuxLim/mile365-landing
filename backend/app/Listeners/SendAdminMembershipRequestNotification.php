<?php

namespace App\Listeners;

use App\Events\MembershipRequestReceived;
use App\Mail\MembershipRequestReceived as MailMembershipRequestReceived;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueueAfterCommit;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendAdminMembershipRequestNotification implements ShouldQueueAfterCommit
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(MembershipRequestReceived $event): void
    {
        $adminEmails = User::whereHas('roles', function ($query) {
            $query->whereIn('name', ['super_admin', 'club_admin']);
        })->pluck('email');

        if ($adminEmails->isNotEmpty()) {
            Mail::to($adminEmails)->send(new MailMembershipRequestReceived($event->membershipRequest));
        }
    }
}

<?php

namespace App\Listeners;

use App\Events\MembershipRequestReceived;
use App\Mail\MembershipRequestReceived as MailMembershipRequestReceived;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueueAfterCommit;
use Illuminate\Support\Collection;
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

        $recipients = app()->environment('local')
            ? collect([config('mail.admin_email')])
            : $adminEmails;

        if ($recipients->isNotEmpty()) {
            Mail::to($recipients->all())
                ->send(new MailMembershipRequestReceived($event->membershipRequest));
        }
    }
}

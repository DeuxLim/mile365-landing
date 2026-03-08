<?php

namespace App\Listeners;

use App\Events\MembershipRequestRejected;
use App\Mail\MembershipRequestRejected as MailMembershipRequestRejected;
use Illuminate\Contracts\Queue\ShouldQueueAfterCommit;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendRequestorMembershipRequestRejected implements ShouldQueueAfterCommit
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
    public function handle(MembershipRequestRejected $event): void
    {
        $recipient = app()->environment('local') ? config('mail.admin_email') : $event->membershipRequest->email;

        if ($recipient) {
            Mail::to($recipient)->send(new MailMembershipRequestRejected($event->membershipRequest));
        }
    }
}

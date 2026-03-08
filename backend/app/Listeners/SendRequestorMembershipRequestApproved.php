<?php

namespace App\Listeners;

use App\Events\MembershipRequestApproved;
use App\Mail\MembershipRequestApproved as MailMembershipRequestApproved;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Contracts\Queue\ShouldQueueAfterCommit;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendRequestorMembershipRequestApproved implements ShouldQueueAfterCommit
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
    public function handle(MembershipRequestApproved $event): void
    {
        $recipient = app()->environment('local') ? config('mail.admin_email') : $event->membershipRequest->email;

        if ($recipient) {
            Mail::to($recipient)->send(new MailMembershipRequestApproved($event->membershipRequest));
        }
    }
}

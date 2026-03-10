<?php

namespace App\Listeners;

use App\Events\MembershipRequestReceived;
use App\Mail\MembershipRequestSent;
use Illuminate\Contracts\Queue\ShouldQueueAfterCommit;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendRequestorMembershipRequestConfirmation implements ShouldQueueAfterCommit
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
        $recipient = app()->environment('local') ? config('mail.admin_email') : $event->membershipRequest->email;

        if ($recipient) {
            Mail::to($recipient)->send(new MembershipRequestSent($event->membershipRequest));
        }
    }
}

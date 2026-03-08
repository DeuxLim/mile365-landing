<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Membership Request Update</title>
</head>

<body style="font-family: Arial, sans-serif; line-height: 1.6;">

    <h2>Update on Your Membership Request</h2>

    <p>
        Hi {{ ($membershipRequest->first_name ?? '') . ' ' . ($membershipRequest->last_name ?? '') }},
    </p>

    <p>
        Thank you for your interest in joining <strong>MILE 365</strong>.
    </p>

    <p>
        After reviewing your application, we regret to inform you that your
        membership request was <strong>not approved</strong> at this time.
    </p>

    @isset($membershipRequest->admin_notes)
        <p>
            <strong>Admin Notes:</strong><br>
            {{ $membershipRequest->admin_notes }}
        </p>
    @endisset


    <p>
        This decision may be based on current membership limits or other
        internal considerations.
    </p>

    <p>
        If you have questions or would like to clarify anything regarding your
        application, you may contact us through the following:
    </p>

    <ul>
        @if (config('app.facebook_page'))
            <li>
                <strong>Facebook Page:</strong>
                <a href="{{ config('app.facebook_page') }}">{{ config('app.facebook_page') }}</a>
            </li>
        @endif

        @if (config('app.contact_email'))
            <li>
                <strong>Email:</strong>
                <a href="mailto:{{ config('app.contact_email') }}">{{ config('app.contact_email') }}</a>
            </li>
        @endif
    </ul>

    <br>

    <p>
        Thank you for your interest in the club and we appreciate your time.
    </p>

    <p>
        Regards,<br>
        <strong>MILE 365 Team</strong>
    </p>

</body>

</html>

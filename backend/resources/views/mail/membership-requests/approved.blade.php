<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Membership Request Approved</title>
</head>

<body style="font-family: Arial, sans-serif; line-height: 1.6;">

    <h2>Your Membership Request Was Approved 🎉</h2>

    <p>
        Hi {{ ($membershipRequest->first_name ?? '') . ' ' . ($membershipRequest->last_name ?? '') }},
    </p>

    <p>
        Good news! Your membership request to <strong>MILE 365</strong> has been
        <strong>approved</strong> by one of our admins.
    </p>

    <p>
        We're excited to have you join the community.
    </p>

    <p>
        To stay updated with announcements, events, and group runs, please join
        our Messenger group using the link below:
    </p>

    <p>
        <a href="{{ config('app.messenger_link') }}"
            style="display:inline-block;padding:10px 16px;background:#0084FF;color:#ffffff;text-decoration:none;border-radius:4px;">
            Join Our Messenger Group
        </a>
    </p>

    <br>

    <p>
        If the button above does not work, you can also copy and paste this link
        into your browser:
    </p>

    <p>
        {{ config('app.messenger_link') }}
    </p>

    <br>

    <p>
        Welcome to the club!<br>
        <strong>MILE 365 Team</strong>
    </p>

</body>

</html>

<body style="font-family: Arial, sans-serif; line-height: 1.6;">

    <h2>Membership Request Received</h2>

    <p>
        Hello {{ ($membershipRequest->first_name ?? '') . ' ' . ($membershipRequest->last_name ?? '') }},
    </p>

    <p>
        Thank you for submitting your membership request to <strong>MILE 365</strong>.
    </p>

    <p>
        Your request has been successfully received and is currently being reviewed by the club administrators.
        You will be notified once your application has been approved or rejected.
    </p>

    <p>
        <strong>Submitted Details:</strong>
    </p>

    <ul>
        <li><strong>Name:</strong> {{ ($membershipRequest->first_name ?? 'N/A') . ' ' . ($membershipRequest->last_name ?? '') }}</li>
        <li><strong>Email:</strong> {{ $membershipRequest->email ?? 'N/A' }}</li>
    </ul>

    <p>
        If you have any questions, feel free to reply to this email.
    </p>

    <br>

    <p>
        Regards,<br>
        <strong>MILE 365</strong>
    </p>

</body>

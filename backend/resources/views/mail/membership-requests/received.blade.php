<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Membership Request Received</title>
</head>

<body style="font-family: Arial, sans-serif; line-height: 1.6;">

    <h2>New Membership Request</h2>

    <p>
        A new membership request has been submitted to <strong>MILE 365</strong>.
    </p>

    <p>
        Please review the applicant details below:
    </p>

    <ul>
        <li><strong>Name:</strong> {{ $membershipRequest->first_name . '' . $membershipRequest->last_name ?? 'N/A' }}
        </li>
        <li><strong>Email:</strong> {{ $membershipRequest->email ?? 'N/A' }}</li>
    </ul>

    <p>
        Please log in to the admin panel to approve or reject this request.
    </p>

    <br>

    <p>
        Regards,<br>
        MILE 365 AUTOMATION
    </p>

</body>

</html>

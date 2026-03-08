<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Membership Request Approved</title>
</head>

<body style="margin:0; padding:0; background-color:#f6f6f6; font-family: Arial, Helvetica, sans-serif; color:#111;">

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f6f6; padding:40px 0;">
        <tr>
            <td align="center">

                <table width="520" cellpadding="0" cellspacing="0"
                    style="background:#ffffff; padding:40px; border-radius:6px;">

                    <tr>
                        <td style="padding-bottom:24px;">
                            <h2 style="margin:0; font-size:22px; letter-spacing:0.5px;">You're In — Welcome to MILE 365
                                🎉</h2>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding-bottom:20px; font-size:15px; color:#333;">
                            Hello
                            <strong>{{ ($membershipRequest->first_name ?? '') . ' ' . ($membershipRequest->last_name ?? '') }}</strong>,
                        </td>
                    </tr>

                    <tr>
                        <td style="padding-bottom:20px; font-size:15px; color:#333;">
                            Great news — your membership request to <strong>MILE 365</strong> has been
                            <strong>approved</strong> by our admins.
                        </td>
                    </tr>

                    <tr>
                        <td style="padding-bottom:20px; font-size:15px; color:#333;">
                            We're excited to have you join the community. Our club is built around consistency,
                            community, and helping each other become stronger runners.
                        </td>
                    </tr>

                    <tr>
                        <td
                            style="padding-bottom:10px; font-size:13px; font-weight:bold; letter-spacing:1px; color:#777;">
                            NEXT STEP
                        </td>
                    </tr>

                    <tr>
                        <td style="padding-bottom:24px; font-size:15px; color:#333;">
                            Join our Messenger group to stay updated with announcements, group runs, and community
                            activities.
                        </td>
                    </tr>

                    <tr>
                        <td style="padding-bottom:28px;">
                            <a href="{{ config('app.messenger_link') }}"
                                style="display:inline-block;padding:12px 20px;background:#0084FF;color:#ffffff;text-decoration:none;border-radius:4px;font-size:14px;font-weight:bold;">
                                Join the Messenger Group
                            </a>
                        </td>
                    </tr>

                    <tr>
                        <td style="border-top:1px solid #eeeeee; padding-top:20px; font-size:14px; color:#555;">
                            If the button above doesn't work, copy and paste the following link into your browser:
                        </td>
                    </tr>

                    <tr>
                        <td style="padding-top:10px; font-size:13px; color:#777; word-break:break-all;">
                            {{ config('app.messenger_link') }}
                        </td>
                    </tr>

                    <tr>
                        <td style="padding-top:28px; font-size:14px; color:#333;">
                            Welcome to the club.<br>
                            <strong>MILE 365 Team</strong>
                        </td>
                    </tr>

                </table>

        <tr>
            <td align="center" style="padding-top:20px; font-size:12px; color:#888;">
                © {{ date('Y') }} MILE 365. All rights reserved.
            </td>
        </tr>

        </td>
        </tr>
    </table>

</body>

</html>

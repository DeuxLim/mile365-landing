<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Trial Membership – MILE 365</title>
</head>

<body style="margin:0; padding:0; background-color:#f6f6f6; font-family: Arial, Helvetica, sans-serif; color:#111;">

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f6f6; padding:40px 0;">
        <tr>
            <td align="center">

                <table width="520" cellpadding="0" cellspacing="0"
                    style="background:#ffffff; padding:40px; border-radius:6px;">

                    <tr>
                        <td style="padding-bottom:24px;">
                            <h2 style="margin:0; font-size:22px;">You're Invited to a Trial Run 👟</h2>
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
                            Thanks for applying to join <strong>MILE 365</strong>.
                        </td>
                    </tr>

                    <tr>
                        <td style="padding-bottom:20px; font-size:15px; color:#333;">
                            Your application has been reviewed and you are now invited to join as a <strong>Trial
                                Member</strong>.
                        </td>
                    </tr>

                    <tr>
                        <td style="padding-bottom:20px; font-size:15px; color:#333;">
                            To complete your membership, we ask that you join <strong>at least 2 of our run
                                sessions</strong>.
                            This helps us get to know you and allows you to experience the community.
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
                            Join our Messenger group where we post schedules, run meetups, and announcements.
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
                            After attending <strong>2 run sessions</strong>, our admins will review and approve your
                            full membership.
                        </td>
                    </tr>

                    <tr>
                        <td style="padding-top:28px; font-size:14px; color:#333;">
                            See you on the road.<br>
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

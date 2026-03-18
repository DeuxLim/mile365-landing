<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Membership Approved – MILE 365</title>
</head>

<body style="margin:0; padding:0; background-color:#f6f6f6; font-family: Arial, Helvetica, sans-serif; color:#111;">

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f6f6; padding:40px 0;">
        <tr>
            <td align="center">

                <table width="520" cellpadding="0" cellspacing="0"
                    style="background:#ffffff; padding:40px; border-radius:6px;">

                    <!-- Title -->
                    <tr>
                        <td style="padding-bottom:24px;">
                            <h2 style="margin:0; font-size:22px;">Welcome to MILE 365 🎉</h2>
                        </td>
                    </tr>

                    <!-- Greeting -->
                    <tr>
                        <td style="padding-bottom:20px; font-size:15px; color:#333;">
                            Hello
                            <strong>{{ ($membershipRequest->first_name ?? '') . ' ' . ($membershipRequest->last_name ?? '') }}</strong>,
                        </td>
                    </tr>

                    <!-- Message -->
                    <tr>
                        <td style="padding-bottom:20px; font-size:15px; color:#333;">
                            Congratulations! Your membership with <strong>MILE 365</strong> is now officially
                            <strong>approved</strong>.
                        </td>
                    </tr>

                    <tr>
                        <td style="padding-bottom:20px; font-size:15px; color:#333;">
                            We’re excited to have you as part of the community. MILE 365 is built around consistency,
                            support, and helping each other become stronger runners.
                        </td>
                    </tr>

                    <tr>
                        <td style="padding-bottom:24px; font-size:15px; color:#333;">
                            You will soon receive an invitation to join our main private Messenger group where we share
                            run schedules,
                            announcements, and community activities.
                        </td>
                    </tr>

                    <!-- Closing -->
                    <tr>
                        <td style="border-top:1px solid #eeeeee; padding-top:20px; font-size:14px; color:#333;">
                            See you at the next run.<br>
                            <strong>MILE 365 Team</strong>
                        </td>
                    </tr>

                </table>

                <!-- Footer -->
                <table width="520" cellpadding="0" cellspacing="0">
                    <tr>
                        <td align="center" style="padding-top:20px; font-size:12px; color:#888;">
                            © {{ date('Y') }} MILE 365. All rights reserved.
                        </td>
                    </tr>
                </table>

            </td>
        </tr>
    </table>

</body>

</html>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Membership Request Update</title>
</head>

<body style="margin:0; padding:0; background-color:#f6f6f6; font-family: Arial, Helvetica, sans-serif; color:#111;">

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f6f6; padding:40px 0;">
        <tr>
            <td align="center">

                <table width="520" cellpadding="0" cellspacing="0"
                    style="background:#ffffff; padding:40px; border-radius:6px;">

                    <tr>
                        <td style="padding-bottom:24px;">
                            <h2 style="margin:0; font-size:22px; letter-spacing:0.5px;">Update on Your Membership
                                Request</h2>
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
                            Thank you for your interest in joining <strong>MILE 365</strong>.
                        </td>
                    </tr>

                    <tr>
                        <td style="padding-bottom:20px; font-size:15px; color:#333;">
                            After reviewing your application, we regret to inform you that your membership request was
                            <strong>not approved</strong> at this time.
                        </td>
                    </tr>

                    @isset($membershipRequest->admin_notes)
                        <tr>
                            <td style="padding-bottom:20px;">
                                <div
                                    style="background:#f8f8f8; padding:16px; border-radius:4px; font-size:14px; color:#333;">
                                    <strong>Admin Notes</strong><br>
                                    {{ $membershipRequest->admin_notes }}
                                </div>
                            </td>
                        </tr>
                    @endisset

                    <tr>
                        <td style="padding-bottom:20px; font-size:15px; color:#333;">
                            This decision may be based on current membership limits or other internal considerations.
                        </td>
                    </tr>

                    <tr>
                        <td
                            style="padding-bottom:10px; font-size:13px; font-weight:bold; letter-spacing:1px; color:#777;">
                            CONTACT
                        </td>
                    </tr>

                    <tr>
                        <td style="padding-bottom:24px; font-size:14px; color:#333;">
                            If you have questions or would like clarification regarding your application, you may reach
                            us through the following:
                        </td>
                    </tr>

                    <tr>
                        <td style="padding-bottom:24px;">
                            <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px; color:#333;">

                                @if (config('app.facebook_page'))
                                    <tr>
                                        <td style="padding:6px 0;"><strong>Facebook Page</strong></td>
                                        <td style="padding:6px 0;">
                                            <a href="{{ config('app.facebook_page') }}"
                                                style="color:#111; text-decoration:none;">
                                                {{ config('app.facebook_page') }}
                                            </a>
                                        </td>
                                    </tr>
                                @endif

                                @if (config('app.contact_email'))
                                    <tr>
                                        <td style="padding:6px 0;"><strong>Email</strong></td>
                                        <td style="padding:6px 0;">
                                            <a href="mailto:{{ config('app.contact_email') }}"
                                                style="color:#111; text-decoration:none;">
                                                {{ config('app.contact_email') }}
                                            </a>
                                        </td>
                                    </tr>
                                @endif

                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style="border-top:1px solid #eeeeee; padding-top:20px; font-size:14px; color:#555;">
                            Thank you for your interest in the club. We appreciate the time you took to apply.
                        </td>
                    </tr>

                    <tr>
                        <td style="padding-top:28px; font-size:14px; color:#333;">
                            Regards,<br>
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

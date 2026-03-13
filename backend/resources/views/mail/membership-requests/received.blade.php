<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Membership Request Received</title>
</head>

<body style="margin:0; padding:0; background-color:#f6f6f6; font-family: Arial, Helvetica, sans-serif; color:#111;">

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f6f6; padding:40px 0;">
        <tr>
            <td align="center">

                <table width="520" cellpadding="0" cellspacing="0"
                    style="background:#ffffff; padding:40px; border-radius:6px;">

                    <tr>
                        <td style="padding-bottom:24px;">
                            <h2 style="margin:0; font-size:22px; letter-spacing:0.5px;">New Membership Request</h2>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding-bottom:20px; font-size:15px; color:#333;">
                            A new membership request has been submitted to <strong>MILE 365</strong>.
                        </td>
                    </tr>

                    <tr>
                        <td
                            style="padding-bottom:10px; font-size:13px; font-weight:bold; letter-spacing:1px; color:#777;">
                            APPLICANT DETAILS
                        </td>
                    </tr>

                    <tr>
                        <td style="padding-bottom:24px;">
                            <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px; color:#333;">

                                <tr>
                                    <td style="padding:6px 0;"><strong>Name</strong></td>
                                    <td style="padding:6px 0;">
                                        {{ trim(($membershipRequest->first_name ?? '') . ' ' . ($membershipRequest->last_name ?? '')) ?: 'N/A' }}
                                    </td>
                                </tr>

                                <tr>
                                    <td style="padding:6px 0;"><strong>Email</strong></td>
                                    <td style="padding:6px 0;">{{ $membershipRequest->email ?? 'N/A' }}</td>
                                </tr>

                                <tr>
                                    <td style="padding:6px 0;"><strong>Phone</strong></td>
                                    <td style="padding:6px 0;">{{ $membershipRequest->phone ?? 'N/A' }}</td>
                                </tr>

                                <tr>
                                    <td style="padding:6px 0;"><strong>Location</strong></td>
                                    <td style="padding:6px 0;">
                                        {{ $membershipRequest->city ?? '' }}{{ $membershipRequest->city ? ',' : '' }}
                                        {{ $membershipRequest->province ?? '' }}
                                    </td>
                                </tr>

                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style="border-top:1px solid #eeeeee; padding-top:20px; font-size:14px; color:#555;">
                            Please log in to the admin panel to review, approve, or reject this request.
                        </td>
                    </tr>

                    @php
                        $frontendUrl = rtrim((string) config('app.frontend_url'), '/');
                        $adminLoginUrl = $frontendUrl ? ($frontendUrl . '/admin/login') : null;
                    @endphp

                    @if ($adminLoginUrl)
                        <tr>
                            <td style="padding-top:18px; padding-bottom:6px;">
                                <a href="{{ $adminLoginUrl }}"
                                    style="display:inline-block;padding:12px 20px;background:#111827;color:#ffffff;text-decoration:none;border-radius:4px;font-size:14px;font-weight:bold;">
                                    Open Admin Dashboard
                                </a>
                            </td>
                        </tr>

                        <tr>
                            <td style="padding-top:8px; font-size:13px; color:#777; word-break:break-all;">
                                {{ $adminLoginUrl }}
                            </td>
                        </tr>
                    @endif

                    <tr>
                        <td style="padding-top:28px; font-size:14px; color:#333;">
                            Regards,<br>
                            <strong>MILE 365 Automation</strong>
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

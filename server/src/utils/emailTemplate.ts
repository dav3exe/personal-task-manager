export const verificationEmailTemplate = (
  name: string,
  verifyUrl: string
): { subject: string; html: string } => ({
  subject: "Verify Your Task Duty Email",
html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Verify Your Email</title>
      <style>
        body { margin: 0; padding: 0; background-color: #f8f6fb; font-family: Arial, sans-serif; }
        .wrapper { width: 100%; background-color: #f8f6fb; padding: 40px 0; }
        .container { max-width: 560px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; }
        .header { background-color: #9b51e0; padding: 32px 24px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; }
        .header p { color: #ede4fb; margin: 8px 0 0; font-size: 13px; }
        .body { padding: 32px 24px; }
        .body h2 { color: #2d2935; margin: 0 0 16px; font-size: 20px; }
        .body p { color: #444545; font-size: 14px; line-height: 1.7; margin: 0 0 20px; }
        .btn-wrap { text-align: center; padding: 8px 0 24px; }
        .btn { display: inline-block; background-color: #9b51e0; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 15px; font-weight: 700; }
        .note { color: #716b7c; font-size: 12px; line-height: 1.6; margin: 0 0 8px; }
        .link-box { margin-top: 20px; padding: 14px; background: #f8f6fb; border-radius: 8px; border: 1px solid #e8e1ee; }
        .link-box p { color: #716b7c; font-size: 11px; margin: 0 0 6px; }
        .link-box a { color: #7b35c8; font-size: 11px; word-break: break-all; }
        .footer { background-color: #f8f6fb; padding: 20px 24px; text-align: center; border-top: 1px solid #e8e1ee; }
        .footer p { color: #716b7c; font-size: 11px; margin: 0; }
        @media only screen and (max-width: 600px) {
          .container { width: 100% !important; border-radius: 0 !important; }
          .body { padding: 24px 16px !important; }
          .header { padding: 24px 16px !important; }
          .btn { padding: 12px 24px !important; font-size: 14px !important; }
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">

          <div class="header">
            <h1>Task Duty</h1>
            <p>Your Personal Task Manager To Keep You In Check</p>
          </div>

          <div class="body">
            <h2>Welcome, ${name}! </h2>
            <p>Thanks for creating your Task Duty account. Please verify your email address by clicking the button below.</p>

            <div class="btn-wrap">
              <a href="${verifyUrl}" class="btn">Verify My Email</a>
            </div>

            <p class="note">This link expires in <strong>24 hours</strong>.</p>
            <p class="note">If you didn't create this account, ignore this email.</p>

            <div class="link-box">
              <p>Or copy and paste this link:</p>
              <a href="${verifyUrl}">${verifyUrl}</a>
            </div>
          </div>

          <div class="footer">
            <p>© ${new Date().getFullYear()} Task Duty. All rights reserved.</p>
            <p style="margin-top:4px;">123 Prestige Drive, Lagos, Nigeria</p>
          </div>

        </div>
      </div>
    </body>
    </html>
  `,
});

export const welcomeEmailTemplate = (
  name: string
): { subject: string; html: string } => ({
  subject: "Welcome to Task Duty Personal Task Manager! ",
html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Welcome</title>
      <style>
        body { margin: 0; padding: 0; background-color: #f8f6fb; font-family: Arial, sans-serif; }
        .wrapper { width: 100%; background-color: #f8f6fb; padding: 40px 0; }
        .container { max-width: 560px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; }
        .header { background-color: #9b51e0; padding: 32px 24px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; }
        .body { padding: 32px 24px; }
        .body h2 { color: #2d2935; margin: 0 0 16px; font-size: 20px; }
        .body p { color: #444545; font-size: 14px; line-height: 1.7; margin: 0 0 16px; }
        .footer { background-color: #f8f6fb; padding: 20px 24px; text-align: center; border-top: 1px solid #e8e1ee; }
        .footer p { color: #716b7c; font-size: 11px; margin: 0; }
        @media only screen and (max-width: 600px) {
          .container { width: 100% !important; border-radius: 0 !important; }
          .body { padding: 24px 16px !important; }
          .header { padding: 24px 16px !important; }
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">

          <div class="header">
            <h1>Task Duty</h1>
          </div>

          <div class="body">
            <h2>You're all set, ${name}! </h2>
            <p>Your email has been verified. You now have full access to Task Duty — create and edit tasks. Keep track of your activities.</p>
            <p style="color:#716b7c;font-size:13px;">Welcome to Task Duty!</p>
          </div>

          <div class="footer">
            <p>© ${new Date().getFullYear()} Task Duty. All rights reserved.</p>
          </div>

        </div>
      </div>
    </body>
    </html>
  `,
});

export const passwordResetEmailTemplate = (
  name: string,
  resetUrl: string
): { subject: string; html: string } => ({
  subject: "Reset Your Task Duty Password",
html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Reset Password</title>
      <style>
        body { margin: 0; padding: 0; background-color: #f8f6fb; font-family: Arial, sans-serif; }
        .wrapper { width: 100%; background-color: #f8f6fb; padding: 40px 0; }
        .container { max-width: 560px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; }
        .header { background-color: #9b51e0; padding: 32px 24px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; }
        .header p { color: #ede4fb; margin: 8px 0 0; font-size: 13px; }
        .body { padding: 32px 24px; }
        .body h2 { color: #2d2935; margin: 0 0 16px; font-size: 20px; }
        .body p { color: #444545; font-size: 14px; line-height: 1.7; margin: 0 0 20px; }
        .btn-wrap { text-align: center; padding: 8px 0 24px; }
        .btn { display: inline-block; background-color: #9b51e0; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 15px; font-weight: 700; }
        .note { color: #716b7c; font-size: 12px; line-height: 1.6; margin: 0 0 8px; }
        .link-box { margin-top: 20px; padding: 14px; background: #f8f6fb; border-radius: 8px; border: 1px solid #e8e1ee; }
        .link-box p { color: #716b7c; font-size: 11px; margin: 0 0 6px; }
        .link-box a { color: #7b35c8; font-size: 11px; word-break: break-all; }
        .footer { background-color: #f8f6fb; padding: 20px 24px; text-align: center; border-top: 1px solid #e8e1ee; }
        .footer p { color: #716b7c; font-size: 11px; margin: 0; }
        @media only screen and (max-width: 600px) {
          .container { width: 100% !important; border-radius: 0 !important; }
          .body { padding: 24px 16px !important; }
          .header { padding: 24px 16px !important; }
          .btn { padding: 12px 24px !important; font-size: 14px !important; }
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">

          <div class="header">
            <h1>Task Duty</h1>
            <p>Your personal task manager</p>
          </div>

          <div class="body">
            <h2>Password Reset Request</h2>
            <p>Hi <strong>${name}</strong>,</p>
            <p>We received a request to reset your password. Click the button below to create a new one.</p>

            <div class="btn-wrap">
              <a href="${resetUrl}" class="btn">Reset My Password</a>
            </div>

            <p class="note">This link expires in <strong>1 hour</strong>.</p>
            <p class="note">If you didn't request this, ignore this email.</p>

            <div class="link-box">
              <p>Or copy and paste this link:</p>
              <a href="${resetUrl}">${resetUrl}</a>
            </div>
          </div>

          <div class="footer">
            <p>© ${new Date().getFullYear()} Task Duty. All rights reserved.</p>
            <p style="margin-top:4px;">123 Prestige Drive, Lagos, Nigeria</p>
          </div>

        </div>
      </div>
    </body>
    </html>
  `,
});
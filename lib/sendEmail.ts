import nodemailer from "nodemailer";
import { Transporter } from "nodemailer";

interface SendPasswordResetEmailParams {
  email: string;
  otp: string;
}

const transporter: Transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // Updated to match .env
  port: parseInt(process.env.SMTP_PORT || "587"), // Updated to match .env
  secure: parseInt(process.env.SMTP_PORT || "587") === 465, // Use secure only for port 465
  auth: {
    user: process.env.SMTP_USER, // Updated to match .env
    pass: process.env.SMTP_PASSWORD // Updated to match .env
  },
  tls: {
    rejectUnauthorized: false // Allow self-signed certificates
  },
  logger: true,
  debug: true
});

export const sendPasswordResetEmail = async (
  params: SendPasswordResetEmailParams
): Promise<void> => {
  const { email, otp } = params;

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset OTP</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #ecfdf5;
          color: #064e3b;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          border: 1px solid #d1fae5;
        }
        .header {
          background: #10b981;
          color: #ffffff;
          text-align: center;
          padding: 20px;
        }
        .header h1 {
          font-size: 24px;
          margin: 0;
        }
        .content {
          padding: 30px 20px;
        }
        .content p {
          font-size: 16px;
          line-height: 1.5;
          margin: 10px 0;
        }
        .otp {
          font-size: 28px;
          font-weight: bold;
          color: #10b981;
          text-align: center;
          margin: 30px 0;
        }
        .button-container {
          text-align: center;
          margin: 20px 0;
        }
        .copy-button {
          display: inline-block;
          padding: 12px 24px;
          background: #10b981;
          color: #ffffff;
          text-decoration: none;
          font-size: 16px;
          border-radius: 4px;
          cursor: pointer;
        }
        .copy-button:hover {
          background: #059669;
        }
        .footer {
          text-align: center;
          font-size: 14px;
          color: #064e3b;
          padding: 20px;
          background: #ecfdf5;
          border-top: 1px solid #d1fae5;
        }
        .footer p {
          margin: 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Password Reset Request</h1>
        </div>
        <div class="content">
          <p>Dear User,</p>
          <p>We received a request to reset your password. Please use the OTP below to proceed. This OTP is valid for the next 15 minutes:</p>
          <div class="otp">${otp}</div>
          <div class="button-container">
            <button 
              class="copy-button" 
              onclick="navigator.clipboard.writeText('${otp}')">
              Copy OTP
            </button>
          </div>
          <p>If you did not request this password reset, please disregard this email or contact our support team if you have concerns.</p>
        </div>
        <div class="footer">
          <p>Thank you,<br>The Nibay Team</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: email,
      subject: "Password Reset OTP",
      html: htmlContent
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

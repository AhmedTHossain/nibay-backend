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

  try {
    await transporter.sendMail({
      from: process.env.FROM_EMAIL, // Updated to match .env
      to: email,
      subject: "Password Reset OTP",
      html: `Your OTP for password reset is <strong>${otp}</strong>. It expires in 15 minutes.`
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

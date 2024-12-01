import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";

import { z } from "zod";

const envSchema = z.object({
  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z.string().min(1),
  SMTP_USER: z.string().min(1),
  SMTP_PASS: z.string().min(1)
});

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = envSchema.parse(
  process.env
);

export async function sendEmail({ ...options }: Mail.Options) {
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  });

  return await transporter.sendMail({
    from: "<no-reply@nebay.no>",
    ...options
  });
}

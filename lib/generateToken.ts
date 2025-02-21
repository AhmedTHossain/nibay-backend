import * as jwt from "jsonwebtoken";

export type Payload = jwt.JwtPayload & { userId: string; email: string };

export function generatePasswordResetToken(userId: string, email: string) {
  const secret = process.env.PASSWORD_RESET_JWT_SECRET as string;
  const expiresIn = process.env.PASSWORD_RESET_JWT_SECRET_EXPIRES_IN as string;
    //@ts-expect-error JWT_SECRET_EXPIRES_IN is not undefined

  const token = jwt.sign({ userId, email }, secret, {
    expiresIn
  });
  return token;
}

export function verifyPasswordResetToken(token: string): Payload | null {
  const secret = process.env.PASSWORD_RESET_JWT_SECRET as string;

  try {
    const decoded = jwt.verify(token, secret) as Payload;
    return decoded;
  } catch {
    return null;
  }
}

import { errorResponse } from "@/lib/response";
import jwt, {
  JsonWebTokenError,
  JwtPayload,
  TokenExpiredError
} from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET as string;

interface DecodedToken extends JwtPayload {
  id: string;
}

export function authMiddleware(
  req: Request
): NextResponse | { userId: string } {
  const header = req.headers.get("Authorization");

  if (!header) {
    return errorResponse({
      message: "Authentication required",
      statusCode: 401
    });
  }

  const token = header.split(" ")[1];

  if (!token) {
    return errorResponse({
      message: "Token not provided",
      statusCode: 401
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

    return { userId: decoded.id };
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return errorResponse({
        message: "Token expired",
        statusCode: 401
      });
    }
    if (error instanceof JsonWebTokenError) {
      return errorResponse({
        message: "Invalid token",
        statusCode: 401
      });
    }

    return errorResponse({
      message: "Authentication failed",
      statusCode: 500
    });
  }
}

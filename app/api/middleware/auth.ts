import { errorResponse } from "@/lib/response";
import jwt, {
  JsonWebTokenError,
  JwtPayload,
  TokenExpiredError
} from "jsonwebtoken";
import { NextResponse } from "next/server";
import user from "../models/user";

const JWT_SECRET = process.env.JWT_SECRET as string;

interface DecodedToken extends JwtPayload {
  id: string;
}

export async function authMiddleware(
  req: Request
): Promise<NextResponse | { userId: string }> {
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
    const foundUser = await user.findById(decoded.id);

    if (!foundUser || foundUser.isDeleted) {
      return errorResponse({
        message: "User account is deleted. Contact support.",
        statusCode: 403
      });
    }

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
import jwt, {
  JsonWebTokenError,
  JwtPayload,
  TokenExpiredError
} from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET as string;

interface DecodedToken extends JwtPayload {
  userId: string;
}

export function authMiddleware(
  req: Request
): NextResponse | { userId: string } {
  const header = req.headers.get("Authorization");

  if (!header) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  const token = header.split(" ")[1];
  if (!token) {
    return NextResponse.json({ error: "Token not provided" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    return { userId: decoded.userId };
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return NextResponse.json({ error: "Token expired" }, { status: 401 });
    }
    if (error instanceof JsonWebTokenError) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}

import storage from "@/lib/storage";
import { jwtDecode } from "jwt-decode";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type JwtPayload = {
  exp: number;
  sub: string;
  id: string;
  name: string;
  email: string;
  role: string;
};

export function useUser() {
  const token = storage.getToken();
  let user: User | null = null;
  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (currentTimestamp < decoded.exp) {
        user = {
          id: decoded.sub,
          name: decoded.name,
          email: decoded.email,
          role: decoded.role
        };
      }
    } catch {
      user = null;
    }
  }
  return {
    user
  };
}

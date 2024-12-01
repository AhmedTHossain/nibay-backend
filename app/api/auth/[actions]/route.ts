import { NextRequest } from "next/server";
import { login } from "../login";
import { register } from "../register";

export async function POST(
  request: NextRequest,
  { params }: { params: { actions: string } }
) {
  const action = params.actions;

  if (action === "register") return register(request);
  else if (action === "login") return login(request);
}

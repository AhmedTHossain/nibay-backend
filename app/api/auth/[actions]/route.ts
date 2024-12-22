import { NextRequest } from "next/server";
import { login, mobileLogin } from "../login";
import { mobileRegister, register } from "../register";

export async function POST(
  request: NextRequest,
  { params }: { params: { actions: string } }
) {
  const action = params.actions;

  const url = new URL(request.url);
  const mode = url.searchParams.get("mode");

  if (action === "register") {
    if (mode === "mobile") return mobileRegister(request);
    else return register(request);
  }

  if (action === "login") {
    if (mode === "mobile") return mobileLogin(request);
    else return login(request);
  }
}

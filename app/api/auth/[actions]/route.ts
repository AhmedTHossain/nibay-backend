import { NextRequest } from "next/server";
import { login, mobileLogin } from "../login";
import { mobileRegister, register } from "../register";
import { getOTP } from "../get-otp";
import { verifyOTP } from "../verify-otp";

/**
 * @swagger
 * /register:
 *   post:
 *     summary: User Registration
 *     description: Register a new user.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *     responses:
 *       200:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user ID.
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: Bad Request.
 */
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

  if (action === "otp") return getOTP(request);
  if (action === "verify-otp") return verifyOTP(request);
}

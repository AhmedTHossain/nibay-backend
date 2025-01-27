import { NextRequest } from "next/server";
import { login, mobileLogin } from "../login";
import { mobileRegister, register } from "../register";
import { getOTP } from "../get-otp";
import { verifyOTP } from "../verify-otp";

/**
 * @swagger
 * /auth/register?mode=mobile:
 *   post:
 *     summary: Mobile User Registration
 *     description: Registers a new user through the mobile application, including optional file uploads.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name.
 *                 example: Fahim Shahrier
 *               role:
 *                 type: integer
 *                 description: Role of the user.
 *                 example: 1
 *               phone:
 *                 type: string
 *                 description: User's phone number.
 *                 example: "42342342342"
 *               nidNumber:
 *                 type: string
 *                 description: User's National ID number.
 *                 example: "324234234234"
 *               division:
 *                 type: string
 *                 description: User's division.
 *                 example: Chattogram
 *               district:
 *                 type: string
 *                 description: User's district.
 *                 example: Chattogram
 *               drivingLicense:
 *                 type: string
 *                 description: User's driving license number.
 *                 example: dfsdfsdsdfsdf
 *               maxEducationLevel:
 *                 type: integer
 *                 description: User's maximum education level (numeric representation).
 *                 example: 1
 *               yearsOfExperience:
 *                 type: integer
 *                 description: Years of professional experience.
 *                 example: 5
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Profile photo of the user (optional).
 *               nidCopy:
 *                 type: string
 *                 format: binary
 *                 description: Copy of the user's National ID (optional).
 *               drivingLicenseCopy:
 *                 type: string
 *                 format: binary
 *                 description: Copy of the user's driving license (optional).
 *               maxEducationLevelCertificateCopy:
 *                 type: string
 *                 format: binary
 *                 description: Copy of the user's highest education level certificate (optional).
 *     responses:
 *       200:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Success status.
 *                   example: success
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The user ID.
 *                     phone:
 *                       type: string
 *                       description: User's phone number.
 *                     name:
 *                       type: string
 *                       description: User's name.
 *                     role:
 *                       type: integer
 *                       description: User's role.
 *                     nid_number:
 *                       type: string
 *                       description: User's National ID number.
 *                     nid_copy:
 *                       type: string
 *                       description: Base64-encoded string of the National ID copy.
 *                     driving_license_number:
 *                       type: string
 *                       description: User's driving license number.
 *                     driving_license_copy:
 *                       type: string
 *                       description: Base64-encoded string of the driving license copy.
 *                     max_education_level:
 *                       type: integer
 *                       description: User's maximum education level.
 *                     max_education_level_certificate_copy:
 *                       type: string
 *                       description: Base64-encoded string of the highest education certificate.
 *       400:
 *         description: Bad Request. The user already exists or invalid credentials provided.
 */

/**
 * @swagger
 * /auth/login?mode=mobile:
 *   post:
 *     summary: Mobile User Login
 *     description: Log in a user via phone number and PIN to obtain a JWT token.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 description: The user's phone number.
 *                 example: "42342342342"
 *               pin:
 *                 type: string
 *                 description: The user's PIN.
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: User authenticated successfully. Returns a JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token for authentication.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Invalid credentials provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating the issue.
 *                   example: Invalid Credentials!
 */

/**
 * @swagger
 * /auth/otp:
 *   post:
 *     summary: Request OTP for Login
 *     description: Sends an OTP to the user's email for authentication.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: "42342342342"
 *               deviceID:
 *                 type: string
 *                 description: The unique identifier of the user's device.
 *                 example: "device12345"
 *     responses:
 *       200:
 *         description: OTP sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the request.
 *                   example: success
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                   example: Otp sent successfully
 *       400:
 *         description: Invalid credentials or user not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the error response.
 *                   example: error
 *                 message:
 *                   type: string
 *                   description: Error message describing the issue.
 *                   example: User not found or other error message
 */

/**
 * @swagger
 * /auth/verify-otp:
 *   post:
 *     summary: Verify OTP for Login
 *     description: Verifies the OTP for user authentication and returns a JWT token.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 description: The user's phone number.
 *                 example: "42342342342"
 *               otpCode:
 *                 type: string
 *                 description: The OTP sent to the user's phone.
 *                 example: "123456"
 *               deviceID:
 *                 type: string
 *                 description: The unique identifier of the user's device.
 *                 example: "device12345"
 *     responses:
 *       200:
 *         description: Phone number verified successfully. Returns a JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the request.
 *                   example: success
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                   example: Phone number verified successfully
 *                 token:
 *                   type: string
 *                   description: The JWT token for authentication.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: OTP mismatch or invalid credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the error response.
 *                   example: error
 *                 message:
 *                   type: string
 *                   description: Error message describing the issue.
 *                   example: Otp mismatch | User not found or other error message
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

import { connectToMongoDB } from "@/lib/database";
import { NextResponse } from "next/server";
import User from "../../../../models/user";
import JWT from "jsonwebtoken";
import { date } from "zod";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_SECRET_EXPIRES_IN = process.env.JWT_SECRET_EXPIRES_IN as string;

export async function POST(request: Request) {
    try {
      const { phone, otpCode, deviceID } = await request.json();
  
      if (!phone || !otpCode || !deviceID) {
        return NextResponse.json({
          status: false,
          message: "Missing required fields!",
          data:{}
        });
      }
  
      await connectToMongoDB();
  
      const user = await User.findOne({ phone }).select("+otpCode +deviceID");
      
      if (!user || !user.otpCode) {
        return NextResponse.json({
          message: "User not found!",
          data:{}
        });
      }
  
      if (otpCode !== user.otpCode) {
        return NextResponse.json({
          message: "otp did not match!",
          data:{}
        });
      }
  
      if (user.deviceID !== deviceID) {
        return NextResponse.json({
          status: false,
          message: "Operation failed!",
          data:{}
        });
      }
  
      const token = JWT.sign(
        {
          id: user._id,
          phone: user.phone,
          deviceID
        },
        JWT_SECRET,
        {
          expiresIn: JWT_SECRET_EXPIRES_IN
        }
      );
  
      return NextResponse.json({
        status: true,
        message: "Successfully logged in",
        token
      });
  
    } catch (error) {
      return NextResponse.json({
        status: false,
        message: "Operation failed!",
        data: {}
      });
    }
  }
import { NextResponse } from "next/server";

export const successResponse = ({ message }: { message: string }) => {
  return NextResponse.json({
    status: "success",
    message
  });
};

export const errorResponse = ({
  message,
  statusCode
}: {
  message: string;
  statusCode: number;
}) => {
  return NextResponse.json({ error: message }, { status: statusCode });
};

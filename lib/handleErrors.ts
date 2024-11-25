import { Error as MongooseError } from "mongoose";
import { NextResponse } from "next/server";

export function handleError(error: unknown) {
  if (error instanceof MongooseError.ValidationError) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  } else if (error instanceof MongooseError.CastError) {
    return NextResponse.json(
      { message: `Invalid ${error.path}: ${error.value}` },
      { status: 400 }
    );
  }

  // General error handling
  return NextResponse.json(
    { message: (error as Error).message || "An unexpected error occurred" },
    { status: 500 }
  );
}

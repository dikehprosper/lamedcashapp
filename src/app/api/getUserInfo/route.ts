import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
  try {
    // Get user ID and sessionId from the token
    const { userId, sessionId } = await getDataFromToken(request);

    // Find the user and select all fields except password
    const user = await User.findOne({ _id: userId }).select("-password");

    // Check if the stored sessionId matches the sessionId from the token
    if (user && user.sessionId === sessionId) {
      return NextResponse.json({
        message: "User found",
        data: {
          betID: user.supplementaryBetId,
          _id: user._id,
          email: user.email,
          fullname: user.fullname,
          betId: user.betId,
          number: user.number
        },
      });
    } else {
      // Session ID mismatch
      return NextResponse.json(
        { error: "Invalid session ID. Please log in again." },
        { status: 401 }
      );
    }
  } catch (error: any) {
    if (error.message === "Token has expired") {
      // Handle token expiry error
      return NextResponse.json(
        { error: "Token has expired. Please log in again." },
        { status: 402 }
      );
    } else {
      // Handle other errors
      return NextResponse.json(
        { error: error.message },
        { status: error.status || 500 }
      );
    }
  }
}

connect();

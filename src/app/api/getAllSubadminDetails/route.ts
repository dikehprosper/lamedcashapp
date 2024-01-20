import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
  try {
    const { userId, sessionId } = await getDataFromToken(request);

    // Check if userId is available
    if (!userId) {
      // Handle the case when userId is not available
      return NextResponse.json(
        { error: "Your session has expired" },
        { status: 403 }
      );
    }

    // Check if sessionId is available
    if (!sessionId) {
      // Handle the case when sessionId is not available
      return NextResponse.json(
        { error: "Your session has expired" },
        { status: 403 }
      );
    }

    // Find the user and select all fields except password
    const user = await User.find({ isSubAdminDeposits: true });
    const user2 = await User.find({ isSubAdminWithdrawals: true });
    const user3 = await User.findOne({ _id: userId });
    const user4 = await User.find({ isUser: true });

    if (user3 && user3.sessionId === sessionId) {
      return NextResponse.json({
        message: "User found",
        data: { user, user2, user3, user4 },
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
      // Handle the case when the token has expired
      return NextResponse.json(
        { error: "Your session has expired" },
        { status: 403 }
      );
    } else {
      // Handle other types of errors
      return NextResponse.json(
        { error: error.message },
        { status: error.status || 500 }
      );
    }
  }
}

connect();

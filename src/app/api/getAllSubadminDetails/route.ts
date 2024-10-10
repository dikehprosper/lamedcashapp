import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User, { AdminUser, SubAdminUser } from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
  try {
    const {userId, sessionId} = await getDataFromToken(request);

    // Check if userId is available
    if (!userId) {
      try {
        const user3 = await AdminUser.findOne({_id: userId}).select(
          "-password"
        );

        if (user3) {
          user3.isLoggedIn = false;
          user3.sessionId = null;
          await user3.save();
        }
        const response = NextResponse.json({
          message: "Logout successful",
          success: true,
        });
        response.cookies.set("token", "", {
          httpOnly: true,
          expires: new Date(0),
        });
        return NextResponse.json(
          {error: "Your session has expired"},
          {status: 401}
        );
      } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
      }
    }

    // Check if sessionId is available
    if (!sessionId) {
      try {
        const user3 = await AdminUser.findOne({_id: userId}).select(
          "-password"
        );

        if (user3) {
          user3.isLoggedIn = false;
          user3.sessionId = null;
          await user3.save();
        }
        const response = NextResponse.json({
          message: "Logout successful",
          success: true,
        });
        response.cookies.set("token", "", {
          httpOnly: true,
          expires: new Date(0),
        });
        return NextResponse.json(
          {error: "Your session has expired"},
          {status: 403}
        );
      } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
      }
    }

    // Find the user and select all fields except password
    const user = await SubAdminUser.find({isSubAdminDeposits: true});
    const user2 = await SubAdminUser.find({isSubAdminWithdrawals: true});
    const user3 = await AdminUser.findOne({_id: userId});
    const user4 = await User.find({isUser: true});

    if (user3 && user3.sessionId === sessionId) {
      return NextResponse.json({
        message: "User found",
        data: {user, user2, user3, user4},
      });
    } else {
      // Session ID mismatch
      return NextResponse.json(
        {error: "Invalid session ID. Please log in again."},
        {status: 401}
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

import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// import { sendEmail } from "@/helpers/mailer";
import isOnline from "is-online";

connect();


export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = await reqBody;

    // Check if the device is online
    const online = await isOnline();
    if (!online) {
      return NextResponse.json(
        { error: "No internet connection" },
        { status: 501 }
      );
    }

    // Check if the User already exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    // Check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 402 });
    }

    // Clear or invalidate existing tokens associated with the user
    user.token = null;
    await user.save();

    // Set the user's isLoggedIn status to true, indicating a successful login
    user.isLoggedIn = true;
    await user.save();

    // Create token data containing user information
    const tokenData = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      isUser: user.isUser,
      isAdmin: user.isAdmin,
      isSubAdminDeposits: user.isSubAdminDeposits,
      isSubAdminWithdrawals: user.isSubAdminWithdrawals,
    };

    // Create a new token for the current device
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    // Set the new token as an HTTP-only cookie
    const response = NextResponse.json({
      message: "Signup successful. Previous session invalidated.",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

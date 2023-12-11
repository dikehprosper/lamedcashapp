import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// import { sendEmail } from "@/helpers/mailer";
import isOnline from "is-online";

connect();
import { v4 as uuidv4 } from 'uuid';

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

    // Generate a new session ID using the 'uuid' library
    const newSessionId = generateUniqueSessionId();

    // Check for existing session and invalidate it
    if (user.sessionId) {
      // Implement your session invalidation logic here (e.g., update the database record)
      invalidateSession(user.sessionId);
    }

    // Set the user's session ID and isLoggedIn status
    user.sessionId = newSessionId;
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
      sessionId: user.sessionId
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

// Function to invalidate a session (update the database record)
async function invalidateSession(sessionId: any) {
  try {
    // Find the user with the given session ID and update the session or remove it
    const user = await User.findOneAndUpdate(
      { sessionId },
      { $set: { sessionId: null, isLoggedIn: false } },
      { new: true }
    );

    if (!user) {
      // Handle if the user is not found
      console.error("User not found for session ID:", sessionId);
    }
  } catch (error) {
    // Handle any error during the database update
    console.error("Error invalidating session:", error);
  }
}

// Function to generate a unique session ID using the 'uuid' library
function generateUniqueSessionId() {
  return uuidv4();
}


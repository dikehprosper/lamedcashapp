import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import {SubAdminUser, AdminUser} from "@/models/userModel";
// import { sendEmail } from "@/helpers/mailer";
import isOnline from "is-online";

connect();
import {v4 as uuidv4} from "uuid";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {email, password} = await reqBody;


    // Check if the device is online
    const online = await isOnline();
    if (!online) {
      return NextResponse.json(
        {error: "No internet connection"},
        {status: 501}
      );
    }

    // CREATE USER FOR CASHDESK DEPOSITS
    // CREATE USER FOR CASHDESK DEPOSITS
    // CREATE USER FOR CASHDESK DEPOSITS

    if (
      (email === process.env.D_EMAIL && password === process.env.D_PASSWORD) ||
      (email === process.env.D_EMAIL1 &&
        password === process.env.D_PASSWORD1) ||
      (email === process.env.D_EMAIL2 &&
        password === process.env.D_PASSWORD2) ||
      (email === process.env.D_EMAIL3 &&
        password === process.env.D_PASSWORD3) ||
      (email === process.env.D_EMAIL4 &&
        password === process.env.D_PASSWORD4) ||
      (email === process.env.D_EMAIL5 &&
        password === process.env.D_PASSWORD5) ||
      (email === process.env.D_EMAIL6 &&
        password === process.env.D_PASSWORD6) ||
      (email === process.env.D_EMAIL7 &&
        password === process.env.D_PASSWORD7) ||
      (email === process.env.D_EMAIL8 &&
        password === process.env.D_PASSWORD8) ||
      (email === process.env.D_EMAIL9 &&
        password === process.env.D_PASSWORD9) ||
      (email === process.env.D_EMAIL10 && password === process.env.D_PASSWORD10)
    ) {
      // Check if the User already exists
      const subAdminUser = await SubAdminUser.findOne({email});

      if (!subAdminUser) {
        return NextResponse.json({error: "Subadmin not found"}, {status: 400});
      }

      if (!subAdminUser.isActivated) {
        return NextResponse.json(
          {error: "your account has been deactivated"},
          {status: 404}
        );
      }

      // Check if password is correct
      const validPassword = await bcryptjs.compare(
        password,
        subAdminUser.password
      );
      if (!validPassword) {
        return NextResponse.json({error: "Invalid password"}, {status: 402});
      }

      // Generate a new session ID using the 'uuid' library
      const newSessionId = generateUniqueSessionId();

      // Check for existing session and invalidate it
      if (subAdminUser.isAdmin === false) {
        if (subAdminUser.sessionId) {
          // Implement your session invalidation logic here (e.g., update the database record)
          invalidateSession(subAdminUser.sessionId);
        }
      }
      console.log("subAdminUser");
      // Set the user's session ID and isLoggedIn status
      subAdminUser.sessionId = newSessionId;
      subAdminUser.isLoggedIn = true;
      await subAdminUser.save();

      // Create token data containing user information
      const tokenData = {
        _id: subAdminUser._id,
        fullname: subAdminUser.fullname,
        email: subAdminUser.email,
        isUser: subAdminUser.isUser,
        isAdmin: subAdminUser.isAdmin,
        isSubAdminDeposits: subAdminUser.isSubAdminDeposits,
        isSubAdminWithdrawals: subAdminUser.isSubAdminWithdrawals,
        sessionId: subAdminUser.sessionId,
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
    }

    // CREATE USER FOR CASHDESK WITHDRAWAL
    // CREATE USER FOR CASHDESK WITHDRAWAL
    // CREATE USER FOR CASHDESK WITHDRAWAL

    if (
      (email === process.env.W_EMAIL && password === process.env.W_PASSWORD) ||
      (email === process.env.W_EMAIL1 &&
        password === process.env.W_PASSWORD1) ||
      (email === process.env.W_EMAIL2 &&
        password === process.env.W_PASSWORD2) ||
      (email === process.env.W_EMAIL3 &&
        password === process.env.W_PASSWORD3) ||
      (email === process.env.W_EMAIL4 &&
        password === process.env.W_PASSWORD4) ||
      (email === process.env.W_EMAIL5 &&
        password === process.env.W_PASSWORD5) ||
      (email === process.env.W_EMAIL6 &&
        password === process.env.W_PASSWORD6) ||
      (email === process.env.W_EMAIL7 &&
        password === process.env.W_PASSWORD7) ||
      (email === process.env.W_EMAIL8 &&
        password === process.env.W_PASSWORD8) ||
      (email === process.env.W_EMAIL9 &&
        password === process.env.W_PASSWORD9) ||
      (email === process.env.W_EMAIL10 && password === process.env.W_PASSWORD10)
    ) {
      // Check if the User already exists
      const subAdminUser = await SubAdminUser.findOne({email});
      if (!subAdminUser) {
        return NextResponse.json({error: "Subadmin not found"}, {status: 400});
      }

      if (!subAdminUser.isActivated) {
        return NextResponse.json(
          {error: "your account has been deactivated"},
          {status: 404}
        );
      }

      // Check if password is correct
      const validPassword = await bcryptjs.compare(
        password,
        subAdminUser.password
      );
      if (!validPassword) {
        return NextResponse.json({error: "Invalid password"}, {status: 402});
      }

      // Generate a new session ID using the 'uuid' library
      const newSessionId = generateUniqueSessionId();

      // Check for existing session and invalidate it
      if (subAdminUser.isAdmin === false) {
        if (subAdminUser.sessionId) {
          // Implement your session invalidation logic here (e.g., update the database record)
          invalidateSession(subAdminUser.sessionId);
        }
      }

      // Set the user's session ID and isLoggedIn status
      subAdminUser.sessionId = newSessionId;
      subAdminUser.isLoggedIn = true;
      await subAdminUser.save();

      // Create token data containing user information
      const tokenData = {
        _id: subAdminUser._id,
        fullname: subAdminUser.fullname,
        email: subAdminUser.email,
        isUser: subAdminUser.isUser,
        isAdmin: subAdminUser.isAdmin,
        isSubAdminDeposits: subAdminUser.isSubAdminDeposits,
        isSubAdminWithdrawals: subAdminUser.isSubAdminWithdrawals,
        sessionId: subAdminUser.sessionId,
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
    }

    // CREATE USER FOR CASHDESK ADMIN
    if (
      (email === process.env.A_EMAIL ) ||
      (email === process.env.A_EMAIL1)
    ) {
      // Check if the User already exists
      console.log(email, "gggghhhhh");
      const adminUser = await AdminUser.findOne({email});

      console.log(adminUser, "gggghhhhhhhjjjj");
      if (!adminUser) {
        return NextResponse.json({error: "Subadmin not found"}, {status: 400});
      }

      if (!adminUser.isActivated) {
        return NextResponse.json(
          {error: "your account has been deactivated"},
          {status: 404}
        );
      }

      // Check if password is correct
      const validPassword = await bcryptjs.compare(
        password,
        adminUser.password
      );
      if (!validPassword) {
        return NextResponse.json({error: "Invalid password"}, {status: 402});
      }

      // Generate a new session ID using the 'uuid' library
      const newSessionId = generateUniqueSessionId();

      // Check for existing session and invalidate it
      if (adminUser.isAdmin === false) {
        if (adminUser.sessionId) {
          // Implement your session invalidation logic here (e.g., update the database record)
          invalidateSession(adminUser.sessionId);
        }
      }

      // Set the user's session ID and isLoggedIn status
      adminUser.sessionId = newSessionId;
      adminUser.isLoggedIn = true;
      await adminUser.save();

      // Create token data containing user information
      const tokenData = {
        _id: adminUser._id,
        fullname: adminUser.fullname,
        email: adminUser.email,
        isUser: adminUser.isUser,
        isAdmin: adminUser.isAdmin,
        isSubAdminDeposits: adminUser.isSubAdminDeposits,
        isSubAdminWithdrawals: adminUser.isSubAdminWithdrawals,
        sessionId: adminUser.sessionId,
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
    }

    // Check if the User already exists
    const user = await User.findOne({email});
    if (!user) {
      return NextResponse.json({error: "User not found"}, {status: 400});
    }

    if (!user.isActivated) {
      return NextResponse.json(
        {error: "your account has been deactivated"},
        {status: 404}
      );
    }

    // Check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({error: "Invalid password"}, {status: 402});
    }

    // Generate a new session ID using the 'uuid' library
    const newSessionId = generateUniqueSessionId();

    // Check for existing session and invalidate it
    if (user.isAdmin === false) {
      if (user.sessionId) {
        // Implement your session invalidation logic here (e.g., update the database record)
        invalidateSession(user.sessionId);
      }
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
      sessionId: user.sessionId,
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
    return NextResponse.json({error: error.message}, {status: 500});
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


import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { fullname, betId, number, email, password } = await reqBody;

    //Check if the User already exist
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //create a new user
    const newUser = new User({
      fullname,
      betId,
      number,
      email,
      password: hashedPassword,
      supplementaryBetId: [betId],
    });

    // save the new created user
    const savedUser = await newUser.save();

    //create token data
    const tokenData = {
      id: savedUser._id,
      fullname: savedUser.fullname,
      email: savedUser.email,
      isAdmin: savedUser.isAdmin,
      isSubAdmin: savedUser.isSubAdmin,
    };

    // create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
console.log(savedUser)
    const response = NextResponse.json({
      message: "signup Successful",
      success: true,
      savedUser,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


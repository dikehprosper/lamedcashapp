import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { password, token } = reqBody;
    console.log(password, token);

  const decodedHash = decodeURIComponent(token);
  const user = await User.findOne({forgotPasswordToken: decodedHash});
  console.error(user, "user detail");
  if (!user || user.forgotPasswordTokenExpiry <= Date.now()) {
    console.error("Token invalid or expired");
    return NextResponse.json({error: "Invalid token"}, {status: 400});
  }

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }
    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "password changed successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

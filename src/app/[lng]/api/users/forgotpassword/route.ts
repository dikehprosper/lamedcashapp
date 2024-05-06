// @ts-ignore
import User from "@/models/userModel";
// @ts-ignore
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
// @ts-ignore
import SendEmail from "@/components/mailer";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "No user with such email" },
        { status: 400 }
      );
    }
 
    await SendEmail({
      email,
      emailType: "RESET",
      userId: user.id,
      fullname: user.fullname,
    });

    return NextResponse.json({
      message: "Password reset mail sent successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

connect();

import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {getDataFromToken} from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function POST(request: NextRequest) {
  try {
            const {userId, sessionId} = await getDataFromToken(request);
    const reqBody = await request.json();

    const {_id, fullname, email, mobileNumber} = reqBody;
    console.log(reqBody, "data coming in");
    // Check if the User already exists
    const user = await User.findOne({_id});
    if (!user) {
      return NextResponse.json({error: "User not found"}, {status: 400});
    }

    user.fullname = fullname;
    user.email = email;
    user.number = mobileNumber;
    await user.save();
    // Return the updated information
    const resultData = {
      fullname: user.fullname,
      email: user.email,
      number: user.number,
    };
    return NextResponse.json({
      message: "History added",
      success: true,
      resultData,
    });
  } catch (error: any) {
    console.error("Error updating transaction:", error.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }

}
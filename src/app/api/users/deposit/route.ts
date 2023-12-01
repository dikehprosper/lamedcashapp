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

    const { _id, betId, network, amount, transactionId } = await reqBody;
console.log(reqBody)

    //Check if the User already exist
    const user = await User.findOne({ _id });

    if (!user) {
      return NextResponse.json(
        { error: "User does not already exists" },
        { status: 400 }
      );
    }

    user.transactionHistory.push({
      status: "pending",
      registrationDateTime: new Date(),
      amount: amount,
      network: network,
      betId: betId,
      transactionId: transactionId,
      fundingType: "deposits",
    
    });

    await user.save();

    return NextResponse.json({
      message: "History added",
      success: true,
      user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

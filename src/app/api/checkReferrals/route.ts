
// Import necessary modules
import { NextRequest, NextResponse } from "next/server";
import { FedaPay, Transaction, Customer } from "fedapay";
import { v4 as uuidv4 } from "uuid";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import {getDataFromToken} from "@/helpers/getDataFromToken";
connect();

export async function POST(request: NextRequest) {
  try {
    const {userId, sessionId} = await getDataFromToken(request);
    const {email} = await request.json(); // Destructure email from the request body

    console.log("Received email:", email);

    const user = await User.findOne({email});
    console.log(user);
    if (user.referrals.length < 1) {
      user.referrals.map;
    }

    return NextResponse.json({
      status: 200,
      //    totalDepositCount,
      //   totalWithdrawalCount,
    });
  } catch (error: any) {
    return NextResponse.json(
      {error: error.message},
      {status: error.status || 500}
    );
  }
}


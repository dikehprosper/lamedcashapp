import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const referrals = reqBody // Assuming your JSON structure has a 'referrals' key

    const userPromises = referrals.map(async (email: any) => {
      try {
        const user = await User.findOne({ email });
        return user;
      } catch (error: any) {
        console.error(`Error fetching user for email ${email}:`, error.message);
        return null;
      }
    });

    const users = await Promise.all(userPromises);

     const usersSuccesfulCountusers = users.map( user => {
        return {"name": user.fullname, "email": user.email, "SuccesfulDepositCountusers": user.successfulDepositCount, "SuccesfulWithdrawalCountusers" : user.succesfulWithdrawalCount}
    })

    console.log(usersSuccesfulCountusers, "usersSuccesfulCountusers");
    const response = NextResponse.json({
      message: "successful",
      success: true,
      usersSuccesfulCountusers,
    });

 return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

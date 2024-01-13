
// Import necessary modules
import { NextRequest, NextResponse } from "next/server";
import { FedaPay, Transaction, Customer } from "fedapay";
import { v4 as uuidv4 } from "uuid";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();
export async function POST(request: NextRequest) {
   try {
    const { email } = await request.json(); // Destructure email from the request body

    console.log('Received email:', email);

  

      const user = await User.findOne({ email });
console.log(user)
if (user.referrals.length < 1) {
    user.referrals.map
}


    // // Wait for all promises to resolve
    // const userData = await Promise.all(userDataPromises);

    // // Calculate the total counts
    // const totalDepositCount = userData.reduce((sum, user) => sum + user.successfulDepositCount, 0);
    // const totalWithdrawalCount = userData.reduce((sum, user) => sum + user.successfulWithdrawalCount, 0);

 

    return NextResponse.json({
      status: 200,
    //    totalDepositCount,
    //   totalWithdrawalCount,
    })

  } catch (error: any) {
     return NextResponse.json(
       { error: error.message },
       { status: error.status || 500 }
     );
  }
}


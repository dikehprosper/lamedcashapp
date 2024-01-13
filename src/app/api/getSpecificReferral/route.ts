// Import necessary modules
import { NextRequest, NextResponse } from "next/server";
import { FedaPay, Transaction, Customer } from "fedapay";
import { v4 as uuidv4 } from "uuid";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { id } = reqBody;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return NextResponse.json(
        { error: "user does not exist" },
        { status: 402 }
      );
    }
    

  
const result = user.referrals;

const userDataPromises = result.map(async (email: any) => {
    console.log(email)
    const userData = await User.findOne({ email: email });
    return userData;
});

// Use Promise.all to wait for all promises to resolve
const userDataArray = await Promise.all(userDataPromises);


     


    return NextResponse.json({
      message: "",
      status: 200,
      result,
      userDataArray
    });
  } catch (error: any) {
    // Handle errors and return a JSON response
    console.error(error, "error");
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

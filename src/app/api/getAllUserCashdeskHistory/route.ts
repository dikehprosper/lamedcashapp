// Import necessary modules
import { NextRequest, NextResponse } from "next/server";
import { FedaPay, Transaction, Customer } from "fedapay";
import { v4 as uuidv4 } from "uuid";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();
export async function GET(request: NextRequest) {
  try {
    const user = await User.findOne({ isAdmin: true });
  if (!user) {
    return NextResponse.json(
      { error: "no admin exist" },
      { status: 402 }
    );
  }


  const result = user.transactionHistory
 

    return NextResponse.json({
      message: "",
      status: 200,
      result
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

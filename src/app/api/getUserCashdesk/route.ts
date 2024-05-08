// Import necessary modules
import { NextRequest, NextResponse } from "next/server";
import { FedaPay, Transaction, Customer } from "fedapay";
import { v4 as uuidv4 } from "uuid";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import {SubAdminUser, AdminUser} from "@/models/userModel";
connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const {id} = reqBody;
    const user = await SubAdminUser.findOne({_id: id});
  if (!user) {
    return NextResponse.json(
      { error: "user does not exist" },
      { status: 402 }
    );
  }
console.log(user)

  const result = user.transactionHistory
    await user.save();

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

import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { _id, fullname, email, mobileNumber, fedapayId } =  reqBody;
    console.log(reqBody)
   // Check if the User already exists
   const user = await User.findOne({ _id });
   if (!user) {
     return NextResponse.json({ error: "User not found" }, { status: 400 });
   }
    
  if (user.isUser === true) {
    const apiUrl = `${process.env.APIURL}${fedapayId}`;
    const apiKey = process.env.FEDAPAY_KEY;

    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: fullname.split(" ")[0],
        lastname: fullname.split(" ")[1],
        email: email,
        phone_number: {
          number: `+229${mobileNumber}`,
          country: "BJ",
        },
      }),
    });
  }


   
  user.fullname = fullname
  user.email = email
user.number = mobileNumber
await user.save()
    // Return the updated information
    return NextResponse.json({
      message: "History added",
      success: true,
    });
  } catch (error: any) {
    console.error("Error updating transaction:", error.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }

}
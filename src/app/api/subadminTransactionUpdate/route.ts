import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// import { sendEmail } from "@/helpers/mailer";
// pages/api/generateUuid.js
import { v4 as uuidv4 } from "uuid";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { customerId, identifierId, cashdeskId, updatetype } =  reqBody;
    const filter = {
      _id: cashdeskId,
      "transactionHistory.identifierId": identifierId,
    };
    const update = {
      $set: {
        "transactionHistory.$.status": updatetype,
        "transactionHistory.$.isSubmitted": true,
      },
    };
    const options = { new: true }; // This option returns the modified document

    const updatedCashdeskUser = await User.findOneAndUpdate(
      filter,
      update,
      options
    );

    if (!updatedCashdeskUser) {
      console.log("Failed to update transaction in cashdeskUser");
      return NextResponse.json(
        { error: "Failed to update transaction in cashdeskUser" },
        { status: 500 }
      );
    }

    // Similarly, you can perform the update for the customer document
    console.log(customerId)
    const customerFilter = {
      _id: customerId,
      "transactionHistory.identifierId": identifierId,
    };
    const customerUpdate = {
      $set: { "transactionHistory.$.status": updatetype },
    };

    const updatedCustomer = await User.findOneAndUpdate(
      customerFilter,
      customerUpdate,
      options
    );

    if (!updatedCustomer) {
      console.log("Failed to update transaction in customer");
      return NextResponse.json(
        { error: "Failed to update transaction in customer" },
        { status: 500 }
      );
    }

    // Return the updated information
    return NextResponse.json({
      message: "History added",
      success: true,
      currentTransactionSubadminStatus: updatetype,
      currentTransactionSubadminIsSubmitted: true,
    });
  } catch (error: any) {
    console.error("Error updating transaction:", error.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }

}

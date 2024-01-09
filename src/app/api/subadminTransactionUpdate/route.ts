import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// import { sendEmail } from "@/helpers/mailer";
// pages/api/generateUuid.js
import { v4 as uuidv4 } from "uuid";

connect();

// ... (your existing code)

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { customerId, identifierId, cashdeskId, updatetype, amount, type } =
      reqBody;
    const currentCashdeskUser = await User.findById(cashdeskId);
    console.log(currentCashdeskUser.email);
    if (!currentCashdeskUser) {
      console.log("subadmin not found");
      return NextResponse.json(
        { error: "subadmin not found" },
        { status: 407 }
      );
    }

    const updatedCashdeskUser = currentCashdeskUser.transactionHistory.find(
      (t: any) => t.identifierId.toString() === identifierId
    );
    updatedCashdeskUser.status = updatetype;

    // Check if the fields exist, if not, initialize them
    const currentDepositCountSubadmin =
      updatedCashdeskUser.successfulDepositCount;
    const currentWithdrawalCountSubadmin =
      updatedCashdeskUser.succesfulWithdrawalCount;

    // Calculate the new values
    const newDepositCountSubadmin =
      updatetype === "Successful" && type === "deposits"
        ? currentDepositCountSubadmin + amount
        : currentDepositCountSubadmin;

    const newWithdrawalCountSubadmin =
      updatetype === "Successful" && type === "withdrawals"
        ? currentWithdrawalCountSubadmin + amount
        : currentWithdrawalCountSubadmin;
    currentCashdeskUser.successfulDepositCount = newDepositCountSubadmin;
    currentCashdeskUser.succesfulWithdrawalCount = newWithdrawalCountSubadmin;
    await currentCashdeskUser.save();

    if (!currentCashdeskUser) {
      console.log("Failed to update transaction in cashdeskUser");
      return NextResponse.json(
        { error: "Failed to update transaction in cashdeskUser" },
        { status: 502 }
      );
    }

    const existingCustomer = await User.findById(customerId);
    console.log(existingCustomer.email);
    if (!existingCustomer) {
      console.log("Customer not found");
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    const customerUpdate = existingCustomer.transactionHistory.find(
      (t: any) => t.identifierId.toString() === identifierId
    );
    customerUpdate.status = updatetype;

    // Check if the fields exist, if not, initialize them
    const currentDepositCount = existingCustomer.successfulDepositCount;
    const currentWithdrawalCount = existingCustomer.succesfulWithdrawalCount;

    // Calculate the new values
    const newDepositCount =
      updatetype === "Successful" && type === "deposits"
        ? currentDepositCount + amount
        : currentDepositCount;

    const newWithdrawalCount =
      updatetype === "Successful" && type === "withdrawals"
        ? currentWithdrawalCount + amount
        : currentWithdrawalCount;
    existingCustomer.successfulDepositCount = newDepositCount;
    existingCustomer.succesfulWithdrawalCount = newWithdrawalCount;
    await existingCustomer.save();

    if (!existingCustomer) {
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

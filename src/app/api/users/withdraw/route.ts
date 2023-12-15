import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import User from "@/models/userModel";
import mongoose from "mongoose";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const {
      _id,
      betId,
      withdrawalCode,
      amount,
      momoName,
      momoNumber,
      cashdeskId,
    } = reqBody;

    console.log(reqBody);

    // Check if the User already exists
    const user = await User.findOne({ _id });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    const newUuid = uuidv4();
    const date = new Date();

    // Create a new transaction history entry for the user
    const userTransaction = {
      status: "Pending",
      registrationDateTime: date,
      amount,
      withdrawalCode,
      betId,
      momoName,
      momoNumber,
      fundingType: "withdrawals",
      identifierId: newUuid,
    };

    // Add the current pending transaction to the user
    user.transactionHistory.push(userTransaction);

    // Validate cashdeskId before using it
    if (!mongoose.Types.ObjectId.isValid(cashdeskId)) {
      return NextResponse.json(
        { error: "Invalid cashdeskId" },
        { status: 401}
      );
    }

    // Find the subadmin user by cashdeskId
    const adminUser = await User.findById(cashdeskId);

    if (!adminUser) {
      return NextResponse.json(
        { error: "Subadmin User does not exist" },
        { status: 402 }
      );
    }

    // Create a new transaction history entry for the subadmin
    const subadminTransaction = {
      userid: _id,
      status: "Pending",
      registrationDateTime: date,
      withdrawalCode,
      amount,
      betId,
      fundingType: "withdrawals",
      identifierId: newUuid,
       momoName,
      momoNumber,
    };

    // Add the current pending transaction to the subadmin user
    adminUser.transactionHistory.push(subadminTransaction);

    // Save changes to both users
    await adminUser.save();
    await user.save();

    // Return the added transaction details in the response
    return NextResponse.json({
      message: "History added",
      success: true,
      userTransaction,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

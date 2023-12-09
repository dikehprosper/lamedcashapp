import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// import { sendEmail } from "@/helpers/mailer";
// pages/api/generateUuid.js
import { v4 as uuidv4 } from 'uuid';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { _id, betId, network, amount, transactionId } = await reqBody;

    //Check if the User already exist
    const user = await User.findOne({ _id });

    if (!user) {
      return NextResponse.json(
        { error: "User does not already exists" },
        { status: 400 }
      );
    }
    const newUuid = uuidv4();

    user.transactionHistory.push({
      status: "Pending",
      registrationDateTime: new Date(),
      amount: amount,
      network: network,
      betId: betId,
      transactionId: transactionId,
      fundingType: "deposits",
      identifierId: newUuid,
    });

    /// add to less buzy admin

    /// add to less buzy admin
    let userWithLowestPendingTransactionCount;

    const adminUsers = await User.find({ isSubAdminDeposits: true });

    // Filter admin users who are not out of funds
    const adminUsersWithFunds = adminUsers.filter(
      (adminUser) => !adminUser.outOfFunds
    );

    // If there are no admin users with funds, handle the case accordingly
    if (adminUsersWithFunds.length === 0) {
      console.log("No subadmin users with available funds.");
      // Handle the case when there are no subadmin users with available funds
    } else {
      // Iterate through admin users with funds to find the one with the lowest count of transactions
      userWithLowestPendingTransactionCount = adminUsersWithFunds[0];

      for (const adminUser of adminUsersWithFunds) {
        const pendingTransactionCount = adminUser.transactionHistory.filter(
          (transaction: { status: string }) => transaction.status === "pending"
        ).length;

        const lowestPendingTransactionCount =
          userWithLowestPendingTransactionCount.transactionHistory.filter(
            (transaction: { status: string }) =>
              transaction.status === "pending"
          ).length;

        if (pendingTransactionCount < lowestPendingTransactionCount) {
          userWithLowestPendingTransactionCount = adminUser;
        }
      }
    }

    // Adding the current pending transaction to the user with the lowest pending transaction count
    userWithLowestPendingTransactionCount.transactionHistory.push({
      userid: _id,
      username: user.fullname,
      userNumber: user.number,
      status: "Pending",
      registrationDateTime: new Date(),
      amount: amount,
      network: network,
      betId: betId,
      transactionId: transactionId,
      fundingType: "deposits",
      identifierId: newUuid,
    });

    await userWithLowestPendingTransactionCount.save();
    await user.save();

    return NextResponse.json({
      message: "History added",
      success: true,
      user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

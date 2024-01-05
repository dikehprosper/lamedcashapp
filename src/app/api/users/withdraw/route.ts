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
    await user.save();
    // Find the subadmin user by cashdeskId

    const adminUser = await User.find({
      isSubAdminWithdrawals: true,
      isOutOfFunds: false,
    });
    if (!adminUser || adminUser.length === 0) {
      return NextResponse.json(
        { error: "Subadmin User does not exist" },
        { status: 402 }
      );
    }

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

    // Example usage: Get the index of the subadmin with current: true
    let currentSubadminIndex = -1;

    for (let i = 0; i < adminUser.length; i++) {
      if (adminUser[i].current === true) {
        currentSubadminIndex = i;
        break;
      }
    }

    // Find the subadmin that is currently receiving requests
    const currentSubadmin = adminUser.find(
      (subadmin) => subadmin.current === true
    );

    // Check if the request count for the current subadmin is divisible by 10
    if (currentSubadmin && currentSubadmin.currentCount === 5) {
      // Mark the current subadmin as not 'current'
      currentSubadmin.current = false;
      currentSubadmin.currentCount = 0;
      let nextCurrentSubadminIndex =
        (currentSubadminIndex + 1) % adminUser.length;

      let nextSubadmin = adminUser[nextCurrentSubadminIndex]
        ? adminUser[nextCurrentSubadminIndex]
        : adminUser[0];

      // Mark the next subadmin as 'current'
      nextSubadmin.current = true;
      const updatedCount = nextSubadmin.currentCount + 1;
      nextSubadmin.currentCount = updatedCount;
      nextSubadmin.transactionHistory.push(subadminTransaction);

      // Save changes to the database for both the current and next subadmin
      await Promise.all([currentSubadmin.save(), nextSubadmin.save()]);
      // Return the added transaction details in the response
      return NextResponse.json({
        message: "History added",
        success: true,
        userTransaction,
      });
    } else {
      currentSubadmin.transactionHistory.push(subadminTransaction);
      const updatedCount = currentSubadmin.currentCount + 1;
      currentSubadmin.currentCount = updatedCount;
      await currentSubadmin.save();
      // Return the added transaction details in the response
      return NextResponse.json({
        message: "History added",
        success: true,
        userTransaction,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}





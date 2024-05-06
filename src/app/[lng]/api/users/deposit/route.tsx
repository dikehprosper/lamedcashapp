// Import necessary modules
import { NextRequest, NextResponse } from "next/server";
import { FedaPay, Transaction, Customer } from "fedapay";
import { v4 as uuidv4 } from "uuid";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      _id,
      betId,
      email,
      amount,
      momoName,
      momoNumber,
      network,
      fedapayId,
    } = await reqBody;

    // Find the subadmin user by cashdeskId
    const adminUser = await User.find({
      isSubAdminDeposits: true,
      isOutOfFunds: false,
    });
    if (!adminUser || adminUser.length === 0) {
      return NextResponse.json(
        { error: "No available Subadmin User" },
        { status: 403 }
      );
    }

    // calculate the percentage of amount
    const deductionPercentage = 1.8;
    const deductionAmount = (deductionPercentage / 100) * amount;

    // Calculate the new amount after deduction and round to the nearest whole number
    const newAmount = Math.round(amount - deductionAmount);

    // Find available admin
    const admin = await User.findOne({ isAdmin: true });
    if (admin.isDepositsOpen === false) {
      return NextResponse.json(
        { error: "We are currently under maintainance" },
        { status: 405 }
      );
    }

    FedaPay.setApiKey(process.env.FEDAPAY_KEY1!);
    FedaPay.setEnvironment(process.env.ENVIRONMENT1!);

    //find user and add pending transaction
    const user = await User.findOne({ email });
    console.log(user.email);

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    //Check if user is activated
    if (!user.isActivated) {
      return NextResponse.json(
        { error: "your account has been deactivated" },
        { status: 404 }
      );
    }

    // Change number if originally saved number is different from number sent in
    if (momoNumber !== user.number) {
      console.log("phone number wasn't the original o has to be edited");
      const apiUrl = `${process.env.APIURL1}${fedapayId}`;
      const apiKey = process.env.FEDAPAY_KEY1!;

      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: momoName.split(" ")[0],
          lastname: momoName.split(" ")[1],
          email: email,
          phone_number: {
            number: `+229${momoNumber}`,
            country: "BJ",
          },
        }),
      });
    }

    // Generate token and Create the transaction on Fedapay
    const transaction = await Transaction.create({
      description: "Description",
      amount: newAmount,
      callback_url: `${process.env.DOMAIN!}/payments`,
      currency: {
        iso: "XOF",
      },
      customer: {
        email: email,
      },
    });

    const token = await transaction.generateToken();
    const apiUrl1 = `${process.env.SECONDAPIURL1}${network}`;
    const apiKey1 = process.env.FEDAPAY_KEY1!;

    const response1 = await fetch(apiUrl1, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey1}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token.token,
      }),
    });

    if (response1.status !== 200) {
      return NextResponse.json(
        { error: "Unable to initiate transaction" },
        { status: 401 }
      );
    }
    if (response1.status === 200) {
      console.log("successful2");
    }

    // add the current transaction to the user
    const newUuid = uuidv4();
    const date = new Date();
    user.pendingDeposit.push({
      fedapayTransactionId: transaction.id,
      transactionId: newUuid,
      createdAt: date,
      status: "Pending",
      amount: amount,
      betId: betId,
      momoName: momoName,
      momoNumber: momoNumber,
    });
    await user.save();

    // Change number back to original
    if (momoNumber !== user.number) {
      console.log("phone number wasn't the original o has to be edited");
      const apiUrl = `${process.env.APIURL1}${fedapayId}`;
      const apiKey = process.env.FEDAPAY_KEY1!;

      const response2 = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: momoName.split(" ")[0],
          lastname: momoName.split(" ")[1],
          email: email,
          phone_number: {
            number: `+229${user.number}`,
            country: "BJ",
          },
        }),
      });
    }
    // Return a JSON response with the transaction status
    return NextResponse.json({
      message: "Transaction  created",
      status: 200,
    });
  } catch (error: any) {
    if (error.message === "Token has expired") {
      // Handle token expiry error
      return NextResponse.json(
        { error: "Token has expired. Please log in again." },
        { status: 402 }
      );
    } else {
      // Handle other errors
      return NextResponse.json(
        { error: error.message },
        { status: error.status || 500 }
      );
    }
  }
}

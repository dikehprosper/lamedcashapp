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

    FedaPay.setApiKey(process.env.FEDAPAY_KEY_SANDBOX!);
    FedaPay.setEnvironment("sandbox");

    //find user and add pending transaction
    const user = await User.findOne({ email });
    console.log(user.pendingDeposit)
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    if (momoNumber !== user.number) {
      const apiUrl = `https://sandbox-api.fedapay.com/v1/customers/${fedapayId}`;
      const apiKey = process.env.FEDAPAY_KEY_SANDBOX!;

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

    const transaction = await Transaction.create({
      description: "Description",
      amount: amount,
      callback_url: `${process.env.DOMAIN!}/payments`,
      currency: {
        iso: "XOF",
      },
      customer: {
        email: email,
      },
    });

    const token = await transaction.generateToken();

    const apiUrl1 = `https://sandbox-api.fedapay.com/v1/${network}`;
    const apiKey1 = process.env.FEDAPAY_KEY_SANDBOX!;

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
    const newUuid = uuidv4();
    const date = new Date();
    if (user) {
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
    }

    const apiUrl2 = `https://sandbox-api.fedapay.com/v1/customers/${fedapayId}`;
    const apiKey2 = process.env.FEDAPAY_KEY_SANDBOX!;

    const response2 = await fetch(apiUrl2, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${apiKey2}`,
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

    await user.save();
    // Return a JSON response with the transaction status
    return NextResponse.json({
      message: "Transaction  created",
      status: 200,
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


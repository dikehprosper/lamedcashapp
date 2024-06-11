/* eslint-disable */
// @ts-nocheck
import {NextRequest, NextResponse} from "next/server";
// import { FedaPay, Transaction, Customer } from "fedapay";
// const { Webhook } = require("fedapay");
import {connect} from "@/dbConfig/dbConfig";
import User, {
  SubAdminUser,
  AdminUser,
  QrCodeDeposits,
} from "@/models/userModel";

connect();

const date = new Date();

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json(); // Correct method to get the body of the request
    console.log(rawBody, "rawBody");

    const response = await fetch(
      `https://api.feexpay.me/api/transactions/public/2dfea632-30e1-42b4-87df-34d7b4eeddbc`,
      {
        method: "GET", // Specify the method
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer fp_rbtFv0wBIzB4OzZUg1oJtFP3ITcfzaSh8wyOqetJkulyqpL0sATFu1iJMzGIyxhY",
        },
      }
    );

    const resultData = await response.json();

    // Response data can be either FAILED, SUCCESSFUL OR PENDING

    //FOR FAILED
    //     {
    //   reference: '2dfea632-30e1-42b4-87df-34d7b4eeddbc',
    //   amount: 100,
    //   phoneNumber: 22967634289,
    //   status: 'FAILED',
    //   last_name: '',
    //   first_name: 'alex',
    //   mode: 'MTN',
    //   callback_info: 'CALLBACK_INFO'
    // }

    // FOR SUCCESSFUL
    // {
    //   reference: '2dfea632-30e1-42b4-87df-34d7b4eeddbc',
    //   amount: 100,
    //   phoneNumber: 22967634289,
    //   status: 'FAILED',
    //   last_name: '',
    //   first_name: 'alex',
    //   mode: 'MTN',
    //   callback_info: 'CALLBACK_INFO'
    // }

    // FOR PENDING
    //     {
    //   reference: '2dfea632-30e1-42b4-87df-34d7b4eeddbc',
    //   amount: 100,
    //   phoneNumber: 22967634289,
    //   status: 'FAILED',
    //   last_name: '',
    //   first_name: 'alex',
    //   mode: 'MTN',
    //   callback_info: 'CALLBACK_INFO'
    // }
    console.log(resultData, "resultData");
    if (resultData.status === "FAILED") {
      console.log("failed");
    } else if (resultData.status === "SUCCESSSFUL") {
      console.log("successful");
    } else if (resultData.status === "PENDING") {
      console.log("pending");
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    console.error(error, "error");
    return NextResponse.json(
      {error: error.message || "Webhook Error"},
      {status: 400}
    );
  }
}

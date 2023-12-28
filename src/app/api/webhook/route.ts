/* eslint-disable */
// @ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import { FedaPay, Transaction, Customer } from "fedapay";

const { Webhook } = require("fedapay");

// You can find your endpoint's secret key in your webhook settings
const endpointSecret = process.env.ENDPOINTSECRET_WEBHOOK_SANDBOX!;

export async function POST(request: NextRequest) {
  try {
    const sig = request.headers["x-fedapay-signature"];

    let event;

    event = Webhook.constructEvent(request.body, sig, endpointSecret);

    // Handle the event
    switch (event.name) {
      case "transaction.created":
        console.log("transaction created");
        // Transaction created
        break;
      case "transaction.approved":
        console.log("transaction approved");
        // Transaction approved
        break;
      case "transaction.canceled":
        console.log("transaction canceled");
        // Transaction canceled
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    NextResponse.json({ received: true });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Webhook Error" },
      { status: 400 }
    );
  }
}

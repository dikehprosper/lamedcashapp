import { Webhook } from "fedapay";
import { NextRequest, NextResponse } from "next/server";
const endpointSecret = "wh_sandbox...";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
   const sig = (request.headers as unknown as { [key: string]: string })?.[
     "x-fedapay-signature"
   ];

    let event;
    event = Webhook.constructEvent(reqBody, sig, endpointSecret);

    switch (event.name) {
      case "transaction.created":
        // Transaction created
        NextResponse.json({
          message: "Transaction created",
          success: true,
        });
        break;
      case "transaction.approved":
        // Transaction approved
        NextResponse.json({
          message: "Transaction approved.",
          success: true,
        });
        break;
      case "transaction.canceled":
        // Transaction canceled
        NextResponse.json({
          message: "Transaction cancelled.",
          success: true,
        });
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

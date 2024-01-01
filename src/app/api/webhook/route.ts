/* eslint-disable */
// @ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import { FedaPay, Transaction, Customer } from "fedapay";
const fs = require("fs");
const { Webhook } = require("fedapay");

// You can find your endpoint's secret key in your webhook settings
// const endpointSecret = process.env.ENDPOINTSECRET_WEBHOOK_SANDBOX!;
// wh_sandbox_GdCc4gm2N4Y6IoL9mzbW9oQ2
const endpointSecret = "wh_sandbox_GdCc4gm2N4Y6IoL9mzbW9oQ2";

export async function POST(request: NextRequest) {


  try {
    const headersList = request.headers.get("x-fedapay-signature");
    console.log(headersList);
    // Convert the HeadersList object to a JSON string
    const jsonString = "snsgfsgfmgmg";

    // Specify the file path where you want to save the JSON data
    const filePath = "header1.json";

    // Write the JSON string to the file
    fs.writeFileSync(filePath, jsonString, (err) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log("data written successfully");
      }
    });

    console.log("written");

    // Now xFedapaySignature contains the value of 'x-fedapay-signature'
    // console.log(xFedapaySignature);

    // console.log(sig, "sig");
    // console.log(request, "request.headers")

    // let event;

    // event = Webhook.constructEvent(request.body, sig, endpointSecret);

    // // Handle the event
    // switch (event.name) {
    //   case "transaction.created":
    //     console.log("transaction created");
    //     // Transaction created
    //     break;
    //   case "transaction.approved":
    //     console.log("transaction approved");
    //     // Transaction approved
    //     break;
    //   case "transaction.canceled":
    //     console.log("transaction canceled");
    //     // Transaction canceled
    //     break;
    //   default:
    //     console.log(`Unhandled event type ${event.type}`);
    // }

    // // Return a response to acknowledge receipt of the event
    // NextResponse.json({ received: true });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Webhook Error" },
      { status: 400 }
    );
  }
}







// const { Webhook } = require('fedapay')

// // You can find your endpoint's secret key in your webhook settings
// const endpointSecret = 'wh_sandbox...';

// // This example uses Express to receive webhooks
// const app = require('express')();

// // Use body-parser to retrieve the raw body as a buffer
// const bodyParser = require('body-parser');

// // Match the raw body to content type application/json
// app.post('/webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {
//   const sig = request.headers['x-fedapay-signature'];

//   let event;

//   try {
//     event = Webhook.constructEvent(request.body, sig, endpointSecret);
//   } catch (err) {
//     response.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   // Handle the event
//   switch (event.name) {
//     case 'transaction.created':
//       // Transaction created
//       break;
//     case 'transaction.approved'':
//       // Transaction approved
//       break;
//     case 'transaction.canceled'':
//       // Transaction canceled
//       break;
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   // Return a response to acknowledge receipt of the event
//   response.json({received: true});
// });

// app.listen(4242, () => console.log('Running on port 4242'));
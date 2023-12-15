// Import necessary modules
import { NextRequest, NextResponse } from "next/server";
import { FedaPay, Transaction, Customer } from "fedapay";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { _id, betId, amount, email, network, cashdeskId } = await reqBody;
    console.log(reqBody);
    // Create the transaction
    /* Replace YOUR_API_SECRET_KEY by your API secret key */
    FedaPay.setApiKey(process.env.FEDAPAY_KEY!);
    /* Specify whenever you are willing to execute your request in test or live mode */
    FedaPay.setEnvironment("sandbox"); //or setEnvironment('live');
    /* Create the transaction */

    console.log(process.env.DOMAIN!, "domain");
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
    console.log(transaction.id);
    const token = await transaction.generateToken();
    console.log(token.token);
    // const url1 = token.url;

    const apiUrl = `https://api.fedapay.com/v1/${network}`;
    const apiKey = process.env.FEDAPAY_KEY!;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token.token,
      }),
    });

    const data = await response.json();
    const pollInterval = 3000; // 3 seconds (adjust as needed)
    const maxTimeout = 30000; // 30 seconds
    let elapsedTime = 0;
    let isTransactionCompleted = false;
    let updatedTransaction;

    while (!isTransactionCompleted && elapsedTime < maxTimeout) {
      updatedTransaction = await Transaction.retrieve(transaction.id);

      if (updatedTransaction.status === "pending") {
        // The transaction is still pending, wait for the next poll
        console.log(
          "Payment is still pending. Waiting for customer approval..."
        );
        await new Promise((resolve) => setTimeout(resolve, pollInterval));
        elapsedTime += pollInterval;
      } else if (updatedTransaction.status === "approved") {
        // The payment is approved
        console.log("Payment approved");
        isTransactionCompleted = true;
      } else if (updatedTransaction.status === "declined") {
        // The payment is approved
        console.log("Payment declined");
        isTransactionCompleted = true;
      } else if (updatedTransaction.status === "canceled") {
        // The payment is approved
        console.log("Payment declined");
        isTransactionCompleted = true;
      }
    }

    // Return a JSON response with the transaction status
    return NextResponse.json({
      message: "Transaction  status",
      status: updatedTransaction?.status,
    });
  } catch (error: any) {
    // Handle errors and return a JSON response
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

// readonly SANDBOX_BASE = "https://sandbox-api.fedapay.com";
//   readonly PRODUCTION_BASE = "https://api.fedapay.com";
//   readonly DEVELOPMENT_BASE = "https://dev-api.fedapay.com";

// creating a customer on signup

// /* Replace YOUR_API_SECRET_KEY by your secret API key */
// FedaPay.setApiKey("sk_sandbox_rlZQIN8rnovgkg2TCOeVSCxp");

// /* Specify whenever you are willing to execute your request in test or live mode */
// FedaPay.setEnvironment("sandbox"); //or setEnvironment('live');

// /* Create the customer */
// const customer = await Customer.create({
//   firstname: "John",
//   lastname: "Doe",
//   email: "john1@doe.com",

// });
// console.log(customer);

// const transaction = await Transaction.retrieve(ID);
// if (transaction.status == "approved") {
//   console.log("Payment approved");
// }
// Return a JSON response

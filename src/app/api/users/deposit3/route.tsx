// Import necessary modules
import { NextRequest, NextResponse } from "next/server";
import { FedaPay, Transaction, Customer } from "fedapay";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { _id, betId, amount, email, network, cashdeskId } = await reqBody;

    FedaPay.setApiKey("sk_sandbox_rlZQIN8rnovgkg2TCOeVSCxp");
    FedaPay.setEnvironment("sandbox");

    const transaction = await Transaction.create({
      description: "Description",
      amount: amount,
      callback_url: `${process.env.DOMAIN!}/payments`,
      currency: {
        iso: "XOF",
      },
      customer: {
        email: "john.doe@example.com",
      },
    });

    const token = await transaction.generateToken();

    const apiUrl = `https://sandbox-api.fedapay.com/v1/moov`;
    const apiKey = "sk_sandbox_rlZQIN8rnovgkg2TCOeVSCxp";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token.token,
      }),
    });

    // Return a JSON response with the transaction status
    return NextResponse.json({
      message: "Transaction  status",
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

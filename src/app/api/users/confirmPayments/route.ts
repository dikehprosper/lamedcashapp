// Import necessary modules
import { NextRequest, NextResponse } from "next/server";
import { FedaPay, Transaction, Customer } from "fedapay";

// // Set up FedaPay configuration
// FedaPay.setApiKey("pk_sandbox_OijzqH50c_AHBHtHsUWYcz80");
// FedaPay.setEnvironment("sandbox"); // or setEnvironment('live');
// Export named function for the GET method
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { _id, betId, amount, email } = await reqBody;
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
      callback_url: `${process.env.DOMAIN!}/transactions`,
      currency: {
        iso: "XOF",
      },
      customer: {
        email: "dikehprosper12@gmail.com",
      },
    });
    console.log(transaction);
    const token = await transaction.generateToken();
    console.log(token.url);
    const url1 = token.url;
    return NextResponse.json({
      message: "Transaction created successfully",
      url1,
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

// Import necessary modules
import { NextRequest, NextResponse } from 'next/server';
import { FedaPay, Transaction } from 'fedapay';

// Set up FedaPay configuration
FedaPay.setApiKey("sk_sandbox_rlZQIN8rnovgkg2TCOeVSCxp");
FedaPay.setEnvironment('sandbox'); // or setEnvironment('live');

// Export named function for the GET method
export async function POST(request: NextRequest) {
  try {
    // Create the transaction
    const transaction = await Transaction.create({
      description: 'Description',
      amount: 2000,
      callback_url: 'https://maplateforme.com/callback',
      currency: {
        iso: 'XOF',
      },
      customer: {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        phone_number: {
          number: '97808080',
          country: 'BJ',
        },
      },
    });

    console.log(transaction);

    // Return a JSON response
    return NextResponse.json({
      message: "Transaction created successfully",
      transaction,
    });
  } catch (error: any) {
    // Handle errors and return a JSON response
    console.error(error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

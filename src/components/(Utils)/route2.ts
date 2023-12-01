import axios from "axios";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
let storedReferenceId: string | null = null;
export async function POST() {
  // Get access token
  try {
    const response = await fetch(
      "https://sandbox.momodeveloper.mtn.com/collection/token/",
      {
        method: "POST",
        // Request headers
        headers: {
          Authorization:
            "Basic MzdmYzJlM2QtZGNkMC00ZjcwLWJmMWYtNGQ5MjAwYTliYjdiOjQwYzRjMGQ3YTVlNjRhM2JiZTQzM2I0ZjRmNzhkMmYz",
          "Cache-Control": "no-cache",
          "Ocp-Apim-Subscription-Key": "6e052af95fa648c9a0803c08d11049b9",
        },
      }
    );

    // Check if the request was successful (status code 200-299)
    const jsonResponse = await response.json();
    const token = `Bearer ${jsonResponse.access_token}`;
    console.log(`First response:`);
    console.log(token);
    // Try to make payments
    if (!storedReferenceId) {
      // Generate a new Reference ID if not already generated
      storedReferenceId = uuidv4();
    }
    const body = {
      amount: "500",
      currency: "EUR",
      externalId: "123456789",
      payer: {
        partyIdType: "MSISDN",
        partyId: "46767656677",
      },
      payerMessage: "texting",
      payeeNote: "texting",
    };

    try {
      const response2 = await axios.post(
        "https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay",
        body,
        {
          headers: {
            Authorization: token,
            "X-Reference-Id": storedReferenceId,
            "X-Target-Environment": "sandbox",
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "Ocp-Apim-Subscription-Key": "6e052af95fa648c9a0803c08d11049b9",
          },
        }
      );
      const response3 = await response2;
      console.log(`Second response`);
      console.log(response3.status);
      console.log(response3.statusText);
      const paymentId = storedReferenceId; // Replace with the actual payment ID
      try {
        const response4 = await axios.get(
          `https://sandbox.momodeveloper.mtn.com/collection/v2_0/payment/${paymentId}`,
          {
            headers: {
              Authorization: token,
              "X-Target-Environment": "sandbox",
              "Cache-Control": "no-cache",
              "Ocp-Apim-Subscription-Key": "6e052af95fa648c9a0803c08d11049b9",
            },
          }
        );

        const response5 = await response4;
        console.log(`Third response:`);
        console.log(response5.data);
        const response6 = NextResponse.json({
          message: "payment response sent Successful",
          success: true,
        });
        return response6;
      } catch (error: any) {
        return NextResponse.json(
          { error: `Failed to get payment response ${error.message}` },
          { status: 502 }
        );
      }
    } catch (error: any) {
      return NextResponse.json(
        { error: `Failed to perform payment ${error.message}` },
        { status: 501 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: `Failed to get access token ${error.message}` },
      { status: 500 }
    );
  }
}

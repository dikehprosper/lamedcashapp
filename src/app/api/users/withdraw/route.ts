// Import necessary modules
import {NextRequest, NextResponse} from "next/server";
import {FedaPay, Transaction, Customer} from "fedapay";
import {v4 as uuidv4} from "uuid";
import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig";
import {SubAdminUser, AdminUser} from "@/models/userModel";
import {getDataFromToken} from "@/helpers/getDataFromToken";
import {rechargeAccount, withdrawFromAccount} from "@/components/mobcash";
import type {NextApiRequest, NextApiResponse} from "next";
import fetch from "node-fetch";

connect();
interface ApiResponse {
  Success: boolean;
  // other properties...
}
let transactionInProgress = false;
export async function POST(request: NextRequest) {
  try {
    const {userId, sessionId} = await getDataFromToken(request);
    const reqBody = await request.json();
    const {_id, betId, email, withdrawalCode, momoName, momoNumber, network, service} =
      await reqBody;
    transactionInProgress = true;

    // Uncomment below code to fetch user and perform additional checks if required
    const user = await User.findOne({email});
    console.log(user, "API Response:");
    if (!user) {
      transactionInProgress = false;
      return NextResponse.json({error: "User not found"}, {status: 401});
    }

    if (!user.isActivated) {
      transactionInProgress = false;
      if (user) {
        user.isLoggedIn = false;
        user.sessionId = null;
        await user.save();
      }
      const response = NextResponse.json({
        message: "Logout successful",
        success: true,
      });
      response.cookies.set("token", "", {
        httpOnly: true,
        expires: new Date(0),
      });
      return NextResponse.json({error: "User is deactivated"}, {status: 402});
    }

    // Check if sessionId is available
    if (!sessionId) {
      try {
        if (user) {
          user.isLoggedIn = false;
          user.sessionId = null;
          await user.save();
        }
        const response = NextResponse.json({
          message: "Logout successful",
          success: true,
        });
        response.cookies.set("token", "", {
          httpOnly: true,
          expires: new Date(0),
        });
        return NextResponse.json(
          {error: "Your session has expired"},
          {status: 403}
        );
      } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
      }
    }

    console.log("done")

    // Find available admin
    const admin = await AdminUser.findOne({isAdmin: true});
    if (admin.isWithdrawalsOpen === false) {
      transactionInProgress = false;
      return NextResponse.json(
        {error: "currently under maintainance"},
        {status: 504}
      );
    }

    const date = new Date();
    const newUuid = generateUniqueShortUuid(15);
    const fullname = user.fullname;


  

      // INITIATE MOBCASH TRANSACTION
      const response = await withdrawFromAccount(betId, withdrawalCode);

      const updatedResponse = removeMinusFromSumma(response);
    console.log("Response:", updatedResponse.Success);
    
      if (updatedResponse?.Success !== true) {
        const userTransaction = {
          status: "Failed",
          registrationDateTime: date,
          withdrawalCode: withdrawalCode,
          betId: betId,
          amount: 0,
          totalAmount: 0,
          momoNumber: momoNumber,
          fundingType: "withdrawals",
          identifierId: newUuid,
          service: service,
          paymentConfirmation: "Failed",
        };
        admin.transactionHistory.push({
          userid: user._id,
          status: "Failed",
          registrationDateTime: date,
          betId: betId,
          amount: 0,
          totalAmount: 0,
          momoNumber: momoNumber,
          fundingType: "withdrawals",
          identifierId: newUuid,
          userEmail: email,
          subadminEmail: "none",
          service: service,
          paymentConfirmation: "Failed",

        });
        user.transactionHistory.push(userTransaction);
        await user.save();
        await admin.save();
        transactionInProgress = false;
    
           return NextResponse.json(
             {message: "Transaction wasnt fully completed"},
             {status: 500}
           );
      }


      const userTransaction = {
        status: "Pending",
        registrationDateTime: date,
        withdrawalCode: withdrawalCode,
        amount: updatedResponse.Summa,
        totalAmount: updatedResponse.Summa,
        betId: betId,
        momoNumber: momoNumber,
        fundingType: "withdrawals",
        identifierId: newUuid,
        service: service,
        paymentConfirmation: "Successful",
      };

      admin.transactionHistory.push({
        userid: user._id,
        status: "Pending",
        registrationDateTime: date,
        amount: updatedResponse.Summa,
        totalAmount: updatedResponse.Summa,
        betId: betId,
        momoNumber: momoNumber,
        fundingType: "withdrawals",
        identifierId: newUuid,
        userEmail: email,
        subadminEmail: "none",
        service: service,
        paymentConfirmation: "Successful",
      });

      user.transactionHistory.push(userTransaction);
      await user.save();
      await admin.save();
      transactionInProgress = false;
      return NextResponse.json({
        success: true,
        message: "Transaction generated successfully",
        userTransaction,
        user
      });
    
  } catch (error: any) {
    if (error.message === "Token has expired") {
      // Handle token expiry error
      return NextResponse.json(
        {error: "Token has expired. Please log in again."},
        {status: 509}
      );
    } else {
      // Handle other errors
      return NextResponse.json(
        {error: error.message},
        {status: error.status || 500}
      );
    }
  }
}



function generateUniqueShortUuid(length: number): string {
  const timestamp = Date.now().toString(36); // Convert current timestamp to a base-36 string
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomString = "";
  for (let i = 0; i < length - timestamp.length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    randomString += chars[randomIndex];
  }
  return timestamp + randomString;
}

interface ApiResponse {
  Summa: number;
}

function removeMinusFromSumma(apiResponse: ApiResponse): ApiResponse {
  if (apiResponse && typeof apiResponse.Summa === "number") {
    apiResponse.Summa = Math.abs(apiResponse.Summa);
  }
  return apiResponse;
}

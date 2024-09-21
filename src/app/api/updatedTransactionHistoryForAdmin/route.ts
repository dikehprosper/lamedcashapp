import {getDataFromToken} from "@/helpers/getDataFromToken";
import {NextRequest, NextResponse} from "next/server";
import User, {AdminUser, SubAdminUser} from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig";
import PendingTransactionTemplate from "../../[locale]/admin/dashboard/pendingtransaction/pendingTransactionTemplate";

export async function POST(request: NextRequest) {
  try {
    // Connect to the database
    await connect();

    // Get data from the token
    const {userId, sessionId} = await getDataFromToken(request);

    // Check if userId is available
    if (!userId) {
      try {
        const user3 = await AdminUser.findOne({_id: userId}).select(
          "-password"
        );

        if (user3) {
          user3.isLoggedIn = false;
          user3.sessionId = null;
          await user3.save();
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
          {status: 401}
        );
      } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
      }
    }

    // Check if sessionId is available
    if (!sessionId) {
      try {
        const user3 = await AdminUser.findOne({_id: userId}).select(
          "-password"
        );

        if (user3) {
          user3.isLoggedIn = false;
          user3.sessionId = null;
          await user3.save();
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

    // Parse request body
    const reqBody = await request.json();
    const {transactionId, value} = reqBody;

    // Find the admin user
    const initialResult = await AdminUser.findOne({_id: userId});
    if (!initialResult) {
      return NextResponse.json({error: "Admin user not found"}, {status: 404});
    }

    // Find the transaction
    const result = initialResult.transactionHistory.find(
      (transaction: any) => transaction.identifierId === transactionId
    );
   if (!result) {
      return NextResponse.json({error: "Transaction not found"}, {status: 404});
    }

    const userEmail = result.userEmail
    const result2 = await User.findOne({email: userEmail})
     const result3 = result2.transactionHistory
const findTransactionById = (result3: any, transactionId: any) => {
  return result3.find((transaction: { identifierId: any; }) => transaction.identifierId === transactionId);
};
const transaction = findTransactionById(result3, transactionId);

    // Update transaction status
    let finalResult;
    if (value === "accept") {
       finalResult = "Failed"
      if (result.status === 'Pending'){
     result.status = "Successful";
      result.paymentConfirmation = "Successful";
        transaction.status = "Successful";
      transaction.paymentConfirmation = "Successful";
      finalResult = "Successful"
      }
    } else if (value === "reject") {
       finalResult = "Failed"
         if (result.status === 'Pending'){ 
      result.status = "Failed";
      result.paymentConfirmation = "Failed";
         transaction.status = "Failed";
      transaction.paymentConfirmation = "Failed";
        finalResult = "Successful"
         } 
    }
     else if (value === "pend") {
      finalResult = "Failed"
      // result.status = "Pending";
      // result.paymentConfirmation = "Successful";
      //   transaction.status = "Pending";
      // transaction.paymentConfirmation = "Successful";
    }

    // Save the updated admin user
    await initialResult.save(); 

    // Save the updated  user
    await result2.save();

    // // Check session ID and return appropriate response
    if (initialResult.sessionId === sessionId) {
      return NextResponse.json({
        message: "Transaction updated successfully",
        data: finalResult 
      });
    } else {
      return NextResponse.json(
        {error: "Invalid session ID. Please log in again."},
        {status: 401}
      );
    }
  } catch (error: any) {
    if (error.message === "Token has expired") {
      return NextResponse.json(
        {error: "Your session has expired"},
        {status: 403}
      );
    } else {
      return NextResponse.json(
        {error: error.message},
        {status: error.status || 500}
      );
    }
  }
}

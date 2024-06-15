import {getDataFromToken} from "@/helpers/getDataFromToken";
import {NextRequest, NextResponse} from "next/server";
import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
  try {
    // Get user ID and sessionId from the token
    const {userId, sessionId} = await getDataFromToken(request);

    // Connect to the database
    await connect();

    // Find the user and select all fields except password
    const user = await User.findOne({_id: userId}).select("-password");
    if (!user) {
      return NextResponse.json({error: "User not found"}, {status: 404});
    }

    if (!user.isActivated) {
      return NextResponse.json(
        {error: "Your account has been deactivated"},
        {status: 404}
      );
    }

    // Check if the stored sessionId matches the sessionId from the token
    if (user.sessionId !== sessionId) {
      return NextResponse.json(
        {error: "Invalid session ID. Please log in again."},
        {status: 401}
      );
    }

    // Filter the user's transactions from their transactionHistory with fundingType of deposits and withdrawals, limit to the first 100
    const filteredTransactions = user.transactionHistory
      .filter(
        (transaction: {fundingType: string}) =>
          transaction.fundingType === "deposits" ||
          transaction.fundingType === "withdrawals"
      )
      .reverse() // Reverse to get the latest transactions first
      .slice(0, 100);

    // Filter the user's transactions from their transactionHistory with status of pending
    const pendingTransactions = user.transactionHistory.filter(
      (transaction: {status: string}) => transaction.status === "Pending"
    );

    // Update the user's transactionHistory with the filtered transactions
    user.transactionHistory = filteredTransactions;

    // Send back the updated user with the filtered transactionHistory and pending transactions
    return NextResponse.json({
      message: "User found",
      data: {
        user: user,
        pendingTransactions: pendingTransactions,
      },
    });
  } catch (error: any) {
    if (error.message === "Token has expired") {
      // Handle token expiry error
      return NextResponse.json(
        {error: "Token has expired. Please log in again."},
        {status: 402}
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

connect();

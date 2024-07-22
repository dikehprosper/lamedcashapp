import {getDataFromToken} from "@/helpers/getDataFromToken";
import {NextRequest, NextResponse} from "next/server";
import User, {AdminUser} from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig";
connect();
let transactionInProgress = false
export async function GET(request: NextRequest) {
  try {
    // Get user ID and sessionId from the token
    const {userId, sessionId} = await getDataFromToken(request);

    console.log(userId)
     console.log(sessionId)
    transactionInProgress = true
    
    // Uncomment below code to fetch user and perform additional checks if required
      const user = await User.findOne({ _id: userId });
    // Connect to the database
    
console.log(user)
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
         return NextResponse.json(
                   {error: "User is deactivated"},
                   {status: 402}
         );
      }

          // Check if sessionId is available
          if (user.sessionId !== sessionId) {
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


    const user3 = await AdminUser.findOne({isAdmin: true});
    // Filter the user's transactions from their transactionHistory with fundingType of deposits and withdrawals, limit to the first 100
    const filteredTransactions = user.transactionHistory
      .filter(
        (transaction: {fundingType: string}) =>
          transaction.fundingType === "deposits" ||
          transaction.fundingType === "withdrawals"
      )
      .reverse() // Reverse to get the latest transactions first
      .slice(0, 100);

    // // Filter the user's transactions from their transactionHistory with status of pending
    const pendingTransactions = user3.transactionHistory.filter(
      (transaction: {status: string}) => transaction.status === "Pending" && transaction.fundingType === "deposits"
    );

    // // Update the user's transactionHistory with the filtered transactions
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
       console.log("6")
      // Handle token expiry error
      return NextResponse.json(
        {error: "Token has expired. Please log in again."},
        {status: 402}
      );
    } else {
       console.log("7")
      // Handle other errors
      return NextResponse.json(
        {error: error.message},
        {status: error.status || 500}
      );
    }
  }
}

connect();

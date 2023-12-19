import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const newTimestamp = await reqBody;
    // Function to count "Pending" transactions for a subadmin
    const countPendingTransactions = (subadmin: any) => {
      return subadmin.transactionHistory.filter(
        (transaction: any) => transaction.status === "Pending"
      ).length;
    };

    const subadminUsers = await User.find({ isSubAdminDeposits: true });

    // Filter subadmin users who are not out of funds
    const subadminUsersWithFunds = subadminUsers.filter(
      (subadminUser) => !subadminUser.isOutOfFunds
    );

    const sortedSubadmins = subadminUsersWithFunds.sort((a, b) => {
      const countPendingA = countPendingTransactions(a);
      const countPendingB = countPendingTransactions(b);

      // Sort in ascending order based on the count of "pending" transactions
      return countPendingA - countPendingB;
    });

    // Log the sorted subadmins and individual counts
    console.log("Sorted Subadmins:", sortedSubadmins);
    sortedSubadmins.forEach((subadmin) => {
      console.log(
        `${subadmin.fullname}'s Pending Transaction Count:`,
        countPendingTransactions(subadmin)
      );
    });

    const subadminWithLowestPendingCount = sortedSubadmins[0];

    const response = NextResponse.json({
      message: "successful",
      success: true,
      subadminWithLowestPendingCount,
    });
 

    // Return the response or use it as needed
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

connect();

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
  try {
    let subadminWithLowestPendingWithdrawalCount;

    // Fetch all subadmin users who handle withdrawals
    const subadminUsers = await User.find({ isSubAdminWithdrawals: true });

    // Filter subadmin users who are not out of funds
    const subadminUsersWithFunds = subadminUsers.filter(
      (subadminUser) => !subadminUser.outOfFunds
    );

    // If there are no subadmin users with funds, handle the case accordingly
    if (subadminUsersWithFunds.length === 0) {
      console.log("No subadmin users with available funds for withdrawals.");
      // Handle the case when there are no subadmin users with available funds for withdrawals
    } else {
      // Sort subadmin users with funds based on the pending withdrawal count in ascending order
      const sortedSubadmins = subadminUsersWithFunds.sort(
        (a, b) =>
          (a.transactionHistory.filter(
            (transaction: { status: string; fundingType: string }) =>
              transaction.status === "pending" &&
              transaction.fundingType === "withdrawals"
          ).length || 0) -
          (b.transactionHistory.filter(
            (transaction: { status: string; fundingType: string }) =>
              transaction.status === "pending" &&
              transaction.fundingType === "withdrawals"
          ).length || 0)
      );

      // Get the subadmin with the lowest pending withdrawal count
      const subadminWithLowestPendingWithdrawalCount = sortedSubadmins[0];

      // If there are multiple subadmins with the same lowest pending withdrawal count, pick one randomly
      const randomSubadmin =
        sortedSubadmins[Math.floor(Math.random() * sortedSubadmins.length)];

      // Retrieve the cash desk address of the selected subadmin

      const sanitizedRandomSubadmin = {
        ...randomSubadmin._doc,
        password: undefined,
      };
      const sanitizedSubadminWithLowestPendingWithdrawalCount = {
        ...subadminWithLowestPendingWithdrawalCount._doc,
        password: undefined,
      };

        const selectedSubadmin =
          sanitizedRandomSubadmin ||
          sanitizedSubadminWithLowestPendingWithdrawalCount;

   console.log(selectedSubadmin)
      // If you need to return the address as part of a response, you can do something like this:
      const response = NextResponse.json({
        message: "successful",
        success: true,
        selectedSubadmin,
      });

      // Return the response or use it as needed
      return response;
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

connect();

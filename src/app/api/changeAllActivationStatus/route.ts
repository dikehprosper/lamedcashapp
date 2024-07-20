// Import necessary modules
import { NextRequest, NextResponse } from "next/server";
import { FedaPay, Transaction, Customer } from "fedapay";
import { v4 as uuidv4 } from "uuid";
import User, {SubAdminUser} from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig";
import {getDataFromToken} from "@/helpers/getDataFromToken";
// Establish a database connection
connect();

export async function POST(request: NextRequest) {
  try {
    const {userId, sessionId} = await getDataFromToken(request);
    // Parse the incoming JSON request body
    const reqBody = await request.json();

    // Extract the 'value' from the request body
    const {value} = reqBody;

    // Check if the value is "activateAllCashdeskDeposit"
    if (value === "deactivateAllCashdeskDeposit") {
      try {
        // Fetch users with isSubAdminDeposits set to true
        const users = await SubAdminUser.find({isSubAdminDeposits: true});
        // Update the current property of each user to false
        const updatedUsers = users.map(async (user) => {
          user.current = false;
          user.currentCount = 0;
          user.isActivated = false;
          user.isOutOfFunds = true;
          // Save the updated user back to the database
          await user.save();
          return user;
        });

        // Wait for all updates to complete
        await Promise.all(updatedUsers);

        console.log("All users' current property set to false successfully.");
      } catch (error) {
        console.error("Error updating users:", error);
        return NextResponse.json(
          {error: "Error updating users"},
          {status: 500}
        );
      }
    }

    if (value === "deactivateAllCashDeskWithdrawal") {
      try {
        // Fetch users with isSubAdminWithdrawals set to true
        const users = await SubAdminUser.find({isSubAdminWithdrawals: true});
        // Update the current property of each user to false
        const updatedUsers = users.map(async (user) => {
          user.current = false;
          user.currentCount = 0;
          user.isActivated = false;
          user.isOutOfFunds = true;
          // Save the updated user back to the database
          await user.save();
          return user;
        });

        // Wait for all updates to complete
        await Promise.all(updatedUsers);

        console.log("All users' current property set to false successfully.");
      } catch (error) {
        console.error("Error updating users:", error);
        return NextResponse.json(
          {error: "Error updating users"},
          {status: 500}
        );
      }
    }

    if (value === "activateAllCashdeskDeposit") {
      try {
        // Fetch users with isSubAdminDeposits set to true
        const users = await SubAdminUser.find({isSubAdminDeposits: true});
        console.log(users, "users");
        // Update the current property of each user to false
        const updatedUsers = users.map(async (user) => {
          user.isActivated = true;
          // Save the updated user back to the database
          await user.save();
          return user;
        });

        // Wait for all updates to complete
        await Promise.all(updatedUsers);
      } catch (error) {
        console.error("Error updating users:", error);
        return NextResponse.json(
          {error: "Error updating users"},
          {status: 500}
        );
      }
    }

    if (value === "activateAllCashDeskWithdrawal") {
      try {
        // Fetch users with isSubAdminDeposits set to true
        const users = await SubAdminUser.find({isSubAdminWithdrawals: true});
        // Update the current property of each user to false
        const updatedUsers = users.map(async (user) => {
          user.isActivated = true;
          // Save the updated user back to the database
          await user.save();
          return user;
        });

        // Wait for all updates to complete
        await Promise.all(updatedUsers);
      } catch (error) {
        console.error("Error updating users:", error);
        return NextResponse.json(
          {error: "Error updating users"},
          {status: 500}
        );
      }
    }

    // Return a JSON response with a success message and 200 status code
    return NextResponse.json({
      message: "User activation status toggled successfully",
      status: 200,
    });
  } catch (error: any) {
    // Handle errors and return a JSON response with an error message and 500 status code
    console.error(error, "error");
    return NextResponse.json(
      {error: error.message || "Internal Server Error"},
      {status: 500}
    );
  }
}

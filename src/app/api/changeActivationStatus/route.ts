// Import necessary modules
import { NextRequest, NextResponse } from "next/server";
import { FedaPay, Transaction, Customer } from "fedapay";
import { v4 as uuidv4 } from "uuid";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

// Establish a database connection
connect();

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming JSON request body
    const reqBody = await request.json();

    // Extract the 'id' from the request body
    const { id } = reqBody;

    // Find the user with the specified id in the MongoDB database
    const user = await User.findOne({ _id: id });

    // Check if the user exists
    if (!user) {
      // If the user does not exist, return a JSON response with an error message and 402 status code
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 402 }
      );
    }

    if (
      (user.isSubAdminWithdrawals && user.isActivated) ||
      (user.isSubAdminDeposits && user.isActivated)
    ) {

             
    if (user.isOutOfFunds === false) {
      if (user.isSubAdminWithdrawals && user.current) {
        // Find all sub-admins for deposits who are not out of funds
        const adminArray = await User.find({
          isSubAdminWithdrawals: true,
          isOutOfFunds: false,
        }).select("-password");
        if (adminArray.length === 1) {
          const admins = await User.find({ isAdmin: true }).select("-password");

          const resetSubadminPromises = admins.map(async (admin) => {
            admin.current = false;
            admin.currentCount = 0;
            await admin.save();
          });
          // Wait for all sub-admins to be saved
          await Promise.all(resetSubadminPromises);
        }
        // Find all sub-admins for deposits
        const adminArray2 = await User.find({
          isSubAdminWithdrawals: true,
        }).select("-password");

        // Find the index of the current sub-admin in the array
        const currentIndex = adminArray.findIndex((admin) =>
          admin._id.equals(user._id)
        );

        // Reset the current status and count for the current sub-admin
        user.current = false;
        user.currentCount = 0;
        await user.save();
        // Calculate the index of the next available sub-admin
        let nextCurrentSubadminIndex = (currentIndex + 1) % adminArray.length;

        // Get the next available sub-admin
        let nextSubadmin =
          adminArray[nextCurrentSubadminIndex] || adminArray2[0];

        // Set the next available sub-admin as current
        nextSubadmin.current = true;

        // Save the changes for the next sub-admin
        await nextSubadmin.save();
      }

      if (user.isSubAdminWithdrawals) {
        const adminArray = await User.find({
          isSubAdminWithdrawals: true,
          isOutOfFunds: false,
        }).select("-password");
        if (adminArray.length === 1) {
          const admins = await User.find({ isAdmin: true }).select("-password");

          const resetSubadminPromises = admins.map(async (admin) => {
            admin.current = false;
            admin.currentCount = 0;
            await admin.save();
          });
          // Wait for all sub-admins to be saved
          await Promise.all(resetSubadminPromises);
        }
      }

      if (user.isSubAdminDeposits && user.current) {
        // Check if the user is a sub-admin for deposits and has current set to true

        // Find all sub-admins for deposits who are not out of funds
        const adminArray = await User.find({
          isSubAdminDeposits: true,
          isOutOfFunds: false,
        }).select("-password");
        if (adminArray.length === 1) {
          const admins = await User.find({ isAdmin: true }).select("-password");

          const resetSubadminPromises = admins.map(async (admin) => {
            admin.current = false;
            admin.currentCount = 0;
            await admin.save();
          });
          // Wait for all sub-admins to be saved
          await Promise.all(resetSubadminPromises);
        }
        // Find all sub-admins for deposits
        const adminArray2 = await User.find({
          isSubAdminDeposits: true,
        }).select("-password");

        // Find the index of the current sub-admin in the array
        const currentIndex = adminArray.findIndex((admin) =>
          admin._id.equals(user._id)
        );

        // Reset the current status and count for the current sub-admin
        user.current = false;
        user.currentCount = 0;
        await user.save();
        // Calculate the index of the next available sub-admin
        let nextCurrentSubadminIndex = (currentIndex + 1) % adminArray.length;

        // Get the next available sub-admin
        let nextSubadmin =
          adminArray[nextCurrentSubadminIndex] || adminArray2[0];

        // Set the next available sub-admin as current
        nextSubadmin.current = true;

        // Save the changes for the next sub-admin
        await nextSubadmin.save();
      }

      if (user.isSubAdminDeposits) {
        const adminArray = await User.find({
          isSubAdminDeposits: true,
          isOutOfFunds: false,
        }).select("-password");
        if (adminArray.length === 1) {
          const admins = await User.find({ isAdmin: true }).select("-password");

          const resetSubadminPromises = admins.map(async (admin) => {
            admin.current = false;
            admin.currentCount = 0;
            await admin.save();
          });
          // Wait for all sub-admins to be saved
          await Promise.all(resetSubadminPromises);
        }
      }
    }

    user.isOutOfFunds =  true;
    // Save the changes to the user document
    await user.save();
    }




    user.isActivated = !user.isActivated;
    await user.save();
const updatedUser = {
  name: user.fullname, // Assuming 'fullname' is the correct property
  isActivated: user.isActivated,
};

    // Return a JSON response with a success message and 200 status code
    return NextResponse.json({
      message: "User activation status toggled successfully",
      status: 200,
      updatedUser
    });
  } catch (error: any) {
    // Handle errors and return a JSON response with an error message and 500 status code
    console.error(error, "error");
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

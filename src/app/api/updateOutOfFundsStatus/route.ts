import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
  try {
    const { userId, sessionId } = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
 
    if (user.isOutOfFunds === false) {
      if (user.isSubAdminWithdrawals && user.current) {
  // Check if the user is a sub-admin for withdrawals and has current set to true

      // Find all sub-admins for withdrawals who are not out of funds
      const adminArray = await User.find({
        isSubAdminWithdrawals: true,
        isOutOfFunds: false,
      }).select("-password");

      // Find all sub-admins for withdrawals
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
      let nextSubadmin = adminArray[nextCurrentSubadminIndex] || adminArray2[0];

      // Set the next available sub-admin as current
      nextSubadmin.current = true;

      // Save the changes for the next sub-admin
      await nextSubadmin.save();
      }


    if (user.isSubAdminDeposits && user.current) {
      // Check if the user is a sub-admin for deposits and has current set to true

      // Find all sub-admins for deposits who are not out of funds
      const adminArray = await User.find({
        isSubAdminDeposits: true,
        isOutOfFunds: false,
      }).select("-password");

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
      let nextSubadmin = adminArray[nextCurrentSubadminIndex] || adminArray2[0];

      // Set the next available sub-admin as current
      nextSubadmin.current = true;

      // Save the changes for the next sub-admin
      await nextSubadmin.save();
      
    }

    
    }

    if (user.isOutOfFunds === true) {
  

            if (user.isSubAdminWithdrawals) {
              // Find the index of the current admin in the array
              const adminArray = await User.find({
                isSubAdminWithdrawals: true,
              }).select("-password");

              const anyAdminWithFunds = adminArray.some(
                (admin) => !admin.isOutOfFunds
              );

              if (!anyAdminWithFunds) {
                adminArray.forEach((admin) => {
                  admin.current = false;
                  admin.currentCount = 0;
                  admin.save();
                });

                user.current = true;
                user.currentCount = 0;
                await user.save();
              }
            }

        if (user.isSubAdminDeposits) {
        // Find the index of the current admin in the array
        const adminArray = await User.find({
          isSubAdminDeposits: true,
        }).select("-password");

        const anyAdminWithFunds = adminArray.some(
          (admin) => !admin.isOutOfFunds
        );

        if (!anyAdminWithFunds) {
          adminArray.forEach((admin) => {
            admin.current = false;
            admin.currentCount = 0;
            admin.save();
          });

          user.current = true;
          user.currentCount = 0;
          await user.save();
        }
      }

  
    }

    // Update isOutOfFunds status for the user
    user.isOutOfFunds = !user.isOutOfFunds;
    await user.save();

    const status = user.isOutOfFunds;
    const response = NextResponse.json({
      message: "Updated successfully",
      success: true,
      status,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

connect();

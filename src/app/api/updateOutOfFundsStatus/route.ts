import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
  try {
    const { userId, sessionId } = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");

     if (!user.isActivated) {
       return NextResponse.json(
         { error: "your account has been deactivated" },
         { status: 404 }
       );
     }
     
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
      let nextSubadmin = adminArray[nextCurrentSubadminIndex] || adminArray2[0];

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

    if (user.isOutOfFunds === true) {
      if (user.isSubAdminWithdrawals) {
        // Find the index of the current admin in the array
        const admins = await User.find({ isAdmin: true }).select("-password");
        for (const admin of admins) {
          if (!admin.isWithdrawalsOpen) {
            return NextResponse.json({
              error: "Sorry, restricted by admin",
              status: 401,
            });
          }
          const subAdmins = await User.find({
            _id: {$ne: userId}, // Exclude the current user by ID
            isSubAdminWithdrawals: true,
          }).select("-password");

          const subAdminsWithFunds = subAdmins.filter(
            (subAdmin) => !subAdmin.isOutOfFunds
          );

          if (subAdminsWithFunds.length < 1) {
            // Reset all sub-admins' current status and counts
            const resetSubadminPromises = subAdmins.map(async (subAdmin) => {
              subAdmin.current = false;
              subAdmin.currentCount = 0;
              await subAdmin.save();
            });
            // Wait for all sub-admins to be saved
            await Promise.all(resetSubadminPromises);
            // Set the user as the current user
            user.current = true;
            user.currentCount = 0;
            await user.save();
          }
        }
      }
      if (user.isSubAdminDeposits) {
        // Find the index of the current admin in the array
        const admins = await User.find({ isAdmin: true }).select("-password");
        for (const admin of admins) {
          if (!admin.isDepositsOpen) {
            return NextResponse.json({
              error: "Sorry, restricted by admin",
              status: 401,
            });
          }
          const subAdmins = await User.find({
            _id: { $ne: userId }, // Exclude the current user by ID
            isSubAdminDeposits: true,
          }).select("-password");

          const subAdminsWithFunds = subAdmins.filter(
            (subAdmin) => !subAdmin.isOutOfFunds
          );

          if (subAdminsWithFunds.length < 1) {
            // Reset all sub-admins' current status and counts
            const resetSubadminPromises = subAdmins.map(async (subAdmin) => {
              subAdmin.current = false;
              subAdmin.currentCount = 0;
              await subAdmin.save();
            });
            // Wait for all sub-admins to be saved
            await Promise.all(resetSubadminPromises);
            // Set the user as the current user
            user.current = true;
            user.currentCount = 0;
            await user.save();
          }
        }
      }
    }

    user.isOutOfFunds = !user.isOutOfFunds;

    // Save the changes to the user document
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

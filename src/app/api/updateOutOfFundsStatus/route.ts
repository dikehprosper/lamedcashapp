// import { NextRequest, NextResponse } from "next/server";
// import { getDataFromToken } from "@/helpers/getDataFromToken";
// import User from "@/models/userModel";
// import { connect } from "@/dbConfig/dbConfig";
// export async function GET(request: NextRequest) {
//  try {
//    const { userId, sessionId } = await getDataFromToken(request);
//     const user = await User.findOne({ _id: userId }).select("-password");
//     user.isOutOfFunds = !user.isOutOfFunds;

//     await user.save();
//     const status = user.isOutOfFunds
//     const response = NextResponse.json({
//       message: "updated successful",
//       success: true,
//    status
//     });
//     return response;
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
// connect();

import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
  try {
    const { userId, sessionId } = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
console.log(user.isOutOfFunds)
    if (user.isOutOfFunds) {
      // if (user.current && user.isSubAdminWithdrawals) {
      //   // Check if the admin has current set to true
      //   // Find the index of the current admin in the array
      //   const adminArray = await User.find({
      //     isSubAdminWithdrawals: true,
      //   }).select("-password");
      //   const currentIndex = adminArray.findIndex((admin) =>
      //     admin._id.equals(user._id)
      //   );

      //   // Reset current for the current admin
      //   user.current = false;

      //   let nextCurrentSubadminIndex = (currentIndex + 1) % adminArray.length;

      //   let nextSubadmin = adminArray[nextCurrentSubadminIndex]
      //     ? adminArray[nextCurrentSubadminIndex]
      //     : adminArray[0];

      //   // Set the next available admin as current
      //   adminArray[nextSubadmin].current = true;
      //   await adminArray[nextSubadmin].save();
      // }

      if (user.current && user.isSubAdminDeposits) {
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

    // if (user.isOutOfFunds) {
    //   // if (user.isSubAdminWithdrawals) {
    //   //   // Check if the admin has current set to true
    //   //   // Find the index of the current admin in the array
    //   //   const adminArray = await User.find({
    //   //     isSubAdminWithdrawals: true,
    //   //   }).select("-password");
    //   //   const anyAdminWithFunds = adminArray.find(
    //   //     (admin) => !admin.isOutOfFunds
    //   //   );

    //   //   if (!anyAdminWithFunds) {
    //   //     adminArray.forEach((admin) => {
    //   //       admin.current = false;
    //   //       admin.currentCount = 0;
    //   //       admin.save();
    //   //     });

    //   //     user.current = true;
    //   //     user.currentCount = 0;
    //   //     await user.save();
    //   //   }
    //   // }

    //       if (user.isSubAdminDeposits) {
    //         // Check if the admin has current set to true
    //         // Find the index of the current admin in the array
    //         const adminArray = await User.find({
    //           isSubAdminDeposits: true,
    //         }).select("-password");

    //          const currentIndex = adminArray.findIndex((admin) =>
    //       admin._id.equals(user._id)
    //     );
    //     user.current = false;

    //     let nextCurrentSubadminIndex = (currentIndex + 1) % adminArray.length;

    //     let nextSubadmin = adminArray[nextCurrentSubadminIndex]
    //       ? adminArray[nextCurrentSubadminIndex]
    //       : adminArray[0];

    //     // Set the next available admin as current
    //     adminArray[nextSubadmin].current = true;
    //     // await adminArray[nextSubadmin].save();

    //       }
    // }

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

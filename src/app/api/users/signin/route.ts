import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// import { sendEmail } from "@/helpers/mailer";
import isOnline from "is-online";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { email, password } = await reqBody;

    // check if the device online
     const online = await isOnline();
    if (!online) {
      return NextResponse.json(
        { error: "No internet connection" },
        { status: 501 } 
      );
    }

    //Check if the User already exist
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 400 }
      );
    }

    //check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 402 });
    }


    //create token data
    const tokenData = {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      isAdmin: user.isAdmin,
       isSubAdmin: user.isSubAdmin,
    };

    // create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "signup Successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Declare user2 outside of the if block

// if (referralId) {
//   let user2;
//   user2 = await User.findOne({ _id: referralId });
//   if (user2) {
//     // User with the specified _id found
//     user2.referrals.push({
//       referredEmail: savedUser.email,
//       referredName: savedUser.fullname,
//       registrationDateTime: new Date(),
//     });

//     await user2.save();
//     console.log(user2.referrals);
//     // You can return user2 here or perform further actions
//   } else {
//     // User with the specified _id not found
//     console.log("User not found");
//   }
// }

// Modify the referral information

// send Welcome email

// await sendEmail({
//   email,
//   emailType: "WELCOME",
//   userId: savedUser._id,
//   fullname,
// });

// send verification email

// await sendEmail({
//   email,
//   emailType: "VERIFY",
//   userId: savedUser._id,
//   fullname,
// });




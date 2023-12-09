import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { fullname, betId, number, email, password } = await reqBody;

    //Check if the User already exist
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    // CREATE USER FOR CASHDESK DEPOSITS
    // CREATE USER FOR CASHDESK DEPOSITS
    // CREATE USER FOR CASHDESK DEPOSITS
    if (
      email === "cashdesk1@betfundr.com" ||
      email === "cashdesk2@betfundr.com" ||
      email === "cashdesk3@betfundr.com" ||
      email === "cashdesk4@betfundr.com"
    ) {
      //hash password
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      // GIVING DEPOSIT CASHDESK DIAL CODE
      // const cashdesk =
      //   email === "cashdesk1@espece.com"
      //     ? "100000"
      //     : "cashdesk2@espece.com"
      //     ? "200000"
      //     : "cashdesk3@espece.com"
      //     ? "300000"
      //     : "cashdesk4@espece.com"
      //     ? "400000"
      //     : "cashdesk5@espece.com"
      //     ? "500000"
      //     : "cashdesk6@espece.com"
      //     ? "600000"
      //     : "";
      //create a new user
      const newUser = new User({
        fullname,
        betId,
        number,
        email,
        password: hashedPassword,
        isSubAdminDeposits: true,
        // cashdeskDialcode: cashdesk,
        isLoggedIn: true,
      });

      const savedUser = await newUser.save();

      //create token data
      const tokenData = {
        _id: savedUser._id,
        fullname: savedUser.fullname,
        email: savedUser.email,
        isUser: savedUser.isUser,
        isAdmin: savedUser.isAdmin,
        isSubAdminDeposits: savedUser.isSubAdminDeposits,
        isSubAdminWithdrawals: savedUser.isSubAdminWithdrawals,
      };

      // create token
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
        expiresIn: "1d",
      });

      const response = NextResponse.json({
        message: "signup Successful",
        success: true,
        savedUser,
      });

      response.cookies.set("token", token, {
        httpOnly: true,
      });

      return response;
    }
    // CREATE USER FOR CASHDESK WITHDRAWAL
    // CREATE USER FOR CASHDESK WITHDRAWAL
    // CREATE USER FOR CASHDESK WITHDRAWAL
    if (email === "cashdesk6@betfundr.com" || email === "cashdesk7@betfundr.com") {
      //hash password
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      // GIVING WITHDRAW CASHDESK DIAL CODE
      const cashdesk =
        email === "cashdesk6@betfundr.com"
          ? {
              city: "Porto-Novo (Benin)",
              street: "RechargeB Cashier 1",
            }
          : email === "cashdesk7@betfundr.com"
          ? {
              city: "YourCity2",
              street: "YourStreet2",
            }
          : email === "cashdesk8@betfundr.com"
          ? {
              city: "YourCity3",
              street: "YourStreet3",
            }
          : null; // Handle the case when the email doesn't match any condition

      // You can use the 'cashdesk' value as needed in your code.

      //create a new user
      const newUser = new User({
        fullname,
        betId,
        number,
        email,
        password: hashedPassword,
        isSubAdminWithdrawals: true,
        isLoggedIn: true,
        cashdeskAddress: cashdesk,
      });

      const savedUser = await newUser.save();

      //create token data
      const tokenData = {
        _id: savedUser._id,
        fullname: savedUser.fullname,
        email: savedUser.email,
        isUser: savedUser.isUser,
        isAdmin: savedUser.isAdmin,
        isSubAdminDeposits: savedUser.isSubAdminDeposits,
        isSubAdminWithdrawals: savedUser.isSubAdminWithdrawals,
      };

      // create token
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
        expiresIn: "1d",
      });

      const response = NextResponse.json({
        message: "signup Successful",
        success: true,
        savedUser,
      });

      response.cookies.set("token", token, {
        httpOnly: true,
      });

      return response;
    }

    // CREATE USER FOR CASHDESK ADMIN
    if (email === "admin@espece.com") {
      //hash password
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      //create a new user
      const newUser = new User({
        fullname,
        betId,
        number,
        email,
        password: hashedPassword,
        isAdmin: true,
        isLoggedIn: true,
      });

      const savedUser = await newUser.save();

      //create token data
      const tokenData = {
        _id: savedUser._id,
        fullname: savedUser.fullname,
        email: savedUser.email,
        isUser: savedUser.isUser,
        isAdmin: savedUser.isAdmin,
        isSubAdminDeposits: savedUser.isSubAdminDeposits,
        isSubAdminWithdrawals: savedUser.isSubAdminWithdrawals,
      };

      // create token
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
        expiresIn: "1d",
      });

      const response = NextResponse.json({
        message: "signup Successful",
        success: true,
        savedUser,
      });

      response.cookies.set("token", token, {
        httpOnly: true,
      });

      return response;
    }

    // CREATE NORMAL USER
    // CREATE NORMAL USER
    // CREATE NORMAL USER

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //create a new user
    const newUser = new User({
      fullname,
      betId,
      number,
      email,
      password: hashedPassword,
      supplementaryBetId: [betId],
      isUser: true,
      isLoggedIn: true,
    });
    // save the new created user
    const savedUser = await newUser.save();

    //create token data
    const tokenData = {
      _id: savedUser._id,
      fullname: savedUser.fullname,
      email: savedUser.email,
      isAdmin: savedUser.isAdmin,
      isUser: savedUser.isUser,
      isSubAdminDeposits: savedUser.isSubAdminDeposits,
      isSubAdminWithdrawals: savedUser.isSubAdminWithdrawals,
    };

    // create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "signup Successful",
      success: true,
      savedUser,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });
    // console.log("token set")
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

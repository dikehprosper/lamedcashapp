/* eslint-disable */
// @ts-nocheck
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {SubAdminUser, AdminUser} from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
// import { sendEmail } from "@/helpers/mailer";
import { FedaPay, Customer } from "fedapay";

connect();

// /* Remplacez VOTRE_CLE_API par votre véritable clé API */
// FedaPay.setApiKey(process.env.FEDAPAY_KEY1!);

// /* Précisez si vous souhaitez exécuter votre requête en mode test ou live */
// FedaPay.setEnvironment(process.env.ENVIRONMENT1!); //ou setEnvironment('live');

// import { PhoneNumberUtil } from "google-libphonenumber";

export async function POST(request: NextRequest) {
  try {
    //  const { phoneNumber, countryCode } = req.body;
    const reqBody = await request.json();
    const {fullname, betId, number, email, password, referrerId} =
      await reqBody;
    //Check if the User already exist
    const user = await User.findOne({email});

    if (user) {
      return NextResponse.json({error: "User already exists"}, {status: 400});
    }
    // CREATE USER FOR CASHDESK DEPOSITS
    // CREATE USER FOR CASHDESK DEPOSITS
    // CREATE USER FOR CASHDESK DEPOSITS

    if (
      (email === process.env.D_EMAIL && password === process.env.D_PASSWORD) ||
      (email === process.env.D_EMAIL1 &&
        password === process.env.D_PASSWORD1) ||
      (email === process.env.D_EMAIL2 &&
        password === process.env.D_PASSWORD2) ||
      (email === process.env.D_EMAIL3 &&
        password === process.env.D_PASSWORD3) ||
      (email === process.env.D_EMAIL4 &&
        password === process.env.D_PASSWORD4) ||
      (email === process.env.D_EMAIL5 &&
        password === process.env.D_PASSWORD5) ||
      (email === process.env.D_EMAIL6 &&
        password === process.env.D_PASSWORD6) ||
      (email === process.env.D_EMAIL7 &&
        password === process.env.D_PASSWORD7) ||
      (email === process.env.D_EMAIL8 &&
        password === process.env.D_PASSWORD8) ||
      (email === process.env.D_EMAIL9 &&
        password === process.env.D_PASSWORD9) ||
      (email === process.env.D_EMAIL10 && password === process.env.D_PASSWORD10)
    ) {
      //hash password
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      const subAdminUser = await SubAdminUser.find({isSubAdminDeposits: true});
      let newUser;
      if (subAdminUser.length < 1) {
        //create a new cashdesk deposit user
        newUser = new SubAdminUser({
          fullname,
          betId,
          number,
          email,
          password: hashedPassword,
          isSubAdminDeposits: true,
          isLoggedIn: true,
          sessionId: generateUniqueSessionId(),
          current: true,
        });
      }

      if (subAdminUser.length >= 1) {
        //create a new user
        newUser = new SubAdminUser({
          fullname,
          betId,
          number,
          email,
          password: hashedPassword,
          isSubAdminDeposits: true,
          isLoggedIn: true,
          sessionId: generateUniqueSessionId(),
        });
      }

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
        sessionId: savedUser.sessionId,
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
    if (
      (email === process.env.W_EMAIL && password === process.env.W_PASSWORD) ||
      (email === process.env.W_EMAIL1 &&
        password === process.env.W_PASSWORD1) ||
      (email === process.env.W_EMAIL2 &&
        password === process.env.W_PASSWORD2) ||
      (email === process.env.W_EMAIL3 &&
        password === process.env.W_PASSWORD3) ||
      (email === process.env.W_EMAIL4 &&
        password === process.env.W_PASSWORD4) ||
      (email === process.env.W_EMAIL5 &&
        password === process.env.W_PASSWORD5) ||
      (email === process.env.W_EMAIL6 &&
        password === process.env.W_PASSWORD6) ||
      (email === process.env.W_EMAIL7 &&
        password === process.env.W_PASSWORD7) ||
      (email === process.env.W_EMAIL8 &&
        password === process.env.W_PASSWORD8) ||
      (email === process.env.W_EMAIL9 &&
        password === process.env.W_PASSWORD9) ||
      (email === process.env.W_EMAIL10 && password === process.env.W_PASSWORD10)
    ) {
      //hash password
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      // GIVING WITHDRAW CASHDESK DIAL CODE
      const cashdesk =
        email === "cashdeskWithdrawals@betfundr.com"
          ? {
              city: "city 1",
              street: "Address 1",
            }
          : email === "cashdeskWithdrawals1@betfundr.com"
          ? {
              city: "city 1",
              street: "Address 1",
            }
          : email === "cashdeskWithdrawals2@betfundr.com"
          ? {
              city: "city 2",
              street: "Address 2",
            }
          : email === "cashdeskWithdrawals3@betfundr.com"
          ? {
              city: "city 3",
              street: "Address 3",
            }
          : email === "cashdeskWithdrawals4@betfundr.com"
          ? {
              city: "city 4",
              street: "Address 4",
            }
          : email === "cashdeskWithdrawals5@betfundr.com"
          ? {
              city: "city 5",
              street: "Address 5",
            }
          : email === "cashdeskWithdrawals6@betfundr.com"
          ? {
              city: "city 6",
              street: "Address 6",
            }
          : email === "cashdeskWithdrawals7@betfundr.com"
          ? {
              city: "city 7",
              street: "Address 7",
            }
          : email === "cashdeskWithdrawals8@betfundr.com"
          ? {
              city: "city 8",
              street: "Address 8",
            }
          : email === "cashdeskWithdrawals9@betfundr.com"
          ? {
              city: "city 9",
              street: "Address 9",
            }
          : email === "cashdeskWithdrawals10@betfundr.com"
          ? {
              city: "city 10",
              street: "Address 10",
            }
          : null; // Handle the case when the email doesn't match any condition

      // You can use the 'cashdesk' value as needed in your code.

      const subAdminUser = await SubAdminUser.find({
        isSubAdminWithdrawals: true,
      });

      let newUser;
      if (subAdminUser.length < 1) {
        //create a new user
        newUser = new SubAdminUser({
          fullname,
          betId,
          number,
          email,
          password: hashedPassword,
          isSubAdminWithdrawals: true,
          isLoggedIn: true,
          cashdeskAddress: cashdesk,
          sessionId: generateUniqueSessionId(),
          current: true,
        });
      }

      if (subAdminUser.length >= 1) {
        //create a new user
        newUser = new SubAdminUser({
          fullname,
          betId,
          number,
          email,
          password: hashedPassword,
          isSubAdminWithdrawals: true,
          isLoggedIn: true,
          cashdeskAddress: cashdesk,
          sessionId: generateUniqueSessionId(),
        });
      }

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
        sessionId: savedUser.sessionId,
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
    if (
      (email === process.env.A_EMAIL && password === process.env.A_PASSWORD) ||
      (email === process.env.A_EMAIL1 && password === process.env.A_PASSWORD1)
    ) {
      //hash password
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      //create a new user
      const newUser = new AdminUser({
        fullname,
        betId,
        number,
        email,
        password: hashedPassword,
        isAdmin: true,
        isLoggedIn: true,
        sessionId: generateUniqueSessionId(),
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
        sessionId: savedUser.sessionId,
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
    const date = new Date();

  

    // //  CREATE FEDAPAY   /* Créer le client */
    // let customer;
    // try {
    //   // Create Fedapay customer
    //   customer = await Customer.create({
    //     firstname: fullname.split(" ")[0],
    //     lastname: fullname.split(" ")[1],
    //     email: email,
    //     phone_number: {
    //       number: `+229${number}`,
    //       country: "BJ",
    //     },
    //   });
    //   console.log(customer, "customer");
    // } catch (customerError) {
    //   // Handle Fedapay customer creation error
    //   console.error("Error creating Fedapay customer:", customerError);
    //   transactionInProgress = false;
    //   return res.status(501).send({
    //     success: 501,
    //     message: "Failed to create Fedapay customer",
    //     status: 501,
    //   });
    // }

    //create a new user

    const count = await User.countDocuments();
    const parts = fullname.split(" ");
    let firstName = parts[0];
    const name = firstName.replace(/\d/g, "");

    const tag = `betfundr-${name}${count + 1}`;

    const newUser = new User({
      fullname,
      betId,
      number: number,
      email,
      password: hashedPassword,
      supplementaryBetId: [betId],
      isUser: true,
      isLoggedIn: true,
      sessionId: generateUniqueSessionId(),
      // fedapayId: customer.id,
      registrationDateTime: date,
      colorScheme: 2,
      image: "",
      tag: tag,
    });

    // save the new created user
    const savedUser = await newUser.save();

    //Check if the User already exist

    if (referrerId) {
      const user2 = await User.findOne({_id: referrerId});
      user2.referrals.push(email);
      await user2.save();
    }

    //create token data
    const tokenData = {
      _id: savedUser._id,
      fullname: savedUser.fullname,
      email: savedUser.email,
      isAdmin: savedUser.isAdmin,
      isUser: savedUser.isUser,
      isSubAdminDeposits: savedUser.isSubAdminDeposits,
      isSubAdminWithdrawals: savedUser.isSubAdminWithdrawals,
      sessionId: savedUser.sessionId,
    };

    // create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d", // "1m" stands for 1 minute
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

// Function to generate a unique session ID using the 'uuid' library
function generateUniqueSessionId() {
  return uuidv4();
}

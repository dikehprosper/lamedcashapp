// Import necessary modules
import { NextRequest, NextResponse } from "next/server";
import { FedaPay, Transaction, Customer } from "fedapay";
import { v4 as uuidv4 } from "uuid";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import {SubAdminUser, AdminUser} from "@/models/userModel";
import {getDataFromToken} from "@/helpers/getDataFromToken";
import {rechargeAccount} from "@/components/mobcash";
import type {NextApiRequest, NextApiResponse} from "next";
import fetch from "node-fetch";

connect();
let transactionInProgress = false;
export async function POST(request: NextRequest) {
  try {
    const {userId, sessionId} = await getDataFromToken(request);
    const reqBody = await request.json();
    const {
      _id,
      betId,
      email,
      amount,
      momoName,
      momoNumber,
      network,
      service,
    } = await reqBody;
    transactionInProgress = true
    
      // Uncomment below code to fetch user and perform additional checks if required
      const user = await User.findOne({ email });
        console.log(user, "API Response:");
      if (!user) {
        transactionInProgress = false;
         return NextResponse.json({error: "User not found"}, {status: 401});
      }

      if (!user.isActivated) {
        transactionInProgress = false;
         if (user) {
           user.isLoggedIn = false;
           user.sessionId = null;
           await user.save();
         }
         const response = NextResponse.json({
           message: "Logout successful",
           success: true,
         });
         response.cookies.set("token", "", {
           httpOnly: true,
           expires: new Date(0),
         });
         return NextResponse.json(
                   {error: "User is deactivated"},
                   {status: 402}
         );
      }
          // Check if sessionId is available
          if (!sessionId) {
            try {
              if (user) {
                user.isLoggedIn = false;
                user.sessionId = null;
                await user.save();
              }
              const response = NextResponse.json({
                message: "Logout successful",
                success: true,
              });
              response.cookies.set("token", "", {
                httpOnly: true,
                expires: new Date(0),
              });
              return NextResponse.json(
                {error: "Your session has expired"},
                {status: 403}
              );
            } catch (error: any) {
              return NextResponse.json({error: error.message}, {status: 500});
            }
          }

      // Find available admin
      const admin = await AdminUser.findOne({ isAdmin: true });
      if (admin.isDepositsOpen === false) {
        transactionInProgress = false;
           return NextResponse.json(
                {error: "currently under maintainance"},
                {status: 504}
        );
      }

      const date = new Date();
      const newUuid = generateUniqueShortUuid(15);
      const fullname = user.fullname

      // Check for similar transactions in the last 5 minutes
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000); // Corrected the time calculation

      const recentTransaction = admin.transactionHistory.find(transaction => {
        console.log('Checking transaction:', transaction);
        const betIdMatch = transaction.betId === betId;
        const amountMatch = parseFloat(transaction.amount) === parseFloat(amount);
        const paymentConfirmationMatch = transaction.paymentConfirmation === "Successful";
        const statusMatch = transaction.status === "Successful";
        const registrationTimeCheck = new Date(transaction.registrationDateTime) >= fiveMinutesAgo;
        const isRecent = (
          betIdMatch &&
          amountMatch &&
          paymentConfirmationMatch &&
          statusMatch &&
          registrationTimeCheck
        );
        console.log('Overall condition:', isRecent);
        return isRecent;
      });

      if (recentTransaction) {
        console.log('Found recent transaction:', recentTransaction);
      } else {
        console.log('No recent transaction found');
      }

      console.log(recentTransaction, "hcghcghchghv")
      if (recentTransaction !== undefined) {
        const userTransaction = {
          status: "Failed",
          registrationDateTime: date,
          network: network,
          amount: amount,
          totalAmount: amount,
          betId: betId,
          // momoName: momoName,
          momoNumber: momoNumber,
          fundingType: "deposits",
          identifierId: newUuid,
          service: service,
          paymentConfirmation: "Failed",
          customErrorCode: 300
        };
        user.transactionHistory.push(userTransaction);
        admin.transactionHistory.push({
          userid: user._id,
          status: "Failed",
          registrationDateTime: date,
          network: network,
          amount: amount,
          totalAmount: amount,
          betId: betId,
          // momoName: momoName,
          momoNumber: momoNumber,
          fundingType: "deposits",
          identifierId: newUuid,
          userEmail: email,
          subadminEmail: "none",
          service: service,
          paymentConfirmation: "Failed",
          customErrorCode: 300
        });

        await admin.save();
        await user.save();
        console.log("done")
        // Return a JSON response with the transaction status
        transactionInProgress = false;
       
         return NextResponse.json(
                {error: "you just made a of same amount transaction with same id, try again in five minutes"},
                {status: 508}
              );
         
      };


      const result = await makePaymentRequest(amount, momoNumber, network, fullname, newUuid
      );
      
      console.log(result, "API Response:");

      if (result.status !== "SUCCESSFUL") {
        if (result.status === 'PENDING') {
          const userTransaction = {
            status: "Pending",
            registrationDateTime: date,
            amount: amount,
            totalAmount: amount,
            betId: betId,
            // momoName: momoName,
            momoNumber: momoNumber,
            fundingType: "deposits",
            identifierId: newUuid,
            network: network,
            service: service,
            paymentConfirmation: "Pending",
            customErrorCode: 302
          };
          user.transactionHistory.push(userTransaction);
          admin.transactionHistory.push({
            userid: user._id,
            status: "Pending",
            registrationDateTime: date,
            amount: amount,
            totalAmount: amount,
            network: network,
            betId: betId,
            // momoName: momoName,
            momoNumber: momoNumber,
            fundingType: "deposits",
            identifierId: newUuid,
            userEmail: email,
            subadminEmail: "none",
            service: service,
            paymentConfirmation: "Pending",
            customErrorCode: 302
          });
          admin.pendingTransactions.push({
            userid: user._id,
            status: "Pending",
            registrationDateTime: date,
            amount: amount,
            totalAmount: amount,
            network: network,
            betId: betId,
            // momoName: momoName,
            momoNumber: momoNumber,
            fundingType: "deposits",
            identifierId: newUuid,
            userEmail: email,
            subadminEmail: "none",
            service: service,
            paymentConfirmation: "Pending",
            customErrorCode: 302
          });

          await admin.save();
          await user.save();
          // Return a JSON response with the transaction status
          transactionInProgress = false;
          return NextResponse.json({
            success: 211,
            message: "failed to generate",
            userTransaction,
            user,
          });
        } else {
          const userTransaction = {
            status: "Failed",
            registrationDateTime: date,
            amount: amount,
            totalAmount: amount,
            network: network,
            betId: betId,
            // momoName: momoName,
            momoNumber: momoNumber,
            fundingType: "deposits",
            identifierId: newUuid,
            service: service,
            paymentConfirmation: "Failed",
            customErrorCode: 302
          };
          user.transactionHistory.push(userTransaction);
          admin.transactionHistory.push({
            userid: user._id,
            status: "Failed",
            registrationDateTime: date,
            amount: amount,
            totalAmount: amount,
            network: network,
            betId: betId,
            // momoName: momoName,
            momoNumber: momoNumber,
            fundingType: "deposits",
            identifierId: newUuid,
            userEmail: email,
            subadminEmail: "none",
            service: service,
            paymentConfirmation: "Failed",
            customErrorCode: 302
          });

          await admin.save();
          await user.save();
          // Return a JSON response with the transaction status
          transactionInProgress = false;

          return NextResponse
            .json({
              success: 209,
              message: "failed to generate",
              userTransaction,
              user
            });
        }

      }
      //INITIATE MOBCASH TRANSACTION
      console.log( "response from mobcash");
      const response = await rechargeAccount(betId, amount);
      console.log(response, "response from mobcash");
      if (response.Success === false && response.MessageId === 100337) {
        const userTransaction = {
          status: "Pending",
          registrationDateTime: date,
          amount: amount,
          totalAmount: amount,
          network: network,
          betId: betId,
          momoNumber: momoNumber,
          fundingType: "deposits",
          identifierId: newUuid,
          service: service,
          paymentConfirmation: "Successful",
          customErrorCode: 300
        };
        user.transactionHistory.push(userTransaction);
        admin.transactionHistory.push({
          userid: user._id,
          status: "Pending",
          registrationDateTime: date,
          amount: amount,
          totalAmount: amount,
          betId: betId,
          momoNumber: momoNumber,
          fundingType: "deposits",
          identifierId: newUuid,
          userEmail: email,
          network: network,
          subadminEmail: "none",
          service: service,
          paymentConfirmation: "Successful",
          customErrorCode: 300
        });
        await admin.save();
        await user.save();
        transactionInProgress = false
        return NextResponse.json({
          success: 209,
          message: "Transaction wasnt fully completed",
          userTransaction,
          user,
        });
      }
      if (response.Success === false && response.MessageId === 100323) {
        const userTransaction = {
          status: "Pending",
          registrationDateTime: date,
          amount: amount,
          totalAmount: amount,
          betId: betId,
          momoNumber: momoNumber,
          fundingType: "deposits",
          identifierId: newUuid,
          service: service,
          network: network,
          paymentConfirmation: "Successful",
          customErrorCode: 301
        };
        user.transactionHistory.push(userTransaction);
        admin.transactionHistory.push({
          userid: user._id,
          status: "Pending",
          registrationDateTime: date,
          amount: amount,
          totalAmount: amount,
          betId: betId,
          momoNumber: momoNumber,
          fundingType: "deposits",
          identifierId: newUuid,
          userEmail: email,
          network: network,
          subadminEmail: "none",
          service: service,
          paymentConfirmation: "Successful",
          customErrorCode: 301
        });
        await admin.save();
        await user.save();
        transactionInProgress = false
        return NextResponse.json({
          success: 209,
          message: "Transaction wasnt fully completed",
          userTransaction,
          user
        });
      }
      if (response.Success === false) {
        const userTransaction = {
          status: "Pending",
          registrationDateTime: date,
          amount: amount,
          totalAmount: amount,
          betId: betId,
          network: network,
          momoNumber: momoNumber,
          fundingType: "deposits",
          identifierId: newUuid,
          service: service,
          paymentConfirmation: "Successful",

        };
        user.transactionHistory.push(userTransaction);
        admin.transactionHistory.push({
          userid: user._id,
          status: "Pending",
          registrationDateTime: date,
          amount: amount,
          network: network,
          totalAmount: amount,
          betId: betId,
          momoNumber: momoNumber,
          fundingType: "deposits",
          identifierId: newUuid,
          userEmail: email,
          subadminEmail: "none",
          service: service,
          paymentConfirmation: "Successful",
        });
        await admin.save();
        await user.save();
        transactionInProgress = false
        return NextResponse.json({
          success: 209,
          message: "Transaction wasnt fully completed",
          userTransaction,
          user
        });
      }
      const userTransaction = {
        status: "Successful",
        registrationDateTime: date,
        amount: amount,
        totalAmount: amount,
        betId: betId,
        momoNumber: momoNumber,
        fundingType: "deposits",
        identifierId: newUuid,
        service: service,
        paymentConfirmation: "Successful",
        network: network,
      };

      user.transactionHistory.push(userTransaction);
      admin.transactionHistory.push({
        userid: user._id,
        status: "Successful",
        registrationDateTime: date,
        amount: amount,
        totalAmount: amount,
        network: network,
        betId: betId,
        momoNumber: momoNumber,
        fundingType: "deposits",
        identifierId: newUuid,
        userEmail: email,
        subadminEmail: "none",
        service: service,
        paymentConfirmation: "Successful",
      });

       const referer = user.referer
      if (user.referer !== "") {
        const user = await User.findOne({tag: referer});
        if (user) {
          const result = calculatePercentage(amount);
          const eightyPercent = getEightyPercentOfResult(result);
          const twentyPercent = getTwentyPercentOfResult(result);
          user.disbursedBonusBalance = user.disbursedBonusBalance + eightyPercent
          user.restrictedBonusBalance = user.restrictedBonusBalance + twentyPercent
          admin.disbursedBonusBalance = admin.disbursedBonusBalance + eightyPercent
          admin.restrictedBonusBalance = admin.restrictedBonusBalance + twentyPercent
        }
      }
      if (user.disbursedBonusBalance >= 2000) {
        const randomNumber = Math.floor(Math.random() * 11) * 100 + 1000;
        user.disbursedBonusBalance = user.disbursedBonusBalance - randomNumber
        admin.disbursedBonusBalance = admin.disbursedBonusBalance - randomNumber
        user.bonusBalance = user.bonusBalance + randomNumber
      }

      await admin.save();
      await user.save();
      transactionInProgress = false
      return NextResponse.json({
        success: true,
        message: "Transaction generated successfully",
        user,
      });
  } catch (error: any) {
    if (error.message === "Token has expired") {
      // Handle token expiry error
      return NextResponse.json(
        {error: "Token has expired. Please log in again."},
        {status: 509}
      );
    } else {
      // Handle other errors
      return NextResponse.json(
        {error: error.message},
        {status: error.status || 500}
      );
    }
  }
}





function generateUniqueShortUuid(length: number): string {
  const timestamp = Date.now().toString(36); // Convert current timestamp to a base-36 string
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomString = "";
  for (let i = 0; i < length - timestamp.length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    randomString += chars[randomIndex];
  }
  return timestamp + randomString;
}

interface ApiResponse {
  Summa: number;
}

function removeMinusFromSumma(apiResponse: ApiResponse): ApiResponse {
  if (apiResponse && typeof apiResponse.Summa === "number") {
    apiResponse.Summa = Math.abs(apiResponse.Summa);
  }
  return apiResponse;
}

function calculatePercentage(amount: number): number {
  const threePercent = amount * 0.03;
  const fifteenPercentOfThreePercent = threePercent * 0.15;
  return fifteenPercentOfThreePercent;
}

function getEightyPercentOfResult(amount: number): number {
  const result = calculatePercentage(amount);
  const eightyPercentOfResult = result * 0.8;
  return eightyPercentOfResult;
}

function getTwentyPercentOfResult(amount: number): number {
  const result = calculatePercentage(amount);
  const twentyPercentOfResult = result * 0.2;
  return twentyPercentOfResult;
}



interface PaymentResult {
  status: string;
  transactionId: string;
}

async function makePaymentRequest(
  amount: number,
  momoNumber: string,
  network: string,
  fullname: string,
  newUuid: string
): Promise<PaymentResult> {
  try {
    const [firstname, lastname] = fullname.split(" ");
    const QOS_string =
      network.toLowerCase() === "mtn"
        ? process.env.QOS_STRING_FOR_MTN_PAYMENT
        : process.env.QOS_STRING_FOR_MOOV_PAYMENT;
    const QOS_username =
      network.toLowerCase() === "mtn"
        ? process.env.QOS_USERNAME1
        : process.env.QOS_USERNAME2;
    const QOS_password = process.env.QOS_PASSWORD!;
    const QOS_string_check_transaction =
      process.env.QOS_STRING_CHECK_TRANSACTION!;
    const QOS_clientid =
      network.toLowerCase() === "mtn"
        ? process.env.QOS_CLIENTID1
        : process.env.QOS_CLIENTID2;

    console.log("Sending request to:", QOS_string);
    console.log(
      "Authorization:",
      Buffer.from(`${QOS_username}:${QOS_password}`).toString("base64")
    );

    const response = await fetch(QOS_string!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(`${QOS_username}:${QOS_password}`).toString("base64"),
        Expect: "", // Explicitly set Expect header to empty string
      },
      body: JSON.stringify({
        msisdn: `229${momoNumber}`,
        amount: amount,
        firstname: firstname,
        lastname: lastname ? lastname : firstname,
        transref: newUuid,
        clientid: QOS_clientid,
      }),
    });

   
    console.log(response, "response")
    // const data = await pollTransactionStatus(
    //   QOS_string_check_transaction,
    //   QOS_username!,
    //   QOS_password!,
    //   QOS_clientid!,
    //   newUuid
    // );

    // const result = {
    //   status: data,
    //   transactionId: newUuid,
    // };

    // return result;
  } catch (error) {
    console.error("Error making payment request:", error);
    throw new Error("Payment request failed");
  }
}

async function pollTransactionStatus(
  url: string,
  username: string,
  password: string,
  clientid: string,
  transref: string
): Promise<string> {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const interval = 10000; // Check every 10 seconds
    const timeout = 60000; // Timeout after 1 minute
    const maxAttempts = 6; // Maximum number of attempts (timeout/interval)
    let attempts = 0;

    const intervalId = setInterval(async () => {
      attempts += 1;

      if (Date.now() - startTime >= timeout || attempts >= maxAttempts) {
        clearInterval(intervalId);
        return resolve("PENDING");
      }

      try {
        const checkStatus = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Basic " +
              Buffer.from(`${username}:${password}`).toString("base64"),
          },
          body: JSON.stringify({
            clientid: clientid,
            transref: transref,
          }),
        });

        const statusData = await checkStatus.json();
        console.log("Status Check Response:", statusData);

        if (statusData.responsemsg === "SUCCESSFUL") {
          clearInterval(intervalId);
          return resolve("SUCCESSFUL");
        } else if (statusData.responsemsg !== "PENDING") {
          clearInterval(intervalId);
          return resolve("FAILED");
        }
      } catch (error) {
        console.error("Error checking transaction status:", error);
        clearInterval(intervalId);
        return resolve("PENDING");
      }
    }, interval);
  });
}

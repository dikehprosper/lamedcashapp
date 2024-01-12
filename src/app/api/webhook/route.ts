/* eslint-disable */
// @ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import { FedaPay, Transaction, Customer } from "fedapay";
const { Webhook } = require("fedapay");
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
connect();
const { createServer } = require("http");
const { Server } = require("socket.io");



export async function POST(request: NextRequest) {
  //   const httpServer = createServer();
  // const io = new Server(httpServer, {
  //   cors: {
  //     origin: "*",
  //     methods: ["GET", "POST"],
  //   },
  // });

  // io.on(
  //   "connection",
  //   async (socket: {
  //     emit(arg0: string, arg1: { name: string; surname: string }): unknown;
  //     on: (
  //       arg0: string,
  //       arg1: (
  //         arg1: any,
  //         arg2: any,
  //         callback: (arg0: { status: string }) => void
  //       ) => void
  //     ) => void;
  //   }) => {
  //     socket.on("myevent", (data) => {
  //       console.log("gvhvjh")
  //       socket.emit("responseEvent", { name: "samuel", surname: "glamper" });
  //     });
  //   }
  // );

  // httpServer.listen(5000, () => {
  //   console.log("Server is listening on port 5000");
  // });

  // Create WebSocket connection.
  const socket = new WebSocket("ws://localhost:8080");

  // Connection opened
  socket.addEventListener("open", (event) => {
    socket.send("Hello Server!");
  });

  // Listen for messages
  socket.addEventListener("message", (event) => {
    console.log("Message from server ", event.data);
  });

  try {
    const rawBody = await request.text();
    const sig = request.headers.get("x-fedapay-signature");
    let event;
    const endpointSecret = process.env.ENDPOINTSECRET_WEBHOOK_SANDBOX!;
    event = Webhook.constructEvent(rawBody, sig, endpointSecret);

    const fedapayTransactionId = event.entity.id.toString();
    const email = event.entity.customer.email;

    const user = await User.findOne({ email });
    const admin = await User.findOne({ isAdmin: true });
    const ticket = user.pendingDeposit.find(
      (t: any) => t.fedapayTransactionId === fedapayTransactionId
    );
    console.log(ticket, "ticket");
    // const newUuid = uuidv4();
    const date = new Date();

    // Create a new transaction history entry for the user
    const userTransaction = {
      status: "Pending",
      registrationDateTime: date,
      amount: ticket.amount,
      betId: ticket.betId,
      momoName: ticket.momoName,
      momoNumber: ticket.momoNumber,
      fundingType: "deposits",
      identifierId: ticket.transactionId,
    };

    const subadminTransaction = {
      userid: user._id,
      status: "Pending",
      registrationDateTime: date,
      amount: ticket.amount,
      betId: ticket.betId,
      momoName: ticket.momoName,
      momoNumber: ticket.momoNumber,
      fundingType: "deposits",
      identifierId: ticket.transactionId,
    };

   
    // Handle the event
    if (event.name === "transaction.declined") {
      console.log("transaction declined");
      const ticketIndex = user.pendingDeposit.findIndex(
        (t: any) => t.fedapayTransactionId === fedapayTransactionId
      );

      if (ticketIndex !== -1) {
        // If the ticket is found in user.pendingDeposit, remove it
        user.pendingDeposit.splice(ticketIndex, 1);
      }
      console.log(
        user.pendingDeposit,
        "user.pendingDeposit after cancellation"
      );
      await user.save();
    } else if (event.name === "transaction.approved") {
      console.log("transaction approved");

      user.transactionHistory.push(userTransaction);
      await user.save();
      const adminUsers = await User.find({
        isSubAdminDeposits: true,
      });
      const adminUser = await User.find({
        isSubAdminDeposits: true,
        isOutOfFunds: false,
      });
      if (!adminUser || adminUser.length === 0) {
        adminUsers[0].transactionHistory.push(subadminTransaction);
        admin.transactionHistory.push({
        userid: user._id,
        status: "Pending",
        registrationDateTime: date,
        amount: ticket.amount,
        betId: ticket.betId,
        momoName: ticket.momoName,
        momoNumber: ticket.momoNumber,
        fundingType: "deposits",
        identifierId: ticket.transactionId,
        userEmail: user.email,
        subadminEmail: adminUsers[0].email
      })
       await adminUser.save();
        await admin.save();
      } else {
        // Example usage: Get the index of the subadmin with current: true
        let currentSubadminIndex = -1;

        for (let i = 0; i < adminUser.length; i++) {
          if (adminUser[i].current === true) {
            currentSubadminIndex = i;
            break;
          }
        }

        // Find the subadmin that is currently receiving requests
        const currentSubadmin = adminUser.find(
          (subadmin) => subadmin.current === true
        );

        // Check if the request count for the current subadmin is divisible by 10
        if (currentSubadmin && currentSubadmin.currentCount === 5) {
          // Mark the current subadmin as not 'current'
          currentSubadmin.current = false;
          currentSubadmin.currentCount = 0;
          let nextCurrentSubadminIndex =
            (currentSubadminIndex + 1) % adminUser.length;

          let nextSubadmin = adminUser[nextCurrentSubadminIndex]
            ? adminUser[nextCurrentSubadminIndex]
            : adminUser[0];

          // Mark the next subadmin as 'current'
          nextSubadmin.current = true;
          const updatedCount = nextSubadmin.currentCount + 1;
          nextSubadmin.currentCount = updatedCount;
          nextSubadmin.transactionHistory.push(subadminTransaction);
             admin.transactionHistory.push({
        userid: user._id,
        status: "Pending",
        registrationDateTime: date,
        amount: ticket.amount,
        betId: ticket.betId,
        momoName: ticket.momoName,
        momoNumber: ticket.momoNumber,
        fundingType: "deposits",
        identifierId: ticket.transactionId,
        userEmail: user.email,
        subadminEmail: nextSubadmin.email
      })

          // Save changes to the database for both the current and next subadmin
          await Promise.all([currentSubadmin.save(), nextSubadmin.save(), admin.save()]);
        } else {
           admin.transactionHistory.push({
             userid: user._id,
             status: "Pending",
             registrationDateTime: date,
             amount: ticket.amount,
             betId: ticket.betId,
             momoName: ticket.momoName,
             momoNumber: ticket.momoNumber,
             fundingType: "deposits",
             identifierId: ticket.transactionId,
             userEmail: user.email,
             subadminEmail: currentSubadmin.email,
           });
          currentSubadmin.transactionHistory.push(subadminTransaction);
          const updatedCount = currentSubadmin.currentCount + 1;
          currentSubadmin.currentCount = updatedCount;
          await currentSubadmin.save();
          await admin.save();
        }
      }

      const ticketIndex = user.pendingDeposit.findIndex(
        (t: any) => t.fedapayTransactionId === fedapayTransactionId
      );

      if (ticketIndex !== -1) {
        // If the ticket is found in user.pendingDeposit, remove it
        user.pendingDeposit.splice(ticketIndex, 1);
      }

      console.log(
        user.pendingDeposit,
        "user.pendingDeposit after cancellation"
      );
      await user.save();
    } else if (event.name === "transaction.canceled") {
      console.log("transaction canceled");
      const ticketIndex = user.pendingDeposit.findIndex(
        (t: any) => t.fedapayTransactionId === fedapayTransactionId
      );

      if (ticketIndex !== -1) {
        // If the ticket is found in user.pendingDeposit, remove it
        user.pendingDeposit.splice(ticketIndex, 1);
      }
      console.log(
        user.pendingDeposit,
        "user.pendingDeposit after cancellation"
      );
      await user.save();
    } else {
      console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    console.error(error, "error");
    return NextResponse.json(
      { error: error.message || "Webhook Error" },
      { status: 400 }
    );
  }
}

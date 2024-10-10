import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
// Import WebSocket or event emitter module
import { EventEmitter } from 'events';

// Create an event emitter instance
const emitter = new EventEmitter();

// Function to emit real-time updates
const emitRealTimeUpdate = (userId: any, updatedUserData: any) => {
  console.log(updatedUserData);
  emitter.emit('userUpdated', { userId, updatedUserData });
};


export async function GET(request: NextRequest) {
  try {
    // Get user ID and sessionId from the token
    const { userId, sessionId } = await getDataFromToken(request);

    // Find the user and select all fields except password
    const user = await User.findOne({ _id: userId }).select("-password");

 if (!user.isActivated) {
   return NextResponse.json(
     { error: "your account has been deactivated" },
     { status: 404 }
   );
 }
    if (user.pendingDeposit.length > 0) {
      // Function to check if createdAt is less than 24 hours old
      const isWithin24Hours = (createdAt: any) => {
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
        return new Date(createdAt) > twentyFourHoursAgo;
      };

      // Filter out objects with createdAt more than 24 hours ago
      const filteredTransactions = user.pendingDeposit.filter((transaction: any) =>
        isWithin24Hours(transaction.createdAt)
      );
      // Update user.pendingDeposit with the filtered array
      user.pendingDeposit = filteredTransactions;

      // Save the modified user object to the database
      await user.save();
    }


    // Check if the stored sessionId matches the sessionId from the token
    if (user && user.sessionId === sessionId) {
       emitRealTimeUpdate(userId, user.betId);
      return NextResponse.json({
        message: "User found",
        data: {
          betID: user.supplementaryBetId,
          _id: user._id,
          email: user.email,
          fullname: user.fullname,
          betId: user.betId,
          number: user.number,
          fedapayId: user.fedapayId
        },
      });
    } else {
      // Session ID mismatch
      return NextResponse.json(
        { error: "Invalid session ID. Please log in again." },
        { status: 401 }
      );
    }
  } catch (error: any) {
    if (error.message === "Token has expired") {
      // Handle token expiry error
      return NextResponse.json(
        { error: "Token has expired. Please log in again." },
        { status: 402 }
      );
    } else {
      // Handle other errors
      return NextResponse.json(
        { error: error.message },
        { status: error.status || 500 }
      );
    }
  }
}

connect();

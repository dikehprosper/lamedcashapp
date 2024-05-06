import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    // Destructure _id and betId from the request body
    const { _id, betId } = reqBody;

    // Find the user by _id
    const user = await User.findOne({ _id });
 if (!user.isActivated) {
   return NextResponse.json(
     { error: "your account has been deactivated" },
     { status: 404 }
   );
 }
    // Check if the user exists
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    // Check if betId exists in the supplementaryBetId array
    const index = user.supplementaryBetId.indexOf(betId);

    if (index !== -1) {
      // Remove the betId from the array
      user.supplementaryBetId.splice(index, 1);

      // Save the updated user
      await user.save();

      const res = user.supplementaryBetId;

      const response = NextResponse.json({
        message: "Successful",
        success: true,
        res,
      });

      // Return the response
      return response;
    } else {
      return NextResponse.json(
        { error: "betId not found in the array" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} // Connect to the database
connect();

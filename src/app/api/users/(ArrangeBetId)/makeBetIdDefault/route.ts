import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { _id, betId } = await reqBody;

    const user = await User.findOne({ _id });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
    const index = user.supplementaryBetId.indexOf(betId);

    if (index !== -1) {
      // Remove the existing betId from its current position
      user.supplementaryBetId.splice(index, 1);

      // Insert the betId at the beginning of the array
      user.supplementaryBetId.unshift(betId);
    }
    user.betId = betId;
    await user.save();
    const res = user.supplementaryBetId;

    const response = NextResponse.json({
      message: "successful",
      success: true,
      res,
    });

    // Return the response or use it as needed
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

connect();

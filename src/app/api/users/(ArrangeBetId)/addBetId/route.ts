import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { _id, betId } = await reqBody;
    // Function to count "Pending" transactions for a subadmin

    const user = await User.findOne({ _id });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    if (user.supplementaryBetId.length >= 2) {
      return NextResponse.json(
        { error: "maximum betId added" },
        { status: 401 }
      );
    }

    const hasDuplicateBetId = user.supplementaryBetId.some(
      (id: any) => id === betId
    );
    if (hasDuplicateBetId) {
      return NextResponse.json(
        { error: "betId already exists" },
        { status: 402 }
      );
    }
    user.supplementaryBetId.push(betId);
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

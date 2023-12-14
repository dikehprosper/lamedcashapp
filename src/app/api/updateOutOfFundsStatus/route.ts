import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
export async function GET(request: NextRequest) {
 try {
   const { userId, sessionId } = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    user.isOutOfFunds = !user.isOutOfFunds;

    await user.save();
    const status = user.isOutOfFunds
    const response = NextResponse.json({
      message: "updated successful",
      success: true,
   status
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
connect();

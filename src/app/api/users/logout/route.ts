import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
export async function GET(request: NextRequest) {
  try {
   const { userId, sessionId } = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    user.isLoggedIn = false;
    user.sessionId = null;
     await user.save();
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
connect();


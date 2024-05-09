import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import {SubAdminUser, AdminUser} from "@/models/userModel";
export async function GET(request: NextRequest) {
  try {
   const { userId, sessionId } = await getDataFromToken(request);
   const user = await User.findOne({ _id: userId }).select("-password");
    const user2 = await SubAdminUser.findOne({ _id: userId }).select("-password");
    const user3 = await AdminUser.findOne({ _id: userId }).select("-password");

if (user) {
    user.isLoggedIn = false;
    user.sessionId = null;
     await user.save();
}
if (user2) {
      user2.isLoggedIn = false;
    user2.sessionId = null;
     await user2.save();
}
if (user3) {
      user3.isLoggedIn = false;
    user3.sessionId = null;
     await user3.save();
}

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


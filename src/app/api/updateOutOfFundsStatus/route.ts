import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
export async function GET(request: NextRequest) {
    console.log("userIdyufuyfyufuyfiuufiogkiugigkuguygugugkugkguyh");
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    user.isOutOfFunds = !user.isOutOfFunds;
    await user.save();
    const response = NextResponse.json({
      message: "updated successful",
      success: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
connect();

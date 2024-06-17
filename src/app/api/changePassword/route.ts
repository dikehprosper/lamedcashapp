import { NextRequest, NextResponse } from "next/server";
import {getDataFromToken} from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export async function POST(request: NextRequest) {
  try {
        const {userId, sessionId} = await getDataFromToken(request);
    const reqBody = await request.json();

    const {_id,  oldPassword,password, confirmPassword} = await reqBody;
    // Check if the User already exists
   

    const user = await User.findOne({ _id });
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 400 });
      }
     if (!user.isActivated) {
       return NextResponse.json(
         { error: "your account has been deactivated" },
         { status: 404 }
       );
     }
   
    // Check if password is correct
    const validPassword = await bcryptjs.compare(oldPassword, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "l'ancien mot de passe n'est pas correct" }, { status: 402 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt)
   user.password = hashedPassword
  await user.save();

    const response = NextResponse.json({
      message: "successful",
      success: true,
    });
 

    // Return the response or use it as needed
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

connect();
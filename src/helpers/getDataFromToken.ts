import { NextRequest } from "next/server";
import jwt, { TokenExpiredError } from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

    // Extract and return user ID and session ID from the token
    return {
      userId: decodedToken._id,
      sessionId: decodedToken.sessionId || null,
    };
  } catch (error: any) {
    if (error instanceof TokenExpiredError) {
      throw new Error("Token has expired");
    } else {
      throw new Error(error.message);
    }
  }
};

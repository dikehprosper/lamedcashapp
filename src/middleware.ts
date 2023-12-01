import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

 // Add this variable
interface TokenPayload {
  isAdmin?: boolean;
  isSubAdmin?: boolean;
  // Add other properties as needed
}

export async function middleware(request: NextRequest) {
    let hasRedirected = false;
  const path = request.nextUrl.pathname;
  const isPublicPath =
    path === "/signin" ||
    path === "/signup" ||
    path === "/" ||
    path === "/about";
  const token = request.cookies.get("token")?.value || "";
  const decodedToken = jwt.decode(token) as TokenPayload | null;

  // Check if the user is an admin and trying to access the "/dashboard" route
  if (!hasRedirected) {
  if (
    (path.startsWith("/dashboard") && token) ||
    (path.startsWith("/deposit") && token) ||
    (path.startsWith("/profile") && token) ||
    (path.startsWith("/referrals") && token) ||
    (path.startsWith("/transactions") && token) ||
    path.startsWith("/withdraw")
  ) {
    const decodedToken = jwt.decode(token) as TokenPayload | null;
    // @ts-ignore
    if (decodedToken && decodedToken.isAdmin) {
      hasRedirected = true;
      return NextResponse.redirect(
        new URL("/admin/dashboard", request.nextUrl)
      );
    }
    if (decodedToken && decodedToken.isSubAdmin) {
      hasRedirected = true;
      return NextResponse.redirect(
        new URL("/subadmin/deposit/dashboard", request.nextUrl)
      );
    }
    hasRedirected = true;
  }

  // Check if the user is not an admin and trying to access the "/AdminDashboard" route
  if (path.startsWith("/admin") && token) {
    const decodedToken = jwt.decode(token) as TokenPayload | null;
    // @ts-ignore
    if (decodedToken && !decodedToken.isAdmin) {
      if (decodedToken && decodedToken.isSubAdmin) {
        hasRedirected = true;
        return NextResponse.redirect(
          new URL("/subadmin/deposit/dashboard", request.nextUrl)
        );
      } else if (
        decodedToken &&
        !decodedToken.isAdmin &&
        !decodedToken.isSubAdmin
      ) {
        hasRedirected = true;
        return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
      }
    }
    hasRedirected = true;
  }

  if (path.startsWith("/subadmin") && token) {
    const decodedToken = jwt.decode(token) as TokenPayload | null;
    // @ts-ignore
    if (decodedToken && !decodedToken.isSubAdmin) {
      if (decodedToken && decodedToken.isAdmin) {
        hasRedirected = true;
        return NextResponse.redirect(
          new URL("/admin/dashboard", request.nextUrl)
        );
      } else if (
        decodedToken &&
        !decodedToken.isSubAdmin &&
        !decodedToken.isAdmin
      ) {
        hasRedirected = true;
        return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
      }
    }
    hasRedirected = true;
  }

  if (token === null) {
    hasRedirected = true;
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }}

  // If none of the conditions match, allow the request to continue
  return NextResponse.next();
}



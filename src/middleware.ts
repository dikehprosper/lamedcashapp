import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface TokenPayload {
  isUser?: boolean;
  isAdmin?: boolean;
  isSubAdminDeposits?: boolean;
  isSubAdminWithdrawals?: boolean;
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";
  const decodedToken = jwt.decode(token) as TokenPayload | null;

  if (path.startsWith("/admin")) {
    if (decodedToken?.isSubAdminDeposits) {
      return NextResponse.redirect(
        new URL("/subadmin/deposit/dashboard", request.nextUrl)
      );
    } else if (decodedToken?.isSubAdminWithdrawals) {
      return NextResponse.redirect(
        new URL("/subadmin/withdrawal/dashboard", request.nextUrl)
      );
    } else if (decodedToken?.isUser) {
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    } else if (!decodedToken) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    } else {
      return NextResponse.next();
    }
  } else if (path.startsWith("/subadmin/deposit")) {
    if (decodedToken?.isSubAdminWithdrawals) {
      return NextResponse.redirect(
        new URL("/subadmin/withdrawal/dashboard", request.nextUrl)
      );
    } else if (decodedToken?.isAdmin) {
      return NextResponse.redirect(
        new URL("/admin/dashboard", request.nextUrl)
      );
    } else if (decodedToken?.isUser) {
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    } else if (!decodedToken) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    } else {
      return NextResponse.next();
    }
  } else if (path.startsWith("/subadmin/withdrawal")) {
    if (decodedToken?.isSubAdminDeposits) {
      return NextResponse.redirect(
        new URL("/subadmin/deposit/dashboard", request.nextUrl)
      );
    } else if (decodedToken?.isAdmin) {
      return NextResponse.redirect(
        new URL("/admin/dashboard", request.nextUrl)
      );
    } else if (decodedToken?.isUser) {
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    } else if (!decodedToken) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    } else {
      return NextResponse.next();
    }
  } else if (
    path.startsWith("/dashboard") ||
    path.startsWith("/deposit") ||
    path.startsWith("/withdraw") ||
    path.startsWith("/transactions") ||
    path.startsWith("/profile") ||
    path.startsWith("/referrals")
  ) {
    if (decodedToken?.isSubAdminDeposits) {
      return NextResponse.redirect(
        new URL("/subadmin/deposit/dashboard", request.nextUrl)
      );
    } else if (decodedToken?.isSubAdminWithdrawals) {
      return NextResponse.redirect(
        new URL("/subadmin/withdrawal/dashboard", request.nextUrl)
      );
    } else if (decodedToken?.isAdmin) {
      return NextResponse.redirect(
        new URL("/admin/dashboard", request.nextUrl)
      );
    } else if (!decodedToken) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    } else {
      return NextResponse.next();
    }
  }
     return NextResponse.next();
}

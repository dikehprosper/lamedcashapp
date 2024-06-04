import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import createIntlMiddleware from "next-intl/middleware";

interface TokenPayload {
  isUser?: boolean;
  isAdmin?: boolean;
  isSubAdminDeposits?: boolean;
  isSubAdminWithdrawals?: boolean;
}

function handleI18n(request: NextRequest) {
  const handleI18nRouting = createIntlMiddleware({
    locales: ["en", "fr"],
    defaultLocale: "en",
  });
  const response = handleI18nRouting(request);
  return response;
}

export async function middleware(request: NextRequest) {
  const [, locale, ...segments] = request.nextUrl.pathname.split("/");
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";
  const decodedToken = jwt.decode(token) as TokenPayload | null;

  if (path.startsWith(`/${locale}/admin`)) {
    if (decodedToken?.isSubAdminDeposits) {
      return NextResponse.redirect(
        new URL(`/${locale}/subadmin/deposit/dashboard`, request.nextUrl)
      );
    } else if (decodedToken?.isSubAdminWithdrawals) {
      return NextResponse.redirect(
        new URL(`/${locale}/subadmin/withdrawal/dashboard`, request.nextUrl)
      );
    } else if (decodedToken?.isUser) {
      return NextResponse.redirect(
        new URL(`/${locale}/dashboard`, request.nextUrl)
      );
    } else if (!decodedToken) {
      return NextResponse.redirect(new URL(`/${locale}/`, request.nextUrl));
    } else {
      return handleI18n(request);
    }
  } else if (path.startsWith(`/${locale}/subadmin/deposit`)) {
    if (decodedToken?.isSubAdminWithdrawals) {
      return NextResponse.redirect(
        new URL(`/${locale}/subadmin/withdrawal/dashboard`, request.nextUrl)
      );
    } else if (decodedToken?.isAdmin) {
      return NextResponse.redirect(
        new URL(`/${locale}/admin/dashboard`, request.nextUrl)
      );
    } else if (decodedToken?.isUser) {
      return NextResponse.redirect(
        new URL(`/${locale}/dashboard`, request.nextUrl)
      );
    } else if (!decodedToken) {
      return NextResponse.redirect(new URL(`/${locale}/`, request.nextUrl));
    } else {
      return handleI18n(request);
    }
  } else if (path.startsWith(`/${locale}/subadmin/withdrawal`)) {
    if (decodedToken?.isSubAdminDeposits) {
      return NextResponse.redirect(
        new URL(`/${locale}/subadmin/deposit/dashboard`, request.nextUrl)
      );
    } else if (decodedToken?.isAdmin) {
      return NextResponse.redirect(
        new URL(`/${locale}/admin/dashboard`, request.nextUrl)
      );
    } else if (decodedToken?.isUser) {
      return NextResponse.redirect(
        new URL(`/${locale}/dashboard`, request.nextUrl)
      );
    } else if (!decodedToken) {
      return NextResponse.redirect(new URL(`/${locale}/`, request.nextUrl));
    } else {
      return handleI18n(request);
    }
  } else if (
    path.startsWith(`/${locale}/dashboard`) ||
    path.startsWith(`/${locale}/deposit`) ||
    path.startsWith(`/${locale}/withdraw`) ||
    path.startsWith(`/${locale}/transactions`) ||
    path.startsWith(`/${locale}/profile`) ||
    path.startsWith(`/${locale}/referrals`)
  ) {
    if (decodedToken?.isSubAdminDeposits) {
      return NextResponse.redirect(
        new URL(`/${locale}/subadmin/deposit/dashboard`, request.nextUrl)
      );
    } else if (decodedToken?.isSubAdminWithdrawals) {
      return NextResponse.redirect(
        new URL(`/${locale}/subadmin/withdrawal/dashboard`, request.nextUrl)
      );
    } else if (decodedToken?.isAdmin) {
      return NextResponse.redirect(
        new URL(`/${locale}/admin/dashboard`, request.nextUrl)
      );
    } else if (!decodedToken) {
      return NextResponse.redirect(new URL(`/${locale}/`, request.nextUrl));
    } else {
      const handleI18nRouting = createIntlMiddleware({
        locales: ["en", "fr"],
        defaultLocale: "fr",
      });
      const response = handleI18nRouting(request);
      return response;
    }
  }
  return handleI18n(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

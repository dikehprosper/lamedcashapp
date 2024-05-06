import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import acceptLanguage from "accept-language";
import { fallbackLng, languages, cookieName } from "./app/i18n/settings";

acceptLanguage.languages(languages);

export const config = {
  // matcher: '/:lng*'
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)",
  ],
};

interface TokenPayload {
  isUser?: boolean;
  isAdmin?: boolean;
  isSubAdminDeposits?: boolean;
  isSubAdminWithdrawals?: boolean;
}

export async function middleware(request: NextRequest) {
  let lng;
  if (request.cookies.has(cookieName))
    lng = acceptLanguage.get(request.cookies.get(cookieName)!.value);
  if (!lng) lng = acceptLanguage.get(request.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  // Redirect if lng in path is not supported
  if (
    !languages.some((loc) =>
      request.nextUrl.pathname.startsWith(`/${lng}${loc}`)
    ) &&
    !request.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${request.nextUrl.pathname}`, request.url)
    );
  }

  if (request.headers.has("referer")) {
    const refererUrl = new URL(request.headers.get("referer")!);
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${lng}${l}`)
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  const path = request.nextUrl.pathname;
  const token = request.cookies.get(`token`)?.value || ``;
  const decodedToken = jwt.decode(token) as TokenPayload | null;

  if (path.startsWith(`/${lng}admin`)) {
    if (decodedToken?.isSubAdminDeposits) {
      return NextResponse.redirect(
        new URL(`/${lng}subadmin/deposit/dashboard`, request.nextUrl)
      );
    } else if (decodedToken?.isSubAdminWithdrawals) {
      return NextResponse.redirect(
        new URL(`/${lng}subadmin/withdrawal/dashboard`, request.nextUrl)
      );
    } else if (decodedToken?.isUser) {
      return NextResponse.redirect(
        new URL(`/${lng}dashboard`, request.nextUrl)
      );
    } else if (!decodedToken) {
      return NextResponse.redirect(new URL(`/${lng}`, request.nextUrl));
    } else {
      return NextResponse.next();
    }
  } else if (path.startsWith(`/${lng}subadmin/deposit`)) {
    if (decodedToken?.isSubAdminWithdrawals) {
      return NextResponse.redirect(
        new URL(`/${lng}subadmin/withdrawal/dashboard`, request.nextUrl)
      );
    } else if (decodedToken?.isAdmin) {
      return NextResponse.redirect(
        new URL(`/${lng}admin/dashboard`, request.nextUrl)
      );
    } else if (decodedToken?.isUser) {
      return NextResponse.redirect(
        new URL(`/${lng}dashboard`, request.nextUrl)
      );
    } else if (!decodedToken) {
      return NextResponse.redirect(new URL(`/${lng}`, request.nextUrl));
    } else {
      return NextResponse.next();
    }
  } else if (path.startsWith(`/${lng}subadmin/withdrawal`)) {
    if (decodedToken?.isSubAdminDeposits) {
      return NextResponse.redirect(
        new URL(`/${lng}subadmin/deposit/dashboard`, request.nextUrl)
      );
    } else if (decodedToken?.isAdmin) {
      return NextResponse.redirect(
        new URL(`/${lng}admin/dashboard`, request.nextUrl)
      );
    } else if (decodedToken?.isUser) {
      return NextResponse.redirect(
        new URL(`/${lng}dashboard`, request.nextUrl)
      );
    } else if (!decodedToken) {
      return NextResponse.redirect(new URL(`/${lng}`, request.nextUrl));
    } else {
      return NextResponse.next();
    }
  } else if (
    path.startsWith(`/${lng}dashboard`) ||
    path.startsWith(`/${lng}deposit`) ||
    path.startsWith(`/${lng}withdraw`) ||
    path.startsWith(`/${lng}transactions`) ||
    path.startsWith(`/${lng}profile`) ||
    path.startsWith(`/${lng}referrals`)
  ) {
    if (decodedToken?.isSubAdminDeposits) {
      return NextResponse.redirect(
        new URL(`/${lng}subadmin/deposit/dashboard`, request.nextUrl)
      );
    } else if (decodedToken?.isSubAdminWithdrawals) {
      return NextResponse.redirect(
        new URL(`/${lng}subadmin/withdrawal/dashboard`, request.nextUrl)
      );
    } else if (decodedToken?.isAdmin) {
      return NextResponse.redirect(
        new URL(`/${lng}admin/dashboard`, request.nextUrl)
      );
    } else if (!decodedToken) {
      return NextResponse.redirect(new URL(`/${lng}`, request.nextUrl));
    } else {
      return NextResponse.next();
    }
  }
  return NextResponse.next();
}

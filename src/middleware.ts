import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import jwt from "jsonwebtoken";

interface TokenPayload {
  isUser?: boolean;
  isAdmin?: boolean;
  isSubAdminDeposits?: boolean;
  isSubAdminWithdrawals?: boolean;
}

// Extract locale from the URL or use default, set to "fr" if missing
function getLocale(request: NextRequest): string {
  const localeFromPath = request.nextUrl.pathname.split("/")[1];

  // Try to get the locale from cookies
  const localeFromCookie = request.cookies.get("locale")?.value;

  // If locale is valid in URL or cookie, return it; otherwise default to "fr"
  if (["en", "fr"].includes(localeFromPath)) {
    return localeFromPath;
  }

  if (localeFromCookie && ["en", "fr"].includes(localeFromCookie)) {
    return localeFromCookie;
  }

  // If no locale is found, default to "fr"
  return "fr";
}

export async function middleware(request: NextRequest) {
 

  const path = request.nextUrl.pathname;
  console.log(request.nextUrl.pathname, "request.nextUrl.pathname")




  let locale = "fr"; // Get locale from path or cookie

  // If locale is not present in cookies, set it to 'fr' and redirect to /fr
  if (!request.cookies.get("locale")) {
    const response = NextResponse.redirect(new URL(`/fr${path}`, request.url));
    response.cookies.set("locale", "fr", {maxAge: 365 * 24 * 60 * 60}); // Set cookie for 1 year
    return response;
  }
 const token = request.cookies.get("token")?.value || "";
 const decodedToken = jwt.decode(token) as TokenPayload | null;
  if (!token) {
    if (path === "/") {
      return NextResponse.redirect(new URL(`/${locale}`, request.url));
    } else {
 return NextResponse.next();
    }
    
  }

    if (path.startsWith(`/${locale}/admin`)) {
      // Admin path handling
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
      }
    }

    // SubAdmin Deposits path handling
    else if (path.startsWith(`/${locale}/subadmin/deposit`)) {
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
      }
    }

    // SubAdmin Withdrawals path handling
    else if (path.startsWith(`/${locale}/subadmin/withdrawal`)) {
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
      }
    }

    // User paths handling
    else if (
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
      }
    } else if (path === "/") {
      // Redirect to the root with the locale
      if (decodedToken?.isUser) {
        return NextResponse.redirect(
          new URL(`/${locale}/dashboard`, request.nextUrl)
        );
      } else {
        return NextResponse.redirect(new URL(`/${locale}`, request.url));
      }
    }


  // If no route matches, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  // Match all routes except API routes and static files
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

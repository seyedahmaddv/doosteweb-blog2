import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // صفحات مجاز برای ادمین (محافظت‌شده)
  const adminPages = ["/blog/create", "/blog/create2"];

  // بررسی اگر مسیر صفحه ادمین است
  if (adminPages.some((page) => pathname.startsWith(page))) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      // اگر لاگین نشده باشند به صفحه ورود برد
      const loginUrl = new URL("/auth/auth1/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/blog/create", "/blog/create2"],
};

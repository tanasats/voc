import { NextRequest, NextResponse } from "next/server";
const SECRET_KEY = new TextEncoder().encode("tanasat-secret-key"); // แปลง Secret เป็น Uint8Array

async function verifyJWT(token: string) {
  try {
    const [header, payload, signature] = token.split(".");
    const data = `${header}.${payload}`;
    // แปลง Signature จาก Base64
    const signatureBuffer = new Uint8Array(
      Array.from(atob(signature.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0))
    );
    const key = await crypto.subtle.importKey(
      "raw",
      SECRET_KEY,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
    const isValid = await crypto.subtle.verify("HMAC", key, signatureBuffer, new TextEncoder().encode(data));
    //console.log("token isValid=", isValid);
    if (!isValid) return null; //return ({"status":"error","message":"Invalid token"}); //throw new Error("Invalid token");
    return JSON.parse(atob(payload));
  } catch (error) {
    return error;
  }
}

export async function middleware(request: NextRequest) { console.log("Hello Middleware");
  const { pathname }: { pathname: string } = request.nextUrl;
  console.log("pathname=", pathname);

  const token = request.cookies.get("token")?.value || "";
  if (!token) return NextResponse.redirect(new URL("/signin", request.url)); // กรณีไม่พบ token
  console.log("token=", token);
  
  if (token) {
    const decoded = await verifyJWT(token);
    if (!decoded && !request.nextUrl.pathname.startsWith('/signin')) {
      console.log("Invalid token")
      return NextResponse.redirect(new URL("/signin", request.url)); // กรณี Token ไม่ถูกต้อง
    }
    console.log("decodedToken = ", decoded);

    





  }
  return NextResponse.next();
}

export const config = {
  //matcher: ["/dashboard/:path*", "/profile/:path*"], // ป้องกันหน้า Dashboard และ Profile
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/api/users/:path*",
  ],
};
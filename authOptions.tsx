import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "your-username" },
        password: { label: "Password", type: "password" ,placeholder:"password"}
      },
      async authorize(credentials, req) {
        // ตัวอย่าง: ตรวจสอบ username และ password
        const user = { id: "1", name: "admin", email: "admin@example.com" };

        if (credentials?.username === "admin" && credentials?.password === "password") {
          return user;
        }
        return null; // ล็อกอินไม่สำเร็จ
      }
    })
  ],
//   pages: {
//     signIn: "/login", // เปลี่ยนหน้า login ถ้าต้องการ
//   },
  callbacks: {
    async session({ session, token }) {
    //   session.user.id = token.sub as string;
    //   return session;
    console.log("token:",token);
    return { ...session,
        user: { ...session.user,
          id: token.sub,
          //isAdmin: token.isAdmin,
          //vendorId: token.vendorId,
          //stripe_id: token.stripeId
        }
      }


    },
    async jwt({ token, user }) {
        console.log("user:",user);
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  },
  secret: process.env.NEXTAUTH_SECRET, // ค่าที่ใช้เข้ารหัส
  session: {
    strategy: "jwt",
  },
};

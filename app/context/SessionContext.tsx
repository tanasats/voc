"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

// กำหนดประเภทของข้อมูลใน Session
interface User {
  id: number;
  name: string;
  role: string;
  email?: string;
}

interface SessionContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

// สร้าง Context
const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // โหลดข้อมูลจาก Cookies เมื่อโหลดหน้าเว็บ
    const storedUser = Cookies.get("user");
    const storedToken = Cookies.get("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = (user: User, token: string) => {
    setUser(user);
    setToken(token);

    // เก็บใน Cookies
    Cookies.set("user", JSON.stringify(user), { expires: 1 });
    Cookies.set("token", token, { expires: 1 });

    // Redirect ไปหน้า Dashboard
    // router.push("/dashboard");
    router.push("/");
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    // ลบ Cookies
    Cookies.remove("user");
    Cookies.remove("token");

    //router.push("/auth/login");
    router.push("/signin");
  };

  return (
    <SessionContext.Provider value={{ user, token, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

// Hook สำหรับใช้งาน Session
export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
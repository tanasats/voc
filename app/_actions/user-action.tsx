"use server"
import { db } from "@/lib/db";

// 📌 ค้นหาผู้ใช้จาก username
export const findUsername = async (username:any) => {
      try {
        const result = await db.query("SELECT * FROM user WHERE username=?", [username]);
        return result;
      } catch (error) {
        return error;
      }
}

// 📌เพิ่มผู้ใช้ใหม่
export const addUser = async (username:any, fullname:any, email:any, role:any ) =>{
    try {
        const [result] = await db.query(
          "INSERT INTO user (username, fullname, email, role, createdate, modifydate) VALUES (?, ?, ?, ?, NOW(), NOW())",
          [username, fullname, email, role]
        );
        const insertId = (result as any).insertId; 
        return insertId;
      } catch (error) {
        return error;
      }
}


export async function POST(req: Request) {
  const { } = await req.json();


}
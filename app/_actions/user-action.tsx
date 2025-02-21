"use server"
import { db } from "@/lib/db";
const api_server = process.env.API_SERVER;


// 📌 ค้นหาผู้ใช้จาก username
export const findUsername = async (username: any) => {
  try {
    const [result] = await db.query("SELECT * FROM user WHERE username=?", [username]);
    return result;
  } catch (error) {
    return error;
  }
}
// 📌 ค้นหาผู้ใช้จาก username
export const xxgetUser = async (username: any) => {
  try {
    console.log("getuser ", username);
    const [result] = await db.query("SELECT * FROM user WHERE username=?", [username]);
    return result;
  } catch (error) {
    return error;
  }
}

// 📌เพิ่มผู้ใช้ใหม่
export const addUser = async (username: any, fullname: any, email: any, role: any) => {
  try {
    const [result] = await db.query(
      "INSERT INTO user (username, fullname, email, role, createdate, modifydate) VALUES (?, ?, ?, ?, NOW(), NOW())",
      [username, fullname, email, role]
    );
    const insertId = (result as any).insertId;
    return ({ id: insertId, message: "User created successfully" });
  } catch (error) {
    console.error("Error adding user:", error);
    return ({ error: "Error adding user " + error });
  }
}


// 📌 เรียกข้อมูล pagging 
export const getUser = async (page: any, limit: any, orderby: any) => {
  try {
    const res = await fetch(`${api_server}/user?page=${page}&limit=${limit}&orderby=${orderby}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${accesstoken}`,
      },
    });
    if (!res) return ({ message: "Failed to fetch users" });
    const data = await res.json();
    return data;

  } catch (error) {
    console.error("Error fetching users:", error);
  }
}


export const getByUsername = async (username: any) => {
  try {
    const res = await fetch(`${api_server}/user/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${accesstoken}`,
      },
    });
    if (!res) return ({ message: "Failed to fetch users" });
    const data = await res.json();
    return data;

  } catch (error) {
    console.error("Error fetching users:", error);
  }
}


export const deleteUser = async (id: any) => {
  const res = await fetch(`${api_server}/user/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${accesstoken}`,
    },
  });
  if (!res) return ({ message: "Failed to DELETE users" });
  const data = await res.json();
  console.log(data)
  return data;
}

export const insertUser = async (user: any) => {
  try {
    const res = await fetch(`${api_server}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${accesstoken}`,
      },
      body: JSON.stringify(user),
    });
    if (!res) return ({ message: "Failed to INSERT users" });
    const data = await res.json();
    return data;
  } catch (error) {
    return ({ message: "Failed to INSERT users" });
  }

}

export const updateUser = async (user: any) => {
  try {
    delete user.created_at;
    delete user.modified_at;
    const res = await fetch(`${api_server}/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${accesstoken}`,
      },
      body: JSON.stringify(user),
    });
    if (!res) return ({ message: "Failed to UPDATE users" });
    const data = await res.json();
    return data;
  } catch (error) {
    return ({ message: "Failed to UPDATE users" });
  }
}
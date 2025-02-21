import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";


// 📌 GET: ดึงรายการผู้ใช้แบบ Pagination
export async function GET(req: any) {
  const token = req.headers;
  console.log("xxxxxx=",token);

  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);
  const offset = (page - 1) * limit;
  try {
    const [users] = await db.query("SELECT * FROM user LIMIT ? OFFSET ?", [limit, offset]);
    //const [{ total }] = await db.query("SELECT COUNT(*) AS total FROM user");
    // ดึงจำนวนทั้งหมด
    const [countResult] = await db.query("SELECT COUNT(*) AS total FROM user");
    const total = (countResult as { total: number }[])[0].total;

    return NextResponse.json({ users, totalPages: Math.ceil(total / limit), totalUsers: total});
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Error fetching users" }, { status: 500 });
  }
}

// 📌 POST: เพิ่มผู้ใช้ใหม่
export async function POST(req: Request) {
  const { username, fullname, email, role } = await req.json();

  try {
    const [result] = await db.query(
      "INSERT INTO user (username, fullname, email, role, createdate, modifydate) VALUES (?, ?, ?, ?, NOW(), NOW())",
      [username, fullname, email, role]
    );
    const insertId = (result as any).insertId; 
    return NextResponse.json({ id: insertId, message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error adding user:", error);
    return NextResponse.json({ error: "Error adding user "+error }, { status: 500 });
  }
}

// 📌 PUT: แก้ไขข้อมูลผู้ใช้
export async function PUT(req: Request) {
  const { id, username, fullname, email, role } = await req.json();

  try {
    await db.query(
      "UPDATE user SET username = ?, fullname = ?, email = ?, role = ?, modifydate = NOW() WHERE id = ?",
      [username, fullname, email, role, id]
    );

    return NextResponse.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Error updating user" }, { status: 500 });
  }
}

// 📌 DELETE: ลบผู้ใช้
export async function DELETE(req: Request) {
  const { id } = await req.json();

  try {
    await db.query("DELETE FROM user WHERE id = ?", [id]);
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Error deleting user" }, { status: 500 });
  }
}




// import prisma from "@/lib/prisma";
// // ดึงข้อมูลผู้ใช้ทั้งหมด
// export async function GET() {
//   try {
//     const users = await prisma.user.findMany();
//     return NextResponse.json(users);
//   } catch (error) {
//     return NextResponse.json({ error: "เกิดข้อผิดพลาด" }, { status: 500 });
//   }
// }

// // เพิ่มผู้ใช้ใหม่
// export async function POST(req: NextRequest) {
//   try {
//     const { username, fullname, email, role } = await req.json();
//     const newUser = await prisma.user.create({
//       data: { username, fullname, email, role },
//     });
//     return NextResponse.json(newUser, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: "เพิ่มผู้ใช้ล้มเหลว" }, { status: 500 });
//   }
// }

// // อัปเดตข้อมูลผู้ใช้
// export async function PUT(req: NextRequest) {
//   try {
//     const { id, username, fullname, email, role } = await req.json();
//     const updatedUser = await prisma.user.update({
//       where: { id },
//       data: { username, fullname, email, role, modifydate: new Date() },
//     });
//     return NextResponse.json(updatedUser);
//   } catch (error) {
//     return NextResponse.json({ error: "อัปเดตผู้ใช้ล้มเหลว" }, { status: 500 });
//   }
// }

// // ลบผู้ใช้
// export async function DELETE(req: NextRequest) {
//   try {
//     const { id } = await req.json();
//     await prisma.user.delete({ where: { id } });
//     return NextResponse.json({ message: "ลบผู้ใช้สำเร็จ" });
//   } catch (error) {
//     return NextResponse.json({ error: "ลบผู้ใช้ล้มเหลว" }, { status: 500 });
//   }
// }

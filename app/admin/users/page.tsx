"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import UserDrawer from "@/components/drawer/user-drawer";
import { useToast } from "@/hooks/use-toast";
import UserItem from "@/components/item/user-item";
import { Input } from "@/components/ui/input";
import cookie from 'js-cookie'

import {
  LuSearch,
  LuRefreshCw,
  LuPlus
} from "react-icons/lu";

import Tooltip from '@/components/Tooltip';
import { deleteUser, getUser, insertUser, updateUser } from "@/app/_actions/user-action";

export default function UsersPage() {
  const accesstoken = cookie.get('token'); //console.log("UsersPage() token=", accesstoken);
  const { toast } = useToast();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [editingUser, setEditingUser] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [page]); // ✅ เรียก fetchUsers() ใหม่ทุกครั้งที่ page เปลี่ยน

  const fetchUsers = async () => {
    try {
      // const res = await fetch(`/api/users?page=${page}&limit=10`,{
      //   method:"GET",
      //   headers: { 
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${accesstoken}`,
      //    },
      // });
      // if (!res.ok) throw new Error("Failed to fetch users");

      // const data = await res.json();
      const users: any = await getUser(page, 10,"");
      console.log("users=", users)
      setUsers(users.items);
      setTotalPages(users.totalPages);
      setTotalUsers(users.totalItems);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSave = async (user: any) => {
    console.log("user : ", user);
    // const method = user.id ? "PUT" : "POST";
    // const res = await fetch("/api/users", {
    //   method,
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${accesstoken}`,
    //   },
    //   body: JSON.stringify(user),
    // });
    let result: any = null;
    console.log("user id=", user.id);
    setEditingUser(user);
    try {
      if (!user.id) {
        console.log("insert")
        //setEditingUser(null);
        result = await insertUser(user);
      } else {
        console.log("update")
        result = await updateUser(user);
      }
      console.log("result", result)
      if (result.affectedRows == 1) {
        fetchUsers();
        setIsDrawerOpen(false);
        //setEditingUser(null);
        toast({ title: "บันทึกข้อมูลสำเร็จ!", description: "ข้อมูลผู้ใช้ถูกอัปเดตเรียบร้อยแล้ว", duration: 2000 });
      } else {
        toast({ title: "บันทึกข้อมูลล้มเหลว", description: result.message, variant: "destructive", duration: 2000 });
      }
    } catch (error) {
      console.log("error", error);
      toast({ title: "บันทึกข้อมูลล้มเหลว", description:"เกิดข้อผิดพลาด", variant: "destructive", duration: 2000 });
    }
    // if (res.status == 500) {
    //   const response = await res.json();
    //   toast({ title: "บันทึกข้อมูลล้มเหลว", description: response.error, variant: "destructive", duration: 2000 });
    // }
    // if (res.ok) {
    //   console.log("res.ok=", res.ok);
    //   fetchUsers();
    //   setIsDrawerOpen(false);
    //   setEditingUser(null);
    //   toast({ title: "บันทึกข้อมูลสำเร็จ!", description: "ข้อมูลผู้ใช้ถูกอัปเดตเรียบร้อยแล้ว", duration: 2000 });
    // }
  };

  const openDeleteModal = (id: number) => {
    setSelectedUserId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    // if (!selectedUserId) return;
    // const res = await fetch("/api/users", {
    //   method: "DELETE",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ id: selectedUserId }),
    // });
    // // const res = await deleteUser({id:selectedUserId});
    // // console.log("res===",res);
    // if (res?.ok) {    }

    const result: any = await deleteUser(selectedUserId);
    console.log("result=", result);

    if (result.affectedRows == 1) {
      fetchUsers();
      toast({ title: "ลบผู้ใช้สำเร็จ", description: "ผู้ใช้ถูกลบออกจากระบบแล้ว" });
      setIsDeleteModalOpen(false);
      setSelectedUserId(null);
    }
  };

  return (

    <div className="content-wrapper mx-auto p-4">

      <div className="flex flex-col divide-y border rounded-sm ">
        <div className="flex justify-between p-4">

          <div className="flex w-full items-center gap-2">
            <div className="font-medium text-xl">
              ผู้ใช้งาน
            </div>
            <span className="h-fit inline-flex items-center bg-slate-100 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
              {/* <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span> */}
              {totalUsers} รายการ
            </span>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <Input
                type="text"
                placeholder="Search..."
                className="pl-10"
                size={80}
              />
            </div>

            <Tooltip content="เรียกข้อมูลใหม่" position="top"><Button onClick={fetchUsers} variant={"outline"} className="gap-1" ><LuRefreshCw /></Button></Tooltip>
            <Button onClick={() => { setEditingUser(null); setIsDrawerOpen(true); }} className="gap-1"><LuPlus />เพิ่มผู้ใช้</Button>

          </div>
        </div>
        <div className="">
          {users.map((user: any, index) => (
            <UserItem
              key={index}
              user={user}
              onEdit={() => { setEditingUser(user); setIsDrawerOpen(true); }}
              onDelete={() => openDeleteModal(user.id)}
            />
          ))}
        </div>
        <div className="p-4">
          {/* Pagination */}
          <div className="flex justify-between items-center">
            <Button disabled={page === 1} onClick={() => setPage(page - 1)} variant="outline">ก่อนหน้า</Button>
            <span>หน้า {page} / {totalPages}</span>
            <Button disabled={page === totalPages} onClick={() => setPage(page + 1)} variant="outline">ถัดไป</Button>
          </div>
        </div>
      </div>


      {/* <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>รายการผู้ใช้</CardTitle>
          <Button onClick={() => { setEditingUser(null); setIsDrawerOpen(true); }}>+ เพิ่มผู้ใช้</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.fullname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => { setEditingUser(user); setIsDrawerOpen(true); }}>
                      แก้ไข
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => openDeleteModal(user.id)}>
                      ลบ
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card> */}

      <UserDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        user={editingUser}
        onSave={handleSave}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

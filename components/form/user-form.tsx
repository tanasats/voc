"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { thaidate } from "@/lib/utils";

interface UserFormProps {
  user?: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export default function UserForm({ user, onSave, onCancel }: UserFormProps) {
  const initForm = {
    username: "",
    fullname: "",
    email: "",
    role: "user",
  }
  const [formData, setFormData] = useState(initForm);
  useEffect(() => {
    console.log("user=", user)
    if (user) {
      setFormData(user);
    } else {
      setFormData(initForm)
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //setFormData(initForm);
    onSave(formData);
  };

  return (

    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <Label>ชื่อผู้ใช้งาน</Label>
          <Input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
        </div>
        <div className="form-group">
          <Label>ชื่อ-สกุล</Label>
          <Input name="fullname" value={formData.fullname} onChange={handleChange} placeholder="Full Name" required />
        </div>
        <div className="form-group">
          <Label>email</Label>
          <Input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        </div>
        <div className="form-group">
          <Label>สิทธิการใช้งาน</Label>
          <Input name="role" value={formData.role} onChange={handleChange} placeholder="Role (admin/user)" required />
        </div>
        <div className="form-group flex justify-end space-x-2">
          <Button type="button" variant="ghost" onClick={onCancel}>ยกเลิก</Button>
          <Button type="submit">บันทึก</Button>
        </div>
      </form>
      <div className="text-sm italic font-thin">
        {user ? `วันที่ปรับปรุง : ${thaidate(user.modified_at)}` : ""}
      </div>
    </div>
  );
}

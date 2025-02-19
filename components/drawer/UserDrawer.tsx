import { useEffect } from "react";
import UserForm from "../form/user-form";

interface UserDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    user: any;
    onSave: (user: any) => void;
}

export default function UserDrawer({ isOpen, onClose, user, onSave }: UserDrawerProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        console.log("UserDrawer user=", user)
    }, [isOpen]);

    return (
        <div className={`fixed inset-0 z-50 bg-black/50 transition-opacity ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
            <div className={`fixed right-0 top-0 h-full w-96 bg-white shadow-lg transform transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-lg font-semibold">{user ? "แก้ไขผู้ใช้" : "เพิ่มผู้ใช้"}</h2>
                    <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>✕</button>
                </div>
                <div className="p-4">
                    <UserForm user={user} onSave={onSave} onCancel={onClose} />
                </div>
            </div>
        </div>
    );
}
import { Button } from "@/components/ui/button";
interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm }: DeleteConfirmModalProps) {
  if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">ยืนยันการลบ</h2>
            <p className="mt-2">คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้นี้? การกระทำนี้ไม่สามารถย้อนกลับได้</p>
            <div className="mt-4 flex justify-end space-x-2">
              <Button className="" onClick={onClose} variant={"ghost"}>ยกเลิก</Button>
              <Button className="" onClick={onConfirm} variant={"destructive"}>ลบ</Button>
            </div>
          </div>
        </div>
      );
    }
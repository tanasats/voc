"use client";
interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({ isOpen, onClose, onConfirm }: ConfirmModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold">ยืนยันการออกจากระบบ</h2>
        <p className="mt-2">คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ?</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>ยกเลิก</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={onConfirm}>ออกจากระบบ</button>
        </div>
      </div>
    </div>
  );
}

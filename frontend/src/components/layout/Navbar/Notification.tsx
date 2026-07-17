import { Bell } from "lucide-react";

export default function Notification() {
  return (
    <button className="rounded-lg p-2 hover:bg-gray-100 transition">
      <Bell size={20} />
    </button>
  );
}
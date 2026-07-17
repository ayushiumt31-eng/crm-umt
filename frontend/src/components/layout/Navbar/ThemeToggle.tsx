import { Moon } from "lucide-react";

export default function ThemeToggle() {
  return (
    <button className="rounded-lg p-2 hover:bg-gray-100 transition">
      <Moon size={20} />
    </button>
  );
}
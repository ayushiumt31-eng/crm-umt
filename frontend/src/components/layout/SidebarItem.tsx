import { NavLink } from "react-router-dom";
import { SidebarSubItem } from "../../types/sidebar";

interface SidebarItemProps {
  item: SidebarSubItem;
}

export default function SidebarItem({ item }: SidebarItemProps) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-all
        ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-gray-600 hover:bg-gray-100 hover:text-black"
        }`
      }
    >
      <Icon size={18} />
      <span>{item.title}</span>
    </NavLink>
  );
}
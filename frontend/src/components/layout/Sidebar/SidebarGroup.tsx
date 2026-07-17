import type { SidebarGroup as SidebarGroupType } from "@/types/sidebar";
import SidebarItem from "./SidebarItem";

interface SidebarGroupProps {
  group: SidebarGroupType;
}

export default function SidebarGroup({ group }: SidebarGroupProps) {
  return (
    <div className="mb-6">
      <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
        {group.title}
      </h3>

      <div className="space-y-1">
        {group.children.map((item) => (
          <SidebarItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
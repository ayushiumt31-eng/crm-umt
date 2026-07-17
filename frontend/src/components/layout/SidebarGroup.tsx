import { SidebarGroup as SidebarGroupType } from "../../types/sidebar";
import SidebarItem from "./SidebarItem";

interface Props {
  group: SidebarGroupType;
}

const SidebarGroup = ({ group }: Props) => {
  return (
    <div className="p-4">
      <h3 className="mb-2 text-xs font-semibold uppercase text-gray-500">
        {group.title}
      </h3>

      <div className="space-y-1">
        {group.children.map((item) => (
          <SidebarItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default SidebarGroup;
import { sidebarMenu } from "../../../constants/sidebarMenu";
import SidebarGroup from "./SidebarGroup";

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-white border-r">
      {sidebarMenu.map((group) => (
        <SidebarGroup key={group.id} group={group} />
      ))}
    </aside>
  );
};

export default Sidebar;
import SidebarLogo from "./SidebarLogo";
import SidebarGroup from "./SidebarGroup";
import { sidebarMenu } from "@/constants/sidebarMenu";
import SidebarProfile from "./SidebarProfile";

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-white">
      <SidebarLogo />

      

        <div className="flex-1 overflow-y-auto p-4">
          {sidebarMenu.map((group) => (
            <SidebarGroup key={group.id} group={group} />
          ))}
        </div>

        <SidebarProfile />
      
    </aside>
  );
}
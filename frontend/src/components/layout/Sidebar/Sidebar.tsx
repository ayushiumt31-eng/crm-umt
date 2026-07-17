import SidebarLogo from "./SidebarLogo";

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      <SidebarLogo />

      <div className="flex-1 p-4">
        Sidebar Menu
      </div>
    </aside>
  );
}
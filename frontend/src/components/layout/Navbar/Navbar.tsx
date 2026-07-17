import SearchBar from "./SearchBar";
import Notification from "./Notification";
import ThemeToggle from "./ThemeToggle";
import UserDropdown from "./UserDropdown";

export default function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <h1 className="text-2xl font-bold">
        Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <SearchBar />
        <Notification />
        <ThemeToggle />
        <UserDropdown />
      </div>
    </header>
  );
}
import { Link } from "react-router-dom";

const SidebarLogo = () => {
  return (
    <div className="border-b border-gray-200 px-6 py-5">
      <Link to="/dashboard" className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-lg font-bold text-white">
          C
        </div>

        <div>
          <h1 className="text-lg font-bold text-gray-800">
            CRM
          </h1>

          <p className="text-xs text-gray-500">
            Management System
          </p>
        </div>
      </Link>
    </div>
  );
};

export default SidebarLogo;
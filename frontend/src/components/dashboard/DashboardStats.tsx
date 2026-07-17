import {
  Users,
  UserRound,
  IndianRupee,
  ClipboardList,
} from "lucide-react";

import StatsCard from "./StatsCard";

export default function DashboardStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Customers"
        value="1,245"
        icon={Users}
        change="+12% this month"
      />

      <StatsCard
        title="Employees"
        value="120"
        icon={UserRound}
        change="+5 New"
      />

      <StatsCard
        title="Revenue"
        value="₹25.4L"
        icon={IndianRupee}
        change="+18%"
      />

      <StatsCard
        title="Pending Tasks"
        value="18"
        icon={ClipboardList}
        change="4 Urgent"
      />
    </div>
  );
}
import DashboardStats from "@/components/dashboard/DashboardStats";
import RevenueChart from "@/components/dashboard/RevenueChart";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <DashboardStats />
      <RevenueChart />
    </div>
  );
}


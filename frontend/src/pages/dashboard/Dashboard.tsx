import DashboardStats from "@/components/dashboard/DashboardStats";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentCustomers from "@/components/dashboard/RecentCustomers";
import RevenueChart from "@/components/dashboard/RevenueChart";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <DashboardStats />
      <RevenueChart />
      <QuickActions />
      <RecentCustomers />
    </div>
  );
}


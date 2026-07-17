import { DollarSign, Users, ShoppingCart, TrendingUp } from "lucide-react";
import StatsCard from "./StatsCard";

const stats = [
  { title: "Total Revenue", value: "$24,500", change: "+12.5%", icon: DollarSign },
  { title: "Active Customers", value: "1,284", change: "+8.2%", icon: Users },
  { title: "Open Orders", value: "96", change: "-3.1%", icon: ShoppingCart },
  { title: "Avg. Conversion", value: "4.8%", change: "+1.4%", icon: TrendingUp },
];

export default function StatsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}

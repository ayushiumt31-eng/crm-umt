import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
}

export default function StatsCard({
  title,
  value,
  change,
  icon: Icon,
}: Props) {
  return (
    <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>

          <h2 className="mt-2 text-4xl font-bold">
            {value}
          </h2>

          <p className="mt-2 text-sm text-green-600">
            {change}
          </p>
        </div>

        <div className="rounded-xl bg-blue-100 p-4">
          <Icon className="h-8 w-8 text-blue-600" />
        </div>
      </CardContent>
    </Card>
  );
}
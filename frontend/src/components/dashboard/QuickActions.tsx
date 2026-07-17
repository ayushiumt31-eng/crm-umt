import { Button } from "@/components/ui/button";
import {
  UserPlus,
  Users,
  FileText,
  Mail,
} from "lucide-react";

export default function QuickActions() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">
        Quick Actions
      </h2>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Button className="justify-start gap-2">
          <UserPlus className="h-5 w-5" />
          Add Customer
        </Button>

        <Button className="justify-start gap-2">
          <Users className="h-5 w-5" />
          Add Employee
        </Button>

        <Button className="justify-start gap-2">
          <FileText className="h-5 w-5" />
          Create Invoice
        </Button>

        <Button className="justify-start gap-2">
          <Mail className="h-5 w-5" />
          Send Email
        </Button>
      </div>
    </div>
  );
}
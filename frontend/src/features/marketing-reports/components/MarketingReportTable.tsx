import { DataTable } from "@/components/common/DataTable";
import type { TableColumn } from "@/components/common/DataTable";

interface MarketingReportTableProps<T extends { id: string }> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
}

export function MarketingReportTable<T extends { id: string }>({
  columns,
  data,
  loading,
}: MarketingReportTableProps<T>) {
  return <DataTable columns={columns} data={data} loading={loading} showActions={false} />;
}

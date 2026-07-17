export default function SalesChart() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Sales Activity</h3>
        <span className="text-sm text-gray-500">This week</span>
      </div>
      <div className="flex h-48 items-end gap-3">
        {[30, 50, 42, 70, 60, 82].map((height, index) => (
          <div key={index} className="flex-1 rounded-t-lg bg-emerald-500" style={{ height: `${height}%` }} />
        ))}
      </div>
    </div>
  );
}

export default function QuickActions() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
      <div className="mt-4 flex flex-wrap gap-3">
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white">Add Customer</button>
        <button className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">New Invoice</button>
        <button className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">View Reports</button>
      </div>
    </div>
  );
}

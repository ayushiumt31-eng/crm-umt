const customers = [
  { name: "Ava Patel", email: "ava@company.com", status: "Active" },
  { name: "Liam Chen", email: "liam@company.com", status: "Pending" },
  { name: "Mina Ali", email: "mina@company.com", status: "Active" },
];

export default function RecentCustomers() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">Recent Customers</h3>
      <div className="mt-4 space-y-3">
        {customers.map((customer) => (
          <div key={customer.email} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-3">
            <div>
              <p className="font-medium text-gray-800">{customer.name}</p>
              <p className="text-sm text-gray-500">{customer.email}</p>
            </div>
            <span className="text-sm text-gray-600">{customer.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const activities = [
  { title: "New lead assigned", time: "10 min ago" },
  { title: "Payment received", time: "1 hour ago" },
  { title: "Invoice approved", time: "3 hours ago" },
];

export default function RecentActivity() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
      <ul className="mt-4 space-y-3">
        {activities.map((activity) => (
          <li key={activity.title} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-3">
            <span className="text-sm text-gray-700">{activity.title}</span>
            <span className="text-sm text-gray-500">{activity.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Customers from "../pages/customers/Customers";
import Employees from "../pages/employees/Employees";
import Payroll from "../pages/payroll/Payroll";
import Sales from "../pages/sales/Sales";
import Marketing from "../pages/marketing/Marketing";
import Reports from "../pages/reports/Reports";
import Settings from "../pages/settings/Settings";

import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
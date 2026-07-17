import React from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import Login from '../pages/auth/Login'
import Dashboard from '../pages/dashboard/Dashboard'
import Customers from '../pages/customers/Customers'
import Employees from '../pages/employees/Employees'
import Payroll from '../pages/payroll/Payroll'
import Sales from '../pages/sales/Sales'
import Marketing from '../pages/marketing/Marketing'
import Reports from '../pages/reports/Reports'
import Settings from '../pages/settings/Settings'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout><Outlet /></AuthLayout>}>
            <Route path="/login" element={<Login />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
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
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes

import React from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import Login from '../pages/auth/Login'
import Dashboard from '../pages/dashboard/Dashboard'
import Customers from '../pages/customers/Customers'
import AddCustomer from '../pages/customers/AddCustomer'
import EditCustomer from '../pages/customers/EditCustomer'
import ViewCustomer from '../pages/customers/ViewCustomer'
import { EmployeeList, AddEmployee, EditEmployee, ViewEmployee } from '../features/employees/pages'
import { LeadsList, AddLead, EditLead, ViewLead } from '../features/leads/pages'
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
            <Route path="/customers/add" element={<AddCustomer />} />
            <Route path="/customers/:id" element={<ViewCustomer />} />
            <Route path="/customers/:id/edit" element={<EditCustomer />} />
            
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/employees/add" element={<AddEmployee />} />
            <Route path="/employees/:id" element={<ViewEmployee />} />
            <Route path="/employees/:id/edit" element={<EditEmployee />} />
            
            <Route path="/leads" element={<LeadsList />} />
            <Route path="/leads/add" element={<AddLead />} />
            <Route path="/leads/:id" element={<ViewLead />} />
            <Route path="/leads/:id/edit" element={<EditLead />} />
            
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

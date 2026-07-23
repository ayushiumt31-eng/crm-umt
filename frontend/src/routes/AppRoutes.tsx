import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

// import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import {
  Customers,
  AddCustomer,
  EditCustomer,
} from "../features/customers/pages";

import {
  Employees,
  AddEmployee,
  EditEmployee,
  ViewEmployee,
} from "../features/employees/pages";

import PublicRoute from "./PublicRoute";

import {
  AddLead,
  EditLead,
  Lead,
  LeadDetails,
} from "@/features/lead/pages";

import CustomerDetails from "@/features/customers/pages/CustomerDetails";
import Dashboard from "@/pages/dashboard/Dashboard";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          {/* <Route element={<AuthLayout />}>
            <Route path="/login" element={<div>Login</div>} />
          </Route> */}
        </Route>

        {/* Protected / Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Customers */}
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/add" element={<AddCustomer />} />
          <Route path="/customers/:id" element={<CustomerDetails />} />
          <Route path="/customers/:id/edit" element={<EditCustomer />} />

          {/* Leads */}
          <Route path="/lead" element={<Lead/>} />
          <Route path="/lead/add" element={<AddLead />} />
          <Route path="/lead/:id" element={<LeadDetails />} />
          <Route path="/lead/:id/edit" element={<EditLead />} />

          {/* Employees */}
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/add" element={<AddEmployee />} />
          <Route path="/employees/:id" element={<ViewEmployee />} />
          <Route path="/employees/:id/edit" element={<EditEmployee />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
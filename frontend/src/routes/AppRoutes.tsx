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
import AddEmployee from "@/features/employees/pages/AddEmployee";
import RolesPermissions from "@/features/roles-permissions/pages/Roles";
import AddRole from "@/features/roles-permissions/pages/AddRole";
import EditRole from "@/features/roles-permissions/pages/EditRole";
import { ViewRoles } from "@/features/roles-permissions/pages/RoleDetails";
// import RolesPermissions from "@/features/roles-permissions/pages/Roles";

import { Deals, AddDeal, EditDeal, DealDetails } from "@/features/deals/pages";
import { Sales, AddSale, EditSale, SaleDetails } from "@/features/sales/pages";
import {
  Activities,
  AddActivity,
  EditActivity,
  ActivityDetails,
} from "@/features/activities/pages";

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

          {/* Deals */}
          <Route path="/deals" element={<Deals />} />
          <Route path="/deals/add" element={<AddDeal />} />
          <Route path="/deals/:id" element={<DealDetails />} />
          <Route path="/deals/:id/edit" element={<EditDeal />} />

          {/* Sales */}
          <Route path="/sales" element={<Sales />} />
          <Route path="/sales/add" element={<AddSale />} />
          <Route path="/sales/:id" element={<SaleDetails />} />
          <Route path="/sales/:id/edit" element={<EditSale />} />

          {/* Activities / Tasks */}
          <Route path="/activities" element={<Activities />} />
          <Route path="/activities/add" element={<AddActivity />} />
          <Route path="/activities/:id" element={<ActivityDetails />} />
          <Route path="/activities/:id/edit" element={<EditActivity />} />

          {/* Employees */}
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/add" element={<AddEmployee />} />
          <Route path="/employees/:id" element={<ViewEmployee />} />
          <Route path="/employees/:id/edit" element={<EditEmployee />} />

          {/* roles &permission */}
          <Route path="/roles-permissions" element={<RolesPermissions />} />
          <Route path="/roles-permissions/add" element={<AddRole />} />
          <Route path="/roles-permissions/:id" element={<ViewRoles />} />
          <Route path="/roles-permissions/:id/edit" element={<EditRole />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
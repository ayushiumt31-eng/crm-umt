import React from 'react'
import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-layout__body">
        <Sidebar />
        <main className="dashboard-layout__main">{children}</main>
      </div>
      <Footer />
    </div>
  )
}

export default DashboardLayout

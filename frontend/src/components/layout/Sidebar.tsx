import React from 'react'

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <ul className="sidebar__menu">
        <li><a href="#dashboard">Dashboard</a></li>
        <li><a href="#customers">Customers</a></li>
        <li><a href="#employees">Employees</a></li>
        <li><a href="#reports">Reports</a></li>
      </ul>
    </aside>
  )
}

export default Sidebar

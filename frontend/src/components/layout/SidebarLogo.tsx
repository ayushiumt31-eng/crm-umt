import React from 'react'

const SidebarLogo: React.FC = () => {
  return (
    <div className="sidebar-logo">
      <a href="/" className="sidebar-logo__link">
        <span className="sidebar-logo__icon">CRM</span>
        <span className="sidebar-logo__text">Dashboard</span>
      </a>
    </div>
  )
}

export default SidebarLogo

import React from 'react'

const SidebarProfile: React.FC = () => {
  return (
    <div className="sidebar-profile">
      <div className="sidebar-profile__avatar">U</div>
      <div className="sidebar-profile__info">
        <p className="sidebar-profile__name">User Name</p>
        <p className="sidebar-profile__role">Admin</p>
      </div>
    </div>
  )
}

export default SidebarProfile

import React from 'react'
import sidebarMenu from '../../constants/sidebarMenu'
import SidebarGroup from './SidebarGroup'

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <SidebarGroup title="Menu" items={sidebarMenu} />
    </aside>
  )
}

export default Sidebar

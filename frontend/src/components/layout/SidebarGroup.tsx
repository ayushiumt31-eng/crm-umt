import React from 'react'
import SidebarItem from './SidebarItem'
import { SidebarItem as SidebarItemType } from '../../types/sidebar'

interface Props {
  title: string
  items: SidebarItemType[]
}

const SidebarGroup: React.FC<Props> = ({ title, items }) => {
  return (
    <div className="sidebar-group">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <SidebarItem key={item.path} item={item} />
        ))}
      </ul>
    </div>
  )
}

export default SidebarGroup

import React from 'react'

const Navbar: React.FC = () => {
  return (
    <header className="navbar">
      <div className="navbar__brand">CRM Dashboard</div>
      <nav className="navbar__nav">
        <a href="#">Home</a>
        <a href="#">Support</a>
        <a href="#">Profile</a>
      </nav>
    </header>
  )
}

export default Navbar

import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {FaUser, FaHome, FaEnvelope} from 'react-icons/fa'

function Navbar() {

  const location = useLocation()

  return (
    <div className='navbar'>
      <div className="navbarItems">
        <Link to='/'>
          <div className={`navItem ${location.pathname === '/' && 'navItemActive'}`}>
              <FaHome size={25} />
              <p className="navItemText">الرئيسية</p>
          </div>
        </Link>
        <Link to='/notifications'>
          <div className={`navItem ${location.pathname === '/notifications' && 'navItemActive'}`}>
            <FaEnvelope size={25}/>
            <p className="navItemText">الدعوات</p>
          </div>
        </Link>
        <Link to='/profile'>
          <div className={`navItem ${location.pathname === '/profile' && 'navItemActive'}`}>
            <FaUser size={25} />
            <p className="navItemText">شخصي</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
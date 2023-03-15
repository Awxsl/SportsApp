import React from 'react'
import {FaUser, FaHome, FaEnvelope} from 'react-icons/fa'

function Navbar() {
  return (
    <div className='navbar'>
      <div className="navbarItems">
        <div className="navItem">
            <FaHome size={25} />
            <p className="navItemText">الرئيسية</p>
        </div>
        <div className="navItem">
          <FaEnvelope size={25}/>
          <p className="navItemText">الدعوات</p>
        </div>
        <div className="navItem navItemActive">
          <FaUser size={25} />
          <p className="navItemText">شخصي</p>
        </div>
      </div>
    </div>
  )
}

export default Navbar
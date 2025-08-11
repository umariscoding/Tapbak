import React from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'

function PrimaryLayout({children, showNavbar = true}) {
  const location = useLocation();
  
  const hideNavbarRoutes = ['/signup', '/login', '/forgot-password'];
  const shouldShowNavbar = showNavbar && !hideNavbarRoutes.includes(location.pathname);
  
  return (
    <div className='flex w-full flex-col border gap-2'>
        {shouldShowNavbar && <Navbar />}
        <div className='flex w-full'>
            <Sidebar />
            <div className='flex-1'>
                {children}
            </div>
        </div>
    </div>
  )
}

export default PrimaryLayout
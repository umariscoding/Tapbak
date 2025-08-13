import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'
import { initializeAuth } from '../states/app'
import { useUser } from '../states/contexts/User'

function PrimaryLayout({children, showNavbar = true, showSidebar = true}) {

  const location = useLocation();
  const { setUser } = useUser();
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);
  useEffect(() => {
    if (!isAuthInitialized) {
      const user = initializeAuth();
      if (user) {
        setUser(user);
      }
      setIsAuthInitialized(true);
    }
  }, []);
  
  // Hide navbar on specific routes
  const hideNavbarRoutes = ['/signup', '/login', '/forgot-password'];
  const shouldShowNavbar = showNavbar && !hideNavbarRoutes.includes(location.pathname);
  
  // Hide sidebar on specific routes or when showSidebar is false
  const hideSidebarRoutes = ['/join', '/signup', '/login', '/forgot-password'];
  const shouldShowSidebar = showSidebar && !hideSidebarRoutes.some(route => location.pathname.startsWith(route));
  
  return (
    <div className='flex w-full flex-col border gap-2'>
       {isAuthInitialized && shouldShowNavbar && <Navbar />}
      {isAuthInitialized && <div className='flex w-full'>
           {shouldShowSidebar && <Sidebar />}
           <div className='flex-1'>
               {children}
           </div>
       </div>}
    </div>
  )
}

export default PrimaryLayout
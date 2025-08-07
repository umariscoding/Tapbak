import React from 'react'
import Sidebar from '../Components/Sidebar'

function PrimaryLayout({children}) {
  return (
    <div className='flex w-full border gap-2'>
        <div className='w-full'>
            {children}
        </div>
    </div>
  )
}

export default PrimaryLayout
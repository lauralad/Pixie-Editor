
import MobileNav from '@/components/shared/MobileNav'
import Sidebar from '@/components/shared/Sidebar'
import React from 'react'

// more complex layout for the main app
const Layout = ({children}: { children: React.ReactNode}) => {
  return (
    <main className='root'>
        <Sidebar />
        {/* sidebar disappears on mobile view */}
        <MobileNav />

        <div className='root-container'>
            <div className='wrapper'>
                {children}
            </div>
        </div>
    </main>
  )
}

export default Layout


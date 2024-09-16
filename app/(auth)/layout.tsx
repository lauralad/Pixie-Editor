import React from 'react'

// empty layout for authentication page
const Layout = ({children}: { children: React.ReactNode}) => {
  return (
    <main className='auth'>{children}</main>
  )
}

export default Layout


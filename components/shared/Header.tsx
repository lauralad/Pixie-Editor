import React from 'react'

//subtitle?: means it's optional input
const Header = ({title, subtitle}: {title: string, subtitle?:string}) => {
  return (
    //wrap it in a react fragment
    <>
        <h2 className='h2-bold text-dark-600'>{title}</h2>
        {/* only if there is a subtitle then render it */}
        {subtitle && <p className='p-16-regular mt-4'>{subtitle}</p>}
    </>
  )
}

export default Header
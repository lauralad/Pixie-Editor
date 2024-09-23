/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Collection } from '@/components/shared/Collection'
import { navLinks } from '@/constants'
import { getAllImages } from '@/lib/actions/image.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

//home page using the root layout
const Home = async ({searchParams}:SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';
  //fetch all imgs created so far and pass them on to the Collection
  const images = await getAllImages({page, searchQuery});

  return (
    <>
      {/* Banner */}
      <section className='home'>
        <h1 className='home-heading'>
          {/* Only visible on desktop or large devices */}
          Do your own magic with Pixie Editor
        </h1>

        <ul className='flex-center w-full gap-20'>
          {navLinks.slice(1,5).map((link)=>(
            <Link
              key={link.route}
              href={link.route}
              className='flex-center gap-2 flex-col'
            >
                <li>
                    {/* <img src={link.icon} alt={link.label} /> */}
                    <Image 
                      src={link.icon}
                      alt='image'
                      width={24}
                      height={24}
                      className='flex-center w-fit rounded-full bg-white p-4'

                    />
                </li>
                <p className='text-center text-white p-14-medium'>{link.label}</p>
            </Link> 
          ))}

        </ul>
      </section>

      <section className='sm:mt-12'>
          <Collection 
            hasSearch={true}
            images={images?.data}
            totalPages={images?.totalPages}
            page={page}

          />
      </section> 
    </>
  )
}

export default Home
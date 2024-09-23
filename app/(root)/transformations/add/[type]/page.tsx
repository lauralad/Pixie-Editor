import Header from '@/components/shared/Header'
import React from 'react'
import { transformationTypes } from '@/constants'
import TransformationForm from '@/components/shared/TransformationForm';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { get } from 'http';
import { getUserById } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
// create diffrent types of image tranformations

const AddTransformationTypePage = async ({params: {type}}: SearchParamProps) => {
  const {userId} = auth();
  // need our id _id not the clerkId from clerk
  const transformation = transformationTypes[type];
  if (!userId) {
    redirect('/sign-in');
  }
  const user = await getUserById(userId);
  
  return (
    <>
      <Header 
        title={transformation.title}
        subtitle={transformation.subTitle}
      />

      <section className='mt-10'>
        <TransformationForm 
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
      
    </>
    
  )
}

export default AddTransformationTypePage
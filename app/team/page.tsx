import Footer from '@/src/components/Footer'
import Header from '@/src/components/Header'
import Members from '@/src/components/Members'
import React from 'react'

function page() {
  return (
    <>
    <Header/>
    <Members/>
    <div className='pt-10 dark:bg-gray-800 bg-gray-100'>

    </div>
    <Footer/>
    </>
  )
}

export default page
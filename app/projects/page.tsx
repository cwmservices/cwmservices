import Footer from '@/src/components/Footer'
import Header from '@/src/components/Header'
import Projects from '@/src/components/Projects'
import React from 'react'

function page() {
  return (
    <>
    <Header/>
    <Projects/>
    <div className='pt-10 bg-gray-100 dark:bg-gray-800'></div>
    <Footer/>
    </>
  )
}

export default page
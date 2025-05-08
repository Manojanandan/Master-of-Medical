import React from 'react'
import Navbar from '../../components/e_commerceComponents/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './homePage/Footer'

const Index = () => {
  return (
    <div>
       <Navbar />
       <div style={{width:'100%',marginTop:'8.5%'}}>
            <Outlet />
       </div>
       <Footer />
    </div>
  )
}

export default Index
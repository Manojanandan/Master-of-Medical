import React from 'react'
import Checkout from './Checkout'
import BreadCrumbs from '../../../components/e_commerceComponents/BreadCrumbs'

const index = () => {
  return (
    <div style={{height:'100%',width:'100%'}}>
        <BreadCrumbs title={"Checkout"} />
        <Checkout />
    </div>
  )
}

export default index
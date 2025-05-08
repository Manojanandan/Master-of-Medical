import React from 'react'
import CartList from './CartList'
import BreadCrumbs from '../../../components/e_commerceComponents/BreadCrumbs'

const index = () => {
  return (
    <div style={{ height: 'auto', width: '100%' }}>
      <BreadCrumbs title={"Cart"} />
      <CartList />
    </div>
  )
}

export default index
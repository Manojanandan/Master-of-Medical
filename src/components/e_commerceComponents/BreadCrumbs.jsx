import React from 'react'
import { Breadcrumbs, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const BreadCrumbs = ({ title }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb" separator="›" sx={{ padding: '0 0 2% ' }}>
      <Link underline="hover" color="inherit" to="/customer">
        Home
      </Link>
      <Typography sx={{ color: 'text.primary' }}>{title}</Typography>
    </Breadcrumbs>
  )
}

export default BreadCrumbs
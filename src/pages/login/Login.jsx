import { Box, Button, Checkbox, Container, FormControlLabel, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
  return (
    <React.Fragment>

        <Box sx={{width: '40%',height:'400px',border: 'solid 1.5px #d1cbcb',textAlign:'center',margin:'10% auto',borderRadius:'15px',backgroundColor:'#d8d1d136'}}>
            <Typography variant='h4' sx={{margin:'10% 0 0%'}}>Log in or Sign up</Typography>
            <Typography variant='p' sx={{fontSize:'13px'}}>Use your email or other service to continue with us</Typography><br /><br /><br />
            <Button variant='outlined' sx={{border:'solid 1.5px #c5225f',fontSize:'17px',padding:'1% 8%',textTransform: 'capitalize',borderRadius:'30px',color:"#c5225f",fontWeight:'bold'}} onClick={()=>navigate('/signup?type=user')}>Log In As User</Button><br /><br/>
            <Button variant='outlined' sx={{border:'solid 1.5px #c5225f',fontSize:'17px',padding:'1% 8%',textTransform: 'capitalize',borderRadius:'30px',color:"#c5225f",fontWeight:'bold'}} onClick={()=>navigate('/signup?type=vendor')}>Log In As Vendor</Button>
        </Box>
       
    </React.Fragment>
  )
}

export default Login
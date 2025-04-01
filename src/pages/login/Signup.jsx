import React from 'react'
import { Box, Button, Checkbox, Container, FormControlLabel, Stack, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'


const Signup = () => {
    const navigate = useNavigate()
  return (
    <React.Fragment>
         <Box sx={{height:'100%',width:'100%'}}>
            <Container maxWidth="md" sx={{border:'solid 1.5px #d1cbcb',height:'auto',margin:'2% auto',backgroundColor:'#d8d1d136',borderRadius:'15px'}}>
                <Stack direction='column'>
                    <Typography variant='h4' sx={{margin:'2% auto'}}>Welcome to User</Typography>
                    <Typography variant='p' sx={{fontSize:'13px',margin:'0 auto'}}>Already have an account <Link to='/loginform' style={{fontWeight:'bold',fontSize:'16px'}}> Log in ?</Link></Typography>
                </Stack>
                <Stack direction='column' sx={{ width:700, maxWidth: '100%',margin:'5% 7% 0' }} spacing={1}>
                    <Typography sx={{fontSize:'16px',fontWeight:'bold'}}>Email</Typography>
                    <TextField fullWidth  id="email" /><br />
                    <Typography sx={{fontSize:'16px',fontWeight:'bold'}}>User Name</Typography>
                    <TextField fullWidth  id="userName" /><br />
                    <Typography sx={{fontSize:'16px',fontWeight:'bold'}}>Password</Typography>
                    <TextField fullWidth  id="password" /><br />
                </Stack>
                <Stack direction='column'>
                    <FormControlLabel control={<Checkbox />} label="i want to receive emails about the product, feature updates,events, and marketing promotions." sx={{margin: '2% 6% 0',fontSize:'10px',color:'#837c7c'}} />
                    <Typography variant='p' sx={{fontSize:'12px',margin:'3% 7%'}}>By creating an account, you agree to the <Link to='/'>Terms of use</Link> and <Link to='/'>Privacy Policy.</Link> </Typography>
                </Stack>
                <Stack direction='column'>
                    <Button onClick={()=>navigate('/details')} variant='contained' sx={{width:'700px',margin:'2% auto 4%',borderRadius:'15px',textTransform:'capitalize',padding:'1%',fontSize:'16px',fontWeight:'bold'}}>Create an account</Button>
                </Stack>
            </Container>
        </Box>
    </React.Fragment>
  )
}

export default Signup
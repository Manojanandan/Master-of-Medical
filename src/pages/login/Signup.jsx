import React from 'react'
import { Box, Button, Checkbox, FormControlLabel, Stack, TextField, Typography } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import GoogleIcon from '@mui/icons-material/Google';

const Signup = () => {
    const navigate = useNavigate()
     const useQuery = new URLSearchParams(useLocation().search)
     const type = useQuery.get("type")
  return (
    <React.Fragment>
         <Box sx={{height:'100%',width:'100%'}}>
            <Box sx={{width:'55%',border:'solid 1.5px #d1cbcb',height:'auto',margin:'2% auto',backgroundColor:'#d8d1d136',borderRadius:'15px'}}>
                <Stack direction='column'>
                    <Typography variant='h4' sx={{margin:'2% auto'}}>Welcome to User</Typography>
                    <Typography variant='p' sx={{fontSize:'13px',margin:'0 auto'}}>Already have an account <Link to='/loginform' style={{fontWeight:'bold',fontSize:'16px'}}> Log in ?</Link></Typography>
                </Stack>
                <Stack direction='column' sx={{ width:'85%', maxWidth: '100%',margin:'5% 7% 0' }} spacing={1}>
                    <Typography sx={{fontSize:'16px',fontWeight:'bold'}}>Email</Typography>
                    <TextField fullWidth  id="email" size="small" /><br />
                    <Typography sx={{fontSize:'16px',fontWeight:'bold'}}>User Name</Typography>
                    <TextField fullWidth  id="userName" size="small" /><br />
                    <Typography sx={{fontSize:'16px',fontWeight:'bold'}}>Password</Typography>
                    <TextField fullWidth  id="password" size="small" /><br />
                </Stack>
                <Stack direction='column'>
                    <FormControlLabel control={<Checkbox />} label="i want to receive emails about the product, feature updates,events, and marketing promotions." sx={{margin: '2% 6% 0',fontSize:'10px',color:'#837c7c'}} />
                    <Typography variant='p' sx={{fontSize:'12px',margin:'3% 7%'}}>By creating an account, you agree to the <Link to='/'>Terms of use</Link> and <Link to='/'>Privacy Policy.</Link> </Typography>
                </Stack>
                <Stack direction='column'>
                    <Button onClick={()=>navigate(`/details?type=${type}`)} variant='outlined' sx={{width:'85%',margin:'2% auto 0%',borderRadius:'15px',textTransform:'capitalize',padding:'1%',fontSize:'16px',fontWeight:'bold'}}>Create an account</Button>
                    <Button startIcon={<GoogleIcon />} variant='contained' sx={{width:'85%',margin:'2% auto 4%',borderRadius:'15px',textTransform:'capitalize',padding:'1%',fontSize:'16px',fontWeight:'bold'}}>Sign in with google</Button>
                </Stack>
            </Box>
        </Box>
    </React.Fragment>
  )
}

export default Signup
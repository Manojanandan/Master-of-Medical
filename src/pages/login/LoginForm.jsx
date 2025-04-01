import React from 'react'
import { Box, Button, Checkbox, Container, FormControlLabel, Stack, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'


const LoginForm = () => {
    const navigate = useNavigate()
    return (
        <React.Fragment>
            <Box sx={{ height: '100%', width: '100%' }}>
                <Container maxWidth="md" sx={{ border: 'solid 1.5px #d1cbcb', height: 'auto', margin: '7% auto', backgroundColor: '#d8d1d136', borderRadius: '15px' }}>
                    <Stack direction='column'>
                        <Typography variant='h4' sx={{ margin: '2% auto' }}>Welcome to Login</Typography>
                        <Typography variant='p' sx={{ fontSize: '13px', margin: '0 auto' }}>Create a new account <Link to='/signup' style={{ fontWeight: 'bold', fontSize: '16px' }}> Sign up ?</Link></Typography>
                    </Stack>
                    <Stack direction='column' sx={{ width: 700, maxWidth: '100%', margin: '5% 7% 0' }} spacing={1}>
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>User Name</Typography>
                        <TextField fullWidth id="userName" /><br />
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>Password</Typography>
                        <TextField fullWidth id="password" /><br />
                    </Stack>
                    <Stack direction='column' sx={{margin:'0 7%',fontWeight:'bold'}}>
                        <Link to=''>Forgot password</Link>
                    </Stack>
                    <Stack direction='column'>
                        <Button onClick={()=>navigate('/details')} variant='contained' sx={{ width: '200px', margin: '2% auto 4%', borderRadius: '15px', textTransform: 'capitalize', padding: '1%', fontSize: '16px', fontWeight: 'bold' }}>Login</Button>
                    </Stack>
                </Container>
            </Box>
        </React.Fragment>
    )
}

export default LoginForm
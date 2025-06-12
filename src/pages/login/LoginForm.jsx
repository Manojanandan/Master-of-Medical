import React from 'react'
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, Stack, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'


const LoginForm = () => {
    const navigate = useNavigate()
    return (
        <React.Fragment>
            <Box sx={{ height: '100%', width: '100%' }}>
                <Box sx={{ border: 'solid 1.5px #d1cbcb', height: 'auto', margin: '7% auto', backgroundColor: '#d8d1d136', borderRadius: '15px', width: '40%' }}>
                    <Grid container spacing={2}>
                        <Grid item size={6} sx={{ margin: '2% auto' }}>
                            <Typography variant='h4' >Welcome to Login</Typography>
                            <Typography variant='p' sx={{ fontSize: '13px', marginLeft: '12%' }}>Create a new account <Link to='/signup' style={{ fontWeight: 'bold', fontSize: '16px' }}> Sign up ?</Link></Typography>
                        </Grid>
                        <Grid item size={12} sx={{ margin: '5% 7% 0' }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>User Name</Typography>
                            <TextField fullWidth id="userName" size="small" />
                        </Grid>
                        <Grid item size={12} sx={{ margin: '1% 7% 0' }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>Password</Typography>
                            <TextField fullWidth id="password" size="small" />
                        </Grid>
                        <Grid item size={12} sx={{ margin: '0 7%', fontWeight: 'bold' }}>
                            <Link to=''>Forgot password</Link>
                        </Grid>

                    </Grid>
                    <Button onClick={() => navigate('/details')} variant='contained' sx={{ borderRadius: '15px', textTransform: 'capitalize', fontSize: '16px', fontWeight: 'bold', padding: '1% 8%',margin:'5% 37%' }}>Login</Button>

                </Box>
            </Box>
        </React.Fragment>
    )
}

export default LoginForm
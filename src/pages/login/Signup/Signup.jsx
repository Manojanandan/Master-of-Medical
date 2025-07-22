import React, { useState } from 'react'
import { Box, Button, Checkbox, FormControlLabel, Stack, TextField, Typography, IconButton, InputAdornment } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import GoogleIcon from '@mui/icons-material/Google';
import { useDispatch, useSelector } from 'react-redux';
import WestIcon from '@mui/icons-material/West';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// Email: basic pattern for most emails
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Username: letters, numbers, underscores, 3-16 chars
const userNameRegex = /^[a-zA-Z]{3,16}$/;

// Password: min 8 chars, at least one letter, one number, one special char
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const Signup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const type = sessionStorage.getItem("userType")
    const storeVendorDetails = []

    const [checked, setChecked] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "", password: "", userName: ""
    })
    const [errorMsg, setErrorMsg] = useState({ emailError: '', passwordError: "", useNameError: "" })
    
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    }
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
        if (e.target.id === "email") {
            setErrorMsg({ ...errorMsg, emailError: "" });
        }
        if (e.target.id === "userName") {
            setErrorMsg({ ...errorMsg, useNameError: "" });
        }
        if (e.target.id === "password") {
            setErrorMsg({ ...errorMsg, passwordError: "" });
        }
    }
    const createAccount = () => {
        if (formData.email === "") {
            setErrorMsg({ ...errorMsg, emailError: "Email is required" })
        } else if (!emailRegex.test(formData.email)) {
            setErrorMsg({ ...errorMsg, emailError: "Invalid email format" })
        } else if (formData.userName === "") {
            setErrorMsg({ ...errorMsg, useNameError: "User Name is required" })
        } else if (!userNameRegex.test(formData.userName)) {
            setErrorMsg({ ...errorMsg, useNameError: "User Name must be 3-16 characters long and can only contain letters" })
        }
        else if (formData.password === "") {
            setErrorMsg({ ...errorMsg, passwordError: "Password is required" })
        } else if (!passwordRegex.test(formData.password)) {
            setErrorMsg({ ...errorMsg, passwordError: "Password must be at least 8 characters long and include at least one letter, one number, and one special character" })
        }
        else {
            setErrorMsg({ emailError: '', passwordError: "", useNameError: "" })
            storeVendorDetails.push({
                email: formData.email, password: formData.password, userName: formData.userName
            })
            sessionStorage.setItem("tempData",JSON.stringify(storeVendorDetails))
            navigate(`/details`);
            setFormData({ email: "", password: "", userName: "" })
        }
    }
    return (
        <React.Fragment>
            <Box sx={{ height: '100vh', width: '100%',backgroundColor:'#f2f3f5',padding:'3% ' }}>
                <Box onClick={()=>navigate('/')} sx={{textAlign:'right',display:'flex',justifyContent:'flex-end',alignItems:'center',width:'100%',gap:'10px',cursor:'pointer'}}>
                    <WestIcon sx={{fontSize:'2rem'}} />
                    <Typography variant='p' component='div' sx={{fontSize:'1.6rem',fontWeight:'bold',color:'black'}}>Back</Typography>
                </Box>
                <Box sx={{ width: '55%', height: 'auto', margin: '0 auto', backgroundColor: '#fff', borderRadius: '15px' }}>
                    <Stack direction='column'>
                        <Typography variant='p' sx={{ margin: '5% auto 0',fontSize:'2rem', }}>Welcome to <span style={{textTransform:'capitalize'}}>{type}</span></Typography>
                        <Typography variant='p' sx={{ fontSize: '14px', margin: '0 auto',fontWeight:'bold' }}>Already have an account? <Link to={`/loginform`} style={{ fontWeight: 'bold', fontSize: '16px',color:'#009e92',textDecoration:'none',borderBottom:'solid 1.5px #009e92' }}> Login</Link></Typography>
                    </Stack>
                    <Stack direction='column' sx={{ width: '85%', maxWidth: '100%', margin: '5% 7% 0' }} spacing={1}>
                        <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>Email<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
                        {errorMsg.emailError && <Typography variant='span' sx={{ color: 'red', fontSize: '14px' }}>{errorMsg.emailError}</Typography>}
                        <TextField sx={{paddingBottom:'10px'}} fullWidth id="email" size="small" autoComplete='off' value={formData.email} onChange={handleChange} />
                        <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>User Name<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
                        {errorMsg.useNameError && <Typography variant='span' sx={{ color: 'red', fontSize: '14px' }}>{errorMsg.useNameError}</Typography>}
                        <TextField sx={{paddingBottom:'10px'}} fullWidth id="userName" autoComplete='off' size="small" value={formData.userName} onChange={handleChange} />
                        <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>Password<span style={{color:'red',marginLeft:'5px'}}>*</span></Typography>
                        {errorMsg.passwordError && <Typography variant='span' sx={{ color: 'red', fontSize: '14px' }}>{errorMsg.passwordError}</Typography>}
                        <TextField 
                            sx={{paddingBottom:'10px'}} 
                            fullWidth 
                            id="password" 
                            autoComplete='off' 
                            size="small" 
                            value={formData.password} 
                            onChange={handleChange}
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={togglePasswordVisibility} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Stack>
                    <Stack direction='row'>
                        <FormControlLabel control={<Checkbox checked={checked} onClick={(e) => setChecked(e.target.checked)} />} sx={{ margin: '2% 0% 2% 6%', fontSize: '10px', color: '#837c7c', userSelect: 'none' }} />
                        <Typography variant='span' sx={{alignItems:'center',margin:'3.5% 0 0',fontWeight:'bold',fontSize:'14px'}} >By creating an account, you agree to the <Link to='#' style={{color:"#009e92",textDecoration:'none',borderBottom:'solid 1.5px #009e92'}}>Terms of use</Link> and <Link to='#' style={{color:"#009e92",textDecoration:'none',borderBottom:'solid 1.5px #009e92'}}>Privacy Policy.</Link> </Typography> 
                    </Stack>
                    <Stack direction='column'>
                        <Button disabled={!checked} onClick={createAccount} variant='outlined' sx={{ width: '85%', margin: '2% auto 7%', textTransform: 'capitalize', padding: '1%', fontSize: '16px', fontWeight: 'bold' }}>Create an account</Button>
                        {/* <Button startIcon={<GoogleIcon />} variant='contained' sx={{ width: '85%', margin: '2% auto 6%', textTransform: 'capitalize', padding: '1%', fontSize: '16px', fontWeight: 'bold' }}>Sign in with google</Button> */}
                    </Stack>
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default Signup

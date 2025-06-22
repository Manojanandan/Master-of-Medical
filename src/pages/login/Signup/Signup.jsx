import React, { useState } from 'react'
import { Box, Button, Checkbox, FormControlLabel, Stack, TextField, Typography } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import GoogleIcon from '@mui/icons-material/Google';
import { useDispatch, useSelector } from 'react-redux';

// Email: basic pattern for most emails
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Username: letters, numbers, underscores, 3-16 chars
const userNameRegex = /^[a-zA-Z]{3,16}$/;

// Password: min 8 chars, at least one letter, one number, one special char
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const Signup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const useQuery = new URLSearchParams(useLocation().search)
    const type = useQuery.get("type")
    const storeVendorDetails = []

    const [checked, setChecked] = useState(false)
    const [formData, setFormData] = useState({
        email: "", password: "", userName: ""
    })
    const [errorMsg, setErrorMsg] = useState({ emailError: '', passwordError: "", useNameError: "" })
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
            navigate(`/details?type=${type}`);
            setFormData({ email: "", password: "", userName: "" })
        }
    }
    return (
        <React.Fragment>
            <Box sx={{ height: '100%', width: '100%' }}>
                <Box sx={{ width: '55%', border: 'solid 1.5px #d1cbcb', height: 'auto', margin: '2% auto', backgroundColor: '#d8d1d136', borderRadius: '15px' }}>
                    <Stack direction='column'>
                        <Typography variant='h4' sx={{ margin: '2% auto' }}>Welcome to User</Typography>
                        <Typography variant='p' sx={{ fontSize: '13px', margin: '0 auto' }}>Already have an account <Link to={`/loginform?type=${type}`} style={{ fontWeight: 'bold', fontSize: '16px' }}> Log in ?</Link></Typography>
                    </Stack>
                    <Stack direction='column' sx={{ width: '85%', maxWidth: '100%', margin: '5% 7% 0' }} spacing={1}>
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>Email</Typography>
                        {errorMsg.emailError && <Typography variant='span' sx={{ color: 'red', fontSize: '14px' }}>{errorMsg.emailError}</Typography>}
                        <TextField fullWidth id="email" size="small" autoComplete='off' value={formData.email} onChange={handleChange} /><br />
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>User Name</Typography>
                        {errorMsg.useNameError && <Typography variant='span' sx={{ color: 'red', fontSize: '14px' }}>{errorMsg.useNameError}</Typography>}
                        <TextField fullWidth id="userName" autoComplete='off' size="small" value={formData.userName} onChange={handleChange} /><br />
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>Password</Typography>
                        {errorMsg.passwordError && <Typography variant='span' sx={{ color: 'red', fontSize: '14px' }}>{errorMsg.passwordError}</Typography>}
                        <TextField fullWidth id="password" autoComplete='off' size="small" value={formData.password} onChange={handleChange} /><br />
                    </Stack>
                    <Stack direction='column'>
                        <FormControlLabel control={<Checkbox checked={checked} onClick={(e) => setChecked(e.target.checked)} />} label="i want to receive emails about the product, feature updates,events, and marketing promotions." sx={{ margin: '2% 3% 0', fontSize: '10px', color: '#837c7c', userSelect: 'none' }} />
                        <Typography variant='p' sx={{ fontSize: '12px', margin: '3% 7%' }}>By creating an account, you agree to the <Link to='/'>Terms of use</Link> and <Link to='/'>Privacy Policy.</Link> </Typography>
                    </Stack>
                    <Stack direction='column'>
                        <Button disabled={!checked} onClick={createAccount} variant='outlined' sx={{ width: '85%', margin: '2% auto 0%', borderRadius: '15px', textTransform: 'capitalize', padding: '1%', fontSize: '16px', fontWeight: 'bold' }}>Create an account</Button>
                        <Button startIcon={<GoogleIcon />} variant='contained' sx={{ width: '85%', margin: '2% auto 4%', borderRadius: '15px', textTransform: 'capitalize', padding: '1%', fontSize: '16px', fontWeight: 'bold' }}>Sign in with google</Button>
                    </Stack>
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default Signup

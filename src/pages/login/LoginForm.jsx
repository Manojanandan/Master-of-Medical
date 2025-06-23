import React, { useEffect, useState } from 'react'
import { Alert, Backdrop, Box, Button, Checkbox, CircularProgress, Container, FormControlLabel, Grid, Snackbar, Stack, TextField, Typography } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { loginUser } from './LoginReducer';
import { useDispatch, useSelector } from 'react-redux';

// Email: basic pattern for most emails
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password: min 8 chars, at least one letter, one number, one special char
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const LoginForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const useQuery = new URLSearchParams(useLocation().search)
    const type = useQuery.get("type")

    const { loader, message, success } = useSelector((state) => state.loginReducer)

    const [openModal, setOpenModal] = useState(false);
    const [allDtata, setAllData] = useState({
        email: "", password: ""
    })
    const [errorMsg, setErrorMsg] = useState({ emailError: '', passwordError: "" })
    const handleChange = (e) => {
        setAllData({
            ...allDtata,
            [e.target.id]: e.target.value
        })
        if (e.target.id === "email") {
            setErrorMsg({ ...errorMsg, useNameError: "" });
        }
        if (e.target.id === "password") {
            setErrorMsg({ ...errorMsg, passwordError: "" });
        }
    }

    useEffect(() => {
        if (success) {
            setOpenModal(true);
            setTimeout(() => {
                if (type === 'vendor') {
                    navigate("/vendorDashboard");
                } else {
                    navigate("/ecommerceDashboard");
                }
            }, 1000);
        } else if (message) {
            setOpenModal(true);
        }
    }, [success, message, navigate, type]);

    const createLogin = () => {
        if (allDtata.email === "") {
            setErrorMsg({ ...errorMsg, emailError: "Email is required" })
        } else if (!emailRegex.test(allDtata.email)) {
            setErrorMsg({ ...errorMsg, emailError: "Invalid email format" })
        } else if (allDtata.password === "") {
            setErrorMsg({ ...errorMsg, passwordError: "Password is required" })
        } else if (!passwordRegex.test(allDtata.password)) {
            setErrorMsg({ ...errorMsg, passwordError: "Password must be at least 8 characters long and include at least one letter, one number, and one special character" })
        }
        else {
            setErrorMsg({ passwordError: "", emailError: "" })
            const payload = {
                email: allDtata.email,
                password: allDtata.password,
            }
            dispatch(loginUser({data: payload,type}))
        }
    }

    const handleClose = () => {
        setOpenModal(false);
    }
console.log(message);

    return (
        <React.Fragment>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={loader}
            >
                <CircularProgress color="secondary" />
            </Backdrop>
            {message && <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={openModal} autoHideDuration={3000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={success ? "success" : "error"}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>}
            <Box sx={{ height: '100%', width: '100%' }}>
                <Box sx={{ border: 'solid 1.5px #d1cbcb', height: 'auto', margin: '7% auto', backgroundColor: '#d8d1d136', borderRadius: '15px', width: '40%' }}>
                    <Grid container spacing={2}>
                        <Grid item size={6} sx={{ margin: '2% auto' }}>
                            <Typography variant='h4' >Welcome to Login</Typography>
                            <Typography variant='p' sx={{ fontSize: '13px', marginLeft: '12%' }}>Create a new account <Link to='/signup' style={{ fontWeight: 'bold', fontSize: '16px' }}> Sign up ?</Link></Typography>
                        </Grid>
                        <Grid item size={12} sx={{ margin: '5% 7% 0' }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>Email</Typography>
                            {errorMsg.emailError && <Typography variant='span' sx={{ color: 'red', fontSize: '14px' }}>{errorMsg.emailError}</Typography>}
                            <TextField fullWidth id="email" size="small" value={allDtata.email} onChange={handleChange} />
                        </Grid>
                        <Grid item size={12} sx={{ margin: '1% 7% 0' }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>Password</Typography>
                            {errorMsg.passwordError && <Typography variant='span' sx={{ color: 'red', fontSize: '14px' }}>{errorMsg.passwordError}</Typography>}
                            <TextField fullWidth id="password" size="small" value={allDtata.password} onChange={handleChange} />
                        </Grid>
                        <Grid item size={12} sx={{ margin: '0 7%', fontWeight: 'bold' }}>
                            <Link to=''>Forgot password</Link>
                        </Grid>

                    </Grid>
                    <Button onClick={createLogin} variant='contained' sx={{ borderRadius: '15px', textTransform: 'capitalize', fontSize: '16px', fontWeight: 'bold', padding: '1% 8%', margin: '5% 37%' }}>Login</Button>

                </Box>
            </Box>
        </React.Fragment>
    )
}

export default LoginForm
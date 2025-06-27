import { Box, Button, Grid, IconButton, InputAdornment, Modal, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import WestIcon from '@mui/icons-material/West';
import { useNavigate } from 'react-router-dom';
import OTPInput from '../../../components/e_commerceComponents/OTPInput';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// Email: basic pattern for most emails
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [errors, setErrors] = useState({ emailError: "", newpasswordError: "", confirmpasswordError: "" })
    const [allData, setAllData] = useState({ email: "", newpassword: "", confirmpassword: "", otpModal: false, otpInput: "", passwordModal: false })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    }
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev);
    }
    const handleOtpChange = (value) => {
        setAllData(prev => ({
        ...prev,
        otpInput: value
    }));
    };

    const handleChange = (e) => {
        setAllData({ ...allData, [e.target.id]: e.target.value })
        if (e.target.id === "email") {
            setErrors({ ...errors, emailError: "" });
        }
        if (e.target.id === "newpassword") {
            setErrors({ ...errors, newpasswordError: "" });
        }
        if (e.target.id === "confirmpassword") {
            setErrors({ ...errors, confirmpasswordError: "" });
        }
    }

    const generateOTP = () => {
        if (allData.email === "") {
            setErrors({ ...errors, emailError: "Email is required" })
        } else if (!emailRegex.test(allData.email)) {
            setErrors({ ...errors, emailError: "Invalid email format" })
        } else {
            setAllData({ otpModal: true })
        }
    }

    const handleCloseOTP = () => {
        setAllData({ email: "", otpInput: "", otpModal: false })
    }
    const handleVerifyOTP = () => {
        setAllData({ otpInput: "", email: '', otpModal: false, passwordModal: true })
    }

    const confirmPassword = () => {
        console.log(allData.newpassword);
        console.log(allData.confirmpassword);
        if (!allData.newpassword) {
            setErrors({ ...errors, newpasswordError: "New password is required" })
        } else if (!allData.confirmpassword) {
            setErrors({ ...errors, confirmpasswordError: "Confirm password is required" })
        } else if (allData.newpassword !== allData.confirmpassword) {
            setErrors({ ...errors, confirmpasswordError: "Confirm password should be same as new password" })
        } else {
            navigate('/loginform')
        }
    }
    return (
        <>
            <Box sx={{ height: '100vh', width: '100%', backgroundColor: '#f2f3f5', padding: '4% 0' }}>
                <Box onClick={() => navigate('/loginform')} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '90%', gap: '10px', cursor: 'pointer', right: '20px' }}>
                    <WestIcon sx={{ fontSize: '2rem' }} />
                    <Typography variant='p' component='div' sx={{ fontSize: '1.6rem', fontWeight: 'bold', color: 'black' }}>Back</Typography>
                </Box>
                <Box sx={{ border: 'solid 1.5px #fff', height: 'auto', margin: '4% auto', backgroundColor: '#fff', borderRadius: '15px', width: '30%' }}>
                    <Box sx={{ margin: '7% auto 5%', width: 'auto', textAlign: 'center' }}>
                        <Typography variant='p' sx={{ margin: '5% auto 0', fontSize: '1.8rem', }}>Forgot Password</Typography><br />
                        <Typography variant='p' sx={{ fontSize: '14px', fontWeight: 'bold' }}>Create a new password</Typography>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item size={12} sx={{ margin: '5% 7% 0' }}>
                            <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>Email<span style={{ color: 'red', marginLeft: '5px' }}>*</span></Typography>
                            {errors.emailError && <Typography variant='span' sx={{ color: 'red', fontSize: '14px' }}>{errors.emailError}</Typography>}
                            <TextField fullWidth id="email" size="small" value={allData.email} onChange={handleChange} />
                        </Grid>
                    </Grid>
                    <Button onClick={generateOTP} variant='contained' sx={{ fontSize: '16px', fontWeight: 'bold', margin: '7% 35% 10%', backgroundColor: '#009e92', width: '30%' }}>Send OTP</Button>

                </Box>
            </Box>
            {allData.otpModal &&
                <Modal
                    open={allData.otpModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: '30%', bgcolor: 'background.paper', boxShadow: 24, border: 'none', padding: '2%', outline: 'none', borderRadius: '10px' }}>
                        <Box sx={{ width: '80%', margin: '0 auto', textAlign: 'center' }}>
                            <Typography variant='p' component='div' sx={{ fontSize: '1.7rem', fontWeight: 'bold' }}>Verification</Typography>
                            <Typography variant='p' component='div' sx={{ fontSize: '1rem', }}>Enter your verification code</Typography>
                        </Box>
                        <Box sx={{ margin: '8% auto', width: '80%' }}>
                            <OTPInput length={6} onChange={handleOtpChange} />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '75%', margin: '5% auto', fontWeight: 'bold', fontSize: '1.8rem', flexWrap: 'wrap-reverse' }}>
                            <Button onClick={handleCloseOTP} variant='outlined' sx={{ padding: '2% 8%', backgroundColor: '#938d8dde', color: '#fff', fontWeight: 'bold' }}>Cancel</Button>
                            <Button onClick={handleVerifyOTP} variant='contained' sx={{ backgroundColor: '#009e92', color: '#fff', fontWeight: 'bold' }}>Verify OTP</Button>
                        </Box>
                    </Box>
                </Modal>
            }
            {allData.passwordModal &&
                <Modal
                    open={allData.passwordModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: '30%', bgcolor: 'background.paper', boxShadow: 24, border: 'none', padding: '2%', outline: 'none', borderRadius: '10px' }}>
                        <Box sx={{ width: '80%', margin: '0 auto', textAlign: 'center' }}>
                            <Typography variant='p' component='div' sx={{ fontSize: '1.7rem', fontWeight: 'bold' }}>Reset Your Password</Typography>
                        </Box>
                        <Box sx={{ height: 'auto', margin: '4% auto 2%', backgroundColor: '#fff', borderRadius: '15px', width: '95%' }}>
                            <Grid container spacing={2}>
                                <Grid item size={12} sx={{ margin: '5% 0 1%' }}>
                                    <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>New Password<span style={{ color: 'red', marginLeft: '5px' }}>*</span></Typography>
                                    {errors.newpasswordError && <Typography variant='span' sx={{ color: 'red', fontSize: '14px' }}>{errors.newpasswordError}</Typography>}
                                    <TextField fullWidth id="newpassword" size="small" value={allData.newpassword} onChange={handleChange} type={showPassword ? 'text' : 'password'} InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={togglePasswordVisibility} edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }} />
                                </Grid>
                                <Grid item size={12} sx={{ margin: '0% 0' }}>
                                    <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>Confirm Password<span style={{ color: 'red', marginLeft: '5px' }}>*</span></Typography>
                                    {errors.confirmpasswordError && <Typography variant='span' sx={{ color: 'red', fontSize: '14px' }}>{errors.confirmpasswordError}</Typography>}
                                    <TextField fullWidth id="confirmpassword" size="small" value={allData.confirmpassword} onChange={handleChange} type={showConfirmPassword ? 'text' : 'password'} InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }} />
                                </Grid>
                            </Grid>
                            <Button onClick={confirmPassword} variant='contained' sx={{ fontSize: '16px', fontWeight: 'bold', margin: '10% 30% 2%', backgroundColor: '#009e92', width: '40%' }}>confirm</Button>
                        </Box>
                    </Box>
                </Modal>
            }
        </>
    )
}

export default ForgotPassword
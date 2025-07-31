import React, { useEffect, useState } from 'react';
import { 
  Alert, 
  Backdrop, 
  Box, 
  Button, 
  CircularProgress, 
  Divider, 
  IconButton, 
  InputAdornment, 
  Snackbar, 
  TextField, 
  Typography, 
  Stack 
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from './LoginReducer';
import { useDispatch, useSelector } from 'react-redux';
import { 
  West as WestIcon,
  Visibility,
  VisibilityOff,
  Google as GoogleIcon
} from '@mui/icons-material';

// Validation patterns
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
const passwordRegex = /^(?=.[A-Za-z])(?=.\d)(?=.[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const type = sessionStorage.getItem("userType");

    const { loader, message, success } = useSelector((state) => state.loginReducer);

    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({
        email: "", 
        password: ""
    });
    const [errorMsg, setErrorMsg] = useState({ 
        emailError: '', 
        passwordError: "" 
    });
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
        
        // Clear error when user starts typing
        if (e.target.id === "email" && errorMsg.emailError) {
            setErrorMsg({ ...errorMsg, emailError: "" });
        }
        if (e.target.id === "password" && errorMsg.passwordError) {
            setErrorMsg({ ...errorMsg, passwordError: "" });
        }
    };

    useEffect(() => {
        if (success) {
            setOpenModal(true);
            setTimeout(() => {
                if (type === 'vendor') {
                    navigate("/vendor");
                } else {
                    navigate("/customer");
                }
            }, 1000);
        } else if (message && !success) {
            setOpenModal(true);
        }
    }, [success, message, navigate, type]);

    const validateForm = () => {
        let isValid = true;
        const newErrors = { emailError: '', passwordError: "" };

        if (!formData.email) {
            newErrors.emailError = "Email or username is required";
            isValid = false;
        } else if (!emailRegex.test(formData.email) && !usernameRegex.test(formData.email)) {
            newErrors.emailError = "Please enter a valid email or username (3-20 characters, letters, numbers, and underscores only)";
            isValid = false;
        }

        // if (!formData.password) {
        //     newErrors.passwordError = "Password is required";
        //     isValid = false;
        // } else if (!passwordRegex.test(formData.password)) {
        //     newErrors.passwordError = "Password must be at least 8 characters with one letter, number, and special character";
        //     isValid = false;
        // }

        setErrorMsg(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        const payload = {
            email: formData.email,
            password: formData.password,
        };
        console.log("dddd", payload);

        dispatch(loginUser({ data: payload, type: type == "vendor" ? "vendor" : "customer" }));
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    return (
        <Box sx={{ 
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f8f9fa',
            padding: { xs: '1rem', md: '3%' }
        }}>
            {/* Back Button */}
            <Box 
                onClick={() => navigate('/auth/register')} 
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    alignSelf: 'flex-end',
                    mb: 2,
                    '&:hover': {
                        color: 'primary.main'
                    }
                }}
            >
                <WestIcon sx={{ fontSize: '1.5rem' }} />
                <Typography variant='body1' sx={{ fontWeight: 'bold' }}>Back</Typography>
            </Box>
            
            {/* Loading Backdrop */}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loader}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            
            {/* Success/Error Snackbar */}
            {message && (
                <Snackbar 
                    open={openModal} 
                    autoHideDuration={3000} 
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert
                        onClose={handleClose}
                        severity={success ? "success" : "error"}
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {message}
                    </Alert>
                </Snackbar>
            )}
            
            {/* Main Card */}
            <Box sx={{ 
                width: { xs: '100%', md: '35%' },
                maxWidth: '500px',
                margin: '0 auto',
                backgroundColor: '#fff',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                padding: { xs: '1.5rem', md: '2.5rem' }
            }}>
                <Stack spacing={3}>
                    {/* Header */}
                    <Box textAlign="center">
                        <Typography variant="h4" sx={{ 
                            fontWeight: 'bold',
                            color: 'text.primary',
                            mb: 1
                        }}>
                            {type?.toLowerCase() === 'vendor' ? 'Vendor' : 'Customer'} Login
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                            Don't have an account?{' '}
                            <Link 
                                to="/auth/register" 
                                style={{ 
                                    color: '#009e92',
                                    fontWeight: '600',
                                    textDecoration: 'none',
                                    borderBottom: '1.5px solid #009e92'
                                }}
                            >
                                Sign up
                            </Link>
                        </Typography>
                    </Box>
                    
                    {/* Form */}
                    <Box component="form" onSubmit={handleSubmit}>
                        <Stack spacing={2.5}>
                            {/* Email/Username Field */}
                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                    Login using email or username <span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    fullWidth
                                    id="email"
                                    size="medium"
                                    variant="outlined"
                                    autoComplete="username"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={!!errorMsg.emailError}
                                    helperText={errorMsg.emailError}
                                    placeholder="Enter your email or username"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px'
                                        }
                                    }}
                                />
                            </Box>
                            
                            {/* Password Field */}
                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                    Password <span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    fullWidth
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    size="medium"
                                    variant="outlined"
                                    autoComplete="current-password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={!!errorMsg.passwordError}
                                    helperText={errorMsg.passwordError}
                                    placeholder="Enter your password"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={togglePasswordVisibility}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px'
                                        }
                                    }}
                                />
                            </Box>
                            
                            {/* Forgot Password Link */}
                            <Box sx={{ textAlign: 'right' }}>
                                <Link 
                                    to="/auth/forgot-password"
                                    style={{ 
                                        color: '#009e92',
                                        textDecoration: 'none',
                                        borderBottom: '1.5px solid #009e92',
                                        fontSize: '0.875rem',
                                        fontWeight: '500'
                                    }}
                                >
                                    Forgot password?
                                </Link>
                            </Box>
                            
                            {/* Submit Button */}
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                                sx={{
                                    borderRadius: '8px',
                                    py: 1.5,
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        boxShadow: 'none'
                                    }
                                }}
                            >
                                Login
                            </Button>
                            
                            {/* Divider */}
                            {/* <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                                <Divider sx={{ flexGrow: 1 }} />
                                <Typography variant="body2" sx={{ px: 2, color: 'text.secondary' }}>
                                    OR
                                </Typography>
                                <Divider sx={{ flexGrow: 1 }} />
                            </Box> */}
                            
                            {/* Google Sign In */}
                            {/* <Button
                                startIcon={<GoogleIcon />}
                                variant="outlined"
                                fullWidth
                                size="large"
                                sx={{
                                    borderRadius: '8px',
                                    py: 1.5,
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 'bold'
                                }}
                            >
                                Continue with Google
                            </Button> */}
                        </Stack>
                    </Box>
                </Stack>
            </Box>
            
            {/* Footer */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    © {new Date().getFullYear()} Your Company. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default LoginForm;

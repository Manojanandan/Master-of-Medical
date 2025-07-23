import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Checkbox, 
  FormControlLabel, 
  Stack, 
  TextField, 
  Typography,
  InputAdornment,
  IconButton,
  Divider,
  CircularProgress
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Google as GoogleIcon,
  West as WestIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';

// Validation patterns
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const userNameRegex = /^[a-zA-Z]{3,16}$/;
const passwordRegex = /^(?=.[A-Za-z])(?=.\d)(?=.[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const type = sessionStorage.getItem("userType");
    const storeVendorDetails = [];
    
    const [checked, setChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "", 
        password: "", 
        userName: ""
    });
    
    const [errorMsg, setErrorMsg] = useState({ 
        emailError: '', 
        passwordError: "", 
        useNameError: "" 
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
        
        // Clear error when user starts typing
        if (e.target.id === "email" && errorMsg.emailError) {
            setErrorMsg({ ...errorMsg, emailError: "" });
        }
        if (e.target.id === "userName" && errorMsg.useNameError) {
            setErrorMsg({ ...errorMsg, useNameError: "" });
        }
        if (e.target.id === "password" && errorMsg.passwordError) {
            setErrorMsg({ ...errorMsg, passwordError: "" });
        }
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = { emailError: '', passwordError: "", useNameError: "" };

        if (!formData.email) {
            newErrors.emailError = "Email is required";
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            newErrors.emailError = "Invalid email format";
            isValid = false;
        }

        if (!formData.userName) {
            newErrors.useNameError = "Username is required";
            isValid = false;
        } else if (!userNameRegex.test(formData.userName)) {
            newErrors.useNameError = "Username must be 3-16 letters only";
            isValid = false;
        }

        if (!formData.password) {
            newErrors.passwordError = "Password is required";
            isValid = false;
        } else if (!passwordRegex.test(formData.password)) {
            newErrors.passwordError = "Password must be at least 8 characters with one letter, number, and special character";
            isValid = false;
        }

        setErrorMsg(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        setIsLoading(true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            storeVendorDetails.push({
                email: formData.email, 
                password: formData.password, 
                userName: formData.userName
            });
            
            sessionStorage.setItem("tempData", JSON.stringify(storeVendorDetails));
            navigate('/details');
            setFormData({ email: "", password: "", userName: "" });
            
        } catch (error) {
            console.error("Signup error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                onClick={() => navigate('/')} 
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    alignSelf: 'flex-start',
                    mb: 2,
                    '&:hover': {
                        color: 'primary.main'
                    }
                }}
            >
                <WestIcon sx={{ fontSize: '1.5rem' }} />
                <Typography variant='body1' sx={{ fontWeight: 'bold' }}>Back</Typography>
            </Box>
            
            {/* Main Card */}
            <Box sx={{ 
                width: { xs: '100%', md: '55%' },
                maxWidth: '600px',
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
                            Join as {type?.toLowerCase() || 'user'}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                            Already have an account?{' '}
                            <Link 
                                to="/loginform" 
                                style={{ 
                                    color: '#009e92',
                                    fontWeight: '600',
                                    textDecoration: 'none',
                                    borderBottom: '1.5px solid #009e92'
                                }}
                            >
                                Login
                            </Link>
                        </Typography>
                    </Box>
                    
                    {/* Form */}
                    <Box component="form" onSubmit={handleSubmit}>
                        <Stack spacing={2.5}>
                            {/* Email Field */}
                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                    Email <span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    fullWidth
                                    id="email"
                                    size="medium"
                                    variant="outlined"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={!!errorMsg.emailError}
                                    helperText={errorMsg.emailError}
                                    placeholder="Enter your email"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px'
                                        }
                                    }}
                                />
                            </Box>
                            
                            {/* Username Field */}
                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                    Username <span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    fullWidth
                                    id="userName"
                                    size="medium"
                                    variant="outlined"
                                    autoComplete="username"
                                    value={formData.userName}
                                    onChange={handleChange}
                                    error={!!errorMsg.useNameError}
                                    helperText={errorMsg.useNameError}
                                    placeholder="Choose a username"
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
                                    autoComplete="new-password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={!!errorMsg.passwordError}
                                    helperText={errorMsg.passwordError}
                                    placeholder="Create a password"
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
                            
                            {/* Terms Checkbox */}
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        checked={checked} 
                                        onChange={(e) => setChecked(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label={
                                    <Typography variant="body2">
                                        I agree to the{' '}
                                        <Link 
                                            to="#" 
                                            style={{ 
                                                color: '#009e92',
                                                textDecoration: 'none',
                                                borderBottom: '1.5px solid #009e92'
                                            }}
                                        >
                                            Terms of Use
                                        </Link>{' '}
                                        and{' '}
                                        <Link 
                                            to="#" 
                                            style={{ 
                                                color: '#009e92',
                                                textDecoration: 'none',
                                                borderBottom: '1.5px solid #009e92'
                                            }}
                                        >
                                            Privacy Policy
                                        </Link>
                                    </Typography>
                                }
                                sx={{ 
                                    mt: 1,
                                    alignItems: 'flex-start',
                                    '& .MuiCheckbox-root': {
                                        paddingTop: 0
                                    }
                                }}
                            />
                            
                            {/* Submit Button */}
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={!checked || isLoading}
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
                                {isLoading ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    'Create Account'
                                )}
                            </Button>
                            
                            {/* Divider */}
                            <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                                <Divider sx={{ flexGrow: 1 }} />
                                <Typography variant="body2" sx={{ px: 2, color: 'text.secondary' }}>
                                    OR
                                </Typography>
                                <Divider sx={{ flexGrow: 1 }} />
                            </Box>
                            
                            {/* Google Sign In */}
                            <Button
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
                            </Button>
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

export default Signup;

import React, { useState, useEffect } from 'react';
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
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Google as GoogleIcon,
  West as WestIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';

// Enhanced validation patterns
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const userNameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const Signup = () => {
    const navigate = useNavigate();
    const userType = sessionStorage.getItem("userType") || 'user';
    
    const [checked, setChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "", 
        password: "", 
        userName: ""
    });
    
    const [errors, setErrors] = useState({ 
        email: '', 
        password: "", 
        userName: "" 
    });
    
    const [submitError, setSubmitError] = useState(null);
    const [formValid, setFormValid] = useState(false);

    // Validate form on each change
    useEffect(() => {
        const isValid = 
            formData.email && emailRegex.test(formData.email) &&
            formData.userName && userNameRegex.test(formData.userName) &&
            formData.password && passwordRegex.test(formData.password) &&
            checked;
        setFormValid(isValid);
    }, [formData, checked]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
        
        // Clear error when user starts typing
        if (errors[id]) {
            setErrors(prev => ({ ...prev, [id]: "" }));
        }
    };

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'email':
                if (!value) return "Email is required";
                if (!emailRegex.test(value)) return "Please enter a valid email address";
                return "";
            case 'userName':
                if (!value) return "Username is required";
                if (!userNameRegex.test(value)) return "Username must be 3-16 characters (letters, numbers, _) starting with a letter";
                return "";
            case 'password':
                if (!value) return "Password is required";
                if (!passwordRegex.test(value)) return "Must be 8+ chars with uppercase, lowercase, number, and special character";
                return "";
            default:
                return "";
        }
    };

    const handleBlur = (e) => {
        const { id, value } = e.target;
        const error = validateField(id, value);
        setErrors(prev => ({ ...prev, [id]: error }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate all fields
        const emailError = validateField('email', formData.email);
        const userNameError = validateField('userName', formData.userName);
        const passwordError = validateField('password', formData.password);
        
        setErrors({
            email: emailError,
            userName: userNameError,
            password: passwordError
        });
        
        if (emailError || userNameError || passwordError || !checked) {
            return;
        }
        
        setIsLoading(true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const userData = {
                ...formData,
                userType,
                createdAt: new Date().toISOString()
            };
            
            // Store temporarily
            sessionStorage.setItem("tempUserData", JSON.stringify(userData));
            
            // Redirect to details page
            navigate('/details');
            
        } catch (error) {
            console.error("Signup error:", error);
            setSubmitError("Failed to create account. Please try again.");
        } finally {
            setIsLoading(false);
        }
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
                        <Typography variant="h5" sx={{ 
                            fontWeight: 'bold',
                            mb: 1
                        }}>
                            Join as {userType.charAt(0).toUpperCase() + userType.slice(1)}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                            Already have an account?{' '}
                            <Link 
                                to="/login" 
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
                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <Stack spacing={2.5}>
                            {/* Email Field */}
                            <Box>
                                <Typography variant="subtitle1" component="label" htmlFor="email" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                    Email <span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    fullWidth
                                    id="email"
                                    type="email"
                                    size="medium"
                                    variant="outlined"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    placeholder="your@email.com"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px'
                                        }
                                    }}
                                />
                            </Box>
                            
                            {/* Username Field */}
                            <Box>
                                <Typography variant="subtitle1" component="label" htmlFor="userName" sx={{ fontWeight: 'bold', mb: 0.5 }}>
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
                                    onBlur={handleBlur}
                                    error={!!errors.userName}
                                    helperText={errors.userName}
                                    placeholder="your_username"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px'
                                        }
                                    }}
                                />
                            </Box>
                            
                            {/* Password Field */}
                            <Box>
                                <Typography variant="subtitle1" component="label" htmlFor="password" sx={{ fontWeight: 'bold', mb: 0.5 }}>
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
                                    onBlur={handleBlur}
                                    error={!!errors.password}
                                    helperText={errors.password || "8+ chars with uppercase, lowercase, number & special char"}
                                    placeholder="Create a password"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowPassword(!showPassword)}
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
                                {formData.password && !errors.password && (
                                    <Box sx={{ width: '100%', height: '4px', backgroundColor: '#e0e0e0', borderRadius: '2px', mt: 1 }}>
                                        <Box 
                                            sx={{ 
                                                height: '100%',
                                                borderRadius: '2px',
                                                backgroundColor: 
                                                    formData.password.length < 8 ? '#f44336' :
                                                    formData.password.length < 12 ? '#ff9800' : '#4caf50',
                                                width: 
                                                    formData.password.length < 8 ? '33%' :
                                                    formData.password.length < 12 ? '66%' : '100%',
                                                transition: 'all 0.3s ease'
                                            }}
                                        />
                                    </Box>
                                )}
                            </Box>
                            
                            {/* Terms Checkbox */}
                            <Box sx={{ mt: 1 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox 
                                            checked={checked} 
                                            onChange={(e) => setChecked(e.target.checked)}
                                            color="primary"
                                            sx={{
                                                alignSelf: 'flex-start',
                                            }}
                                        />
                                    }
                                    label={
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                lineHeight: 1.5,
                                                mt: 1.5
                                            }}
                                        >
                                            I agree to the{' '}
                                            <Link 
                                                to="/terms" 
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
                                                to="/privacy" 
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
                                        alignItems: 'flex-start',
                                        margin: 0,
                                        width: '100%'
                                    }}
                                />
                            </Box>
                            
                            {/* Submit Button */}
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={!formValid || isLoading}
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
                                    <>
                                        <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                                        Creating Account...
                                    </>
                                ) : (
                                    'Create Account'
                                )}
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
                                    fontWeight: 'bold',
                                    color: 'text.primary',
                                    borderColor: '#e0e0e0',
                                    '&:hover': {
                                        borderColor: '#d2d2d2'
                                    }
                                }}
                            >
                                Continue with Google
                            </Button> */}
                        </Stack>
                    </Box>
                </Stack>
            </Box>
            
            {/* Error Snackbar */}
            <Snackbar
                open={!!submitError}
                autoHideDuration={6000}
                onClose={() => setSubmitError(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setSubmitError(null)} severity="error" sx={{ width: '100%' }}>
                    {submitError}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Signup;
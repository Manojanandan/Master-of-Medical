import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography,
  InputAdornment,
  IconButton,
  Modal,
  CircularProgress,
  Stack
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { 
  West as WestIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import OTPInput from '../../../components/e_commerceComponents/OTPInput';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({ 
        email: "", 
        newPassword: "", 
        confirmPassword: "" 
    });
    const [formData, setFormData] = useState({ 
        email: "", 
        newPassword: "", 
        confirmPassword: "" 
    });
    const [modalState, setModalState] = useState({
        otpModal: false,
        passwordModal: false,
        otp: ""
    });
    const [showPassword, setShowPassword] = useState({
        newPassword: false,
        confirmPassword: false
    });
    const [resendTimer, setResendTimer] = useState(0);

    useEffect(() => {
        let interval;
        if (resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [resendTimer]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        if (errors[id]) setErrors(prev => ({ ...prev, [id]: "" }));
    };

    const handleOtpChange = (otp) => {
        setModalState(prev => ({ ...prev, otp }));
    };

    const validateEmail = () => {
        if (!formData.email) {
            setErrors(prev => ({ ...prev, email: "Email is required" }));
            return false;
        }
        if (!emailRegex.test(formData.email)) {
            setErrors(prev => ({ ...prev, email: "Invalid email format" }));
            return false;
        }
        return true;
    };

    const validatePasswords = () => {
        let isValid = true;
        const newErrors = { newPassword: "", confirmPassword: "" };

        if (!formData.newPassword) {
            newErrors.newPassword = "New password is required";
            isValid = false;
        } else if (formData.newPassword.length < 8) {
            newErrors.newPassword = "Password must be at least 8 characters";
            isValid = false;
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
            isValid = false;
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
            isValid = false;
        }

        setErrors(prev => ({ ...prev, ...newErrors }));
        return isValid;
    };

    const handleSendOtp = async () => {
        if (!validateEmail()) return;
        
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setModalState(prev => ({ ...prev, otpModal: true }));
            setResendTimer(30); // Start the countdown when OTP is sent
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setLoading(true);
        try {
            // Simulate API call to resend OTP
            await new Promise(resolve => setTimeout(resolve, 1000));
            setResendTimer(30); // Reset the timer
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = () => {
        // In a real app, you would verify the OTP with your backend
        setModalState({ otpModal: false, passwordModal: true, otp: "" });
    };

    const handleResetPassword = async () => {
        if (!validatePasswords()) return;
        
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            navigate('/auth/login');
        } finally {
            setLoading(false);
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
                onClick={() => navigate('/auth/login')} 
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
                            Forgot Password
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                            Enter your email to reset your password
                        </Typography>
                    </Box>
                    
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
                            error={!!errors.email}
                            helperText={errors.email}
                            placeholder="Enter your email"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px'
                                }
                            }}
                        />
                    </Box>
                    
                    {/* Submit Button */}
                    <Button
                        onClick={handleSendOtp}
                        variant="contained"
                        color="primary"
                        disabled={loading}
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
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Send OTP'
                        )}
                    </Button>
                    
                    {/* Login Link */}
                    <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
                        Remember your password?{' '}
                        <Link 
                                    to="/auth/login"
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
                </Stack>
            </Box>
            
            {/* OTP Verification Modal */}
            <Modal
                open={modalState.otpModal}
                onClose={() => setModalState(prev => ({ ...prev, otpModal: false }))}
                aria-labelledby="otp-modal-title"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', sm: '400px' },
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: '12px',
                    p: 4,
                    outline: 'none'
                }}>
                    <Typography variant="h6" sx={{ 
                        fontWeight: 'bold', 
                        mb: 1, 
                        textAlign: 'center',
                        fontSize: '1.25rem'
                    }}>
                        OTP Verification
                    </Typography>
                    <Typography variant="body2" sx={{ 
                        textAlign: 'center', 
                        mb: 3, 
                        color: 'text.secondary',
                        fontSize: '0.875rem'
                    }}>
                      
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                        <OTPInput length={6} onChange={handleOtpChange} />
                    </Box>
                    
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        mb: 3,
                        fontSize: '0.875rem',
                        color: 'text.secondary'
                    }}>
                        {resendTimer > 0 ? (
                            <Typography variant="body2">
                            </Typography>
                        ) : (
                            <Button 
                                onClick={handleResendOtp}
                                disabled={loading}
                                sx={{
                                    textTransform: 'none',
                                    color: 'primary.main',
                                    fontWeight: 'bold',
                                    fontSize: '0.875rem',
                                    p: 0,
                                    minWidth: 0,
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                Resend OTP
                            </Button>
                        )}
                    </Box>
                    
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleVerifyOtp}
                        disabled={modalState.otp.length !== 6 || loading}
                        sx={{
                            borderRadius: '8px',
                            py: 1.5,
                            textTransform: 'none',
                            fontWeight: 'bold',
                            fontSize: '1rem'
                        }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Verify OTP'}
                    </Button>
                </Box>
            </Modal>
            
            {/* Password Reset Modal */}
            <Modal
                open={modalState.passwordModal}
                onClose={() => setModalState(prev => ({ ...prev, passwordModal: false }))}
                aria-labelledby="password-modal-title"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', sm: '400px' },
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: '12px',
                    p: 4,
                    outline: 'none'
                }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
                        Create New Password
                    </Typography>
                    
                    {/* New Password Field */}
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                            New Password <span style={{ color: 'red' }}>*</span>
                        </Typography>
                        <TextField
                            fullWidth
                            id="newPassword"
                            type={showPassword.newPassword ? 'text' : 'password'}
                            size="medium"
                            variant="outlined"
                            value={formData.newPassword}
                            onChange={handleChange}
                            error={!!errors.newPassword}
                            helperText={errors.newPassword}
                            placeholder="Enter new password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(prev => ({ ...prev, newPassword: !prev.newPassword }))}
                                            edge="end"
                                        >
                                            {showPassword.newPassword ? <VisibilityOff /> : <Visibility />}
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
                    
                    {/* Confirm Password Field */}
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                            Confirm Password <span style={{ color: 'red' }}>*</span>
                        </Typography>
                        <TextField
                            fullWidth
                            id="confirmPassword"
                            type={showPassword.confirmPassword ? 'text' : 'password'}
                            size="medium"
                            variant="outlined"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword}
                            placeholder="Confirm new password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(prev => ({ ...prev, confirmPassword: !prev.confirmPassword }))}
                                            edge="end"
                                        >
                                            {showPassword.confirmPassword ? <VisibilityOff /> : <Visibility />}
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
                    
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleResetPassword}
                        disabled={loading}
                        sx={{
                            borderRadius: '8px',
                            py: 1.5,
                            textTransform: 'none',
                            fontWeight: 'bold'
                        }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Reset Password'}
                    </Button>
                </Box>
            </Modal>
            
            {/* Footer */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    © {new Date().getFullYear()} Your Company. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default ForgotPassword;
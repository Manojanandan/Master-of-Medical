import React, { useRef, useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Typography, 
  Button,
  IconButton,
  CircularProgress
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';

const OTPInput = ({ length = 6, onChange, loading = false }) => {
    const inputs = Array.from({ length }, () => useRef());
    const [otpValues, setOtpValues] = useState(Array(length).fill(''));
    const [activeInput, setActiveInput] = useState(0);
    const [timer, setTimer] = useState(30);
    const [resendVisible, setResendVisible] = useState(false);

    // Countdown logic
    useEffect(() => {
        if (timer > 0) {
            const countdown = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(countdown);
        } else {
            setResendVisible(true);
        }
    }, [timer]);

    const focusInput = (index) => {
        inputs[index]?.current?.focus();
        setActiveInput(index);
    };

    const handleChange = (e, index) => {
        const value = e.target.value;
        
        // Only allow numbers
        if (!/^\d*$/.test(value)) return;
        
        // Update the OTP value at the current index
        const newOtpValues = [...otpValues];
        newOtpValues[index] = value.slice(-1); // Take only the last character
        setOtpValues(newOtpValues);
        
        // Combine all values and send to parent
        const combinedOtp = newOtpValues.join('');
        onChange(combinedOtp);
        
        // Move focus to next input if a digit was entered
        if (value && index < length - 1) {
            focusInput(index + 1);
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            if (!otpValues[index] && index > 0) {
                // Move focus to previous input if current is empty
                focusInput(index - 1);
            }
            // Clear the current input
            const newOtpValues = [...otpValues];
            newOtpValues[index] = '';
            setOtpValues(newOtpValues);
        } else if (e.key === 'ArrowLeft' && index > 0) {
            focusInput(index - 1);
        } else if (e.key === 'ArrowRight' && index < length - 1) {
            focusInput(index + 1);
        } else if (e.key === 'Enter' && index === length - 1 && otpValues.every(v => v !== '')) {
            // Submit if Enter is pressed on last input and all fields are filled
            onChange(otpValues.join(''));
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text/plain').trim().slice(0, length);
        if (/^\d+$/.test(pasteData)) {
            const newOtpValues = [...otpValues];
            pasteData.split('').forEach((char, idx) => {
                if (idx < length) {
                    newOtpValues[idx] = char;
                }
            });
            setOtpValues(newOtpValues);
            onChange(newOtpValues.join(''));
            
            // Focus the last filled input
            const lastFilledIndex = Math.min(pasteData.length - 1, length - 1);
            focusInput(lastFilledIndex);
        }
    };

    const handleResend = () => {
        setTimer(30);
        setResendVisible(false);
        setOtpValues(Array(length).fill(''));
        focusInput(0);
        // You would typically call an API to resend OTP here
    };

    const handleInputClick = (index) => {
        // Focus the first empty input or the clicked one
        const firstEmptyIndex = otpValues.findIndex(val => val === '');
        focusInput(firstEmptyIndex !== -1 ? firstEmptyIndex : index);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
                Enter the {length}-digit verification code
            </Typography>
            
            <Box 
                display="flex" 
                justifyContent="center" 
                gap={1.5} 
                onPaste={handlePaste}
                sx={{ mb: 3 }}
            >
                {otpValues.map((value, index) => (
                    <TextField
                        key={index}
                        inputRef={inputs[index]}
                        value={value}
                        variant="outlined"
                        inputProps={{
                            maxLength: 1,
                            style: {
                                textAlign: 'center',
                                fontSize: '1.5rem',
                                padding: '10px'
                            },
                        }}
                        sx={{
                            width: 56,
                            height: 56,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                                backgroundColor: activeInput === index ? 'rgba(0, 158, 146, 0.08)' : 'transparent',
                                '& fieldset': {
                                    borderColor: activeInput === index ? '#009e92' : '#e0e0e0',
                                    borderWidth: activeInput === index ? '2px' : '1px'
                                },
                                '&:hover fieldset': {
                                    borderColor: '#009e92 !important',
                                },
                            },
                        }}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onClick={() => handleInputClick(index)}
                        onFocus={() => setActiveInput(index)}
                    />
                ))}
            </Box>

            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                gap: 1
            }}>
                {!resendVisible ? (
                    <Typography variant="body2" color="text.secondary">
                        Resend code in <Box component="span" sx={{ fontWeight: 'bold' }}>{timer}</Box> seconds
                    </Typography>
                ) : (
                    <Button 
                        onClick={handleResend}
                        startIcon={loading ? <CircularProgress size={16} /> : <RefreshIcon />}
                        disabled={loading}
                        sx={{ 
                            textTransform: 'none', 
                            color: 'primary.main', 
                            fontWeight: 'bold',
                            '&:hover': {
                                backgroundColor: 'transparent',
                                textDecoration: 'underline'
                            }
                        }}
                    >
                        Resend Code
                    </Button>
                )}
            </Box>
            
            {otpValues.every(v => v !== '') && (
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        All digits entered. Press Enter to submit.
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default OTPInput;
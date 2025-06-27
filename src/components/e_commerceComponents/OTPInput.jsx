import React, { useRef, useState, useEffect } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';

const OTPInput = ({ length = 6, onChange }) => {
    const inputs = Array.from({ length }, () => useRef());

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

    const handleChange = (e, i) => {
        const value = e.target.value;
        if (/^\d$/.test(value)) {
            if (i < length - 1) inputs[i + 1].current.focus();
        }
        onChange(getOtpValue(i, value));
    };

    const handleKeyDown = (e, i) => {
        if (e.key === 'Backspace' && !e.target.value && i > 0) {
            inputs[i - 1].current.focus();
        }
    };

    const handlePaste = (e) => {
        const paste = e.clipboardData.getData('text').trim().slice(0, length);
        const chars = paste.split('');
        chars.forEach((char, idx) => {
            if (inputs[idx]) {
                inputs[idx].current.value = char;
            }
        });
        onChange(chars.join(''));
        e.preventDefault();
    };

    const getOtpValue = (changedIndex, changedValue) => {
        let otp = '';
        inputs.forEach((ref, idx) => {
            otp += idx === changedIndex ? changedValue : ref.current.value || '';
        });
        return otp;
    };

    const handleResend = () => {
        setTimer(30);
        setResendVisible(false);
        // You can add API call here to resend code
        console.log('Resending code...');
    };

    return (
        <>
            <Box display="flex" gap={1.5} onPaste={handlePaste}>
                {inputs.map((ref, i) => (
                    <TextField
                        key={i}
                        inputRef={ref}
                        variant="standard"
                        inputProps={{
                            maxLength: 1,
                            style: {
                                textAlign: 'center',
                                fontSize: 24,
                            },
                        }}
                        InputProps={{
                            disableUnderline: false,
                        }}
                        sx={{
                            width: 40,
                            '& .MuiInput-underline:before': {
                                borderBottom: '2px solid #00000', // Default state
                            },
                            '& .MuiInput-underline:after': {
                                borderBottom: '2px solid #009e92', // Focused state
                            },
                            '& .MuiInput-underline:hover:before': {
                                borderBottom: '2px solid #009e92 !important', // Hover state
                            },
                        }}
                        onChange={(e) => handleChange(e, i)}
                        onKeyDown={(e) => handleKeyDown(e, i)}
                    />
                ))}
            </Box>

            <Box mt={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {!resendVisible ? (
                    <Typography variant="body2" color="text.secondary">
                        Resend code in <strong>{timer}</strong> seconds
                    </Typography>
                ) : (
                    <Button onClick={handleResend} size="small" sx={{ textTransform: 'none', padding: 0, color: '#009e92', fontWeight: 'bold', fontSize: '16px' }}>
                        Resend Code
                    </Button>
                )}
            </Box>
        </>
    );
};

export default OTPInput;

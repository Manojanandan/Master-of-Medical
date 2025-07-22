import React from 'react';
import { Box, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const RegistrationStepper = ({ currentStep = 2 }) => {
  const steps = [
    { label: 'Basic info', completed: currentStep > 1 },
    { label: 'Customer Details', completed: currentStep > 2 },
    { label: 'Admin Approval', completed: currentStep > 3 },
    { label: 'Registration Completed', completed: currentStep > 4 }
  ];

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      mb: 4,
      px: 2,
      width: '100%'
    }}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {/* Step Circle */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            <Box sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: step.completed ? '#009e92' : '#e0e0e0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: step.completed ? 'white' : '#666',
              fontSize: '16px',
              fontWeight: 'bold',
              boxShadow: step.completed ? '0 2px 4px rgba(0, 158, 146, 0.3)' : 'none',
              transition: 'all 0.3s ease',
              position: 'relative',
              zIndex: 2
            }}>
              {step.completed ? <CheckIcon sx={{ fontSize: 20 }} /> : (index + 1)}
            </Box>
            
            {/* Step Label */}
            <Typography 
              variant="caption" 
              sx={{ 
                mt: 1, 
                textAlign: 'center',
                fontSize: '12px',
                fontWeight: step.completed ? 600 : 400,
                color: step.completed ? '#009e92' : '#666',
                lineHeight: 1.2,
                maxWidth: 100
              }}
            >
              {step.label}
            </Typography>
          </Box>
          
          {/* Connecting Line */}
          {index < steps.length - 1 && (
            <Box sx={{ 
              flex: 1, 
              height: 2, 
              backgroundColor: step.completed ? '#009e92' : '#e0e0e0',
              mx: 1,
              transition: 'background-color 0.3s ease',
              position: 'relative',
              zIndex: 1
            }} />
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default RegistrationStepper; 
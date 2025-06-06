import React, { useState } from 'react'
import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';


const Details = () => {
    const navigate = useNavigate()
    const [labelChanges,setLabelChanges] = useState("H")
    return (
        <React.Fragment>
            <Box sx={{ height: '100%', width: '100%' }}>
                <Container maxWidth="md" sx={{ border: 'solid 1.5px #d1cbcb', height: 'auto', margin: '2% auto', backgroundColor: '#d8d1d136', borderRadius: '15px' }}>
                    <Stack direction='column'>
                        <Typography variant='h4' sx={{ margin: '2% auto' }}>User Details</Typography>
                    </Stack>
                    <Box sx={{ display: 'flex', width: '95%', margin: '1% 5%', flexWrap: 'wrap', }}>
                        <Stack direction='column' sx={{ height: 'auto', width: '45%', margin: '0 2%' }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: '3% 0' }}>Name</Typography>
                            <TextField fullWidth id="name" size="small" />
                        </Stack>
                        <Stack direction='column' sx={{ height: 'auto', width: '48%', margin: '0 1%' }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Contact Number</Typography>
                            <TextField fullWidth id="number" size="small" />
                        </Stack>
                        <Stack direction='column' sx={{ height: 'auto', width: '94%', margin: '0 2%' }}>
                            <Typography  sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0 1%', }}>Address</Typography>
                            <TextField fullWidth id="addressLine1" size="small" sx={{marginBottom:'1%'}} />
                            <TextField fullWidth id="addressLine2" size="small" />
                        </Stack>
                        <Stack direction='column' sx={{ height: 'auto', width: '48%', margin: '0 1%' }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>City</Typography>
                            <TextField fullWidth id="city" size="small" />
                        </Stack>
                        <Stack direction='column' sx={{ height: 'auto', width: '48%', margin: '0 1%' }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>State</Typography>
                            <TextField fullWidth id="state" size="small" />
                        </Stack>
                        <Stack direction='column' sx={{ height: 'auto', width: '48%', margin: '0 1%' }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Pincode</Typography>
                            <TextField fullWidth id="pincode" size="small" />
                        </Stack>
                        <Stack direction='column' sx={{ height: 'auto', width: '48%', margin: '0 1%' }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Type of users</Typography>
                            <FormControl>
                                <RadioGroup
                                    row
                                    name="radio"
                                    
                                >
                                    <FormControlLabel value="H" control={<Radio />} label="Hospital" onClick={()=>setLabelChanges("H")} />
                                    <FormControlLabel value="M" control={<Radio />} label="Medical/Clinic " onClick={()=>setLabelChanges("M")} />

                                </RadioGroup>
                            </FormControl>
                        </Stack>
                        <Stack direction='column' sx={{ height: 'auto', width: '48%', margin: '0 1%' }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>{labelChanges ==="H" ? "Hospital Name" : "Medical/Clinic Name"}</Typography>
                            <TextField fullWidth id="name" size="small" />
                        </Stack>
                        
                        <Stack direction='column' sx={{ height: 'auto', width: '48%', margin: '0 1%' }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>Upload File</Typography>
                            <Button variant='outlined' sx={{width:'50%'}}>Upload File</Button>
                        </Stack>
                        <Stack direction='column' sx={{ height: 'auto', width: '48%', margin: '0 1%' }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', margin: ' 3% 0' }}>{labelChanges ==="H" ? "Hospital Registeration Number" : "Medical/Clinical Registeration Number"}</Typography>
                            <TextField fullWidth id="registerationNumber" size="small" />
                        </Stack>
                    </Box>
                    <Stack direction='column'>
                        <Button onClick={() => navigate('/ecommerceDashboard')} variant='contained' sx={{ width: '400px', margin: '4% auto 4%', borderRadius: '15px', textTransform: 'capitalize', padding: '1%', fontSize: '16px', fontWeight: 'bold' }}>Confirm</Button>
                    </Stack>
                </Container>
            </Box>
        </React.Fragment>
    )
}

export default Details
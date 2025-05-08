import { Box, Button, Checkbox, FormControlLabel, FormGroup, Grid2, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React from 'react'
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import { Link } from 'react-router-dom';

const Checkout = () => {
    return (
        <React.Fragment>
            <Box sx={{ height: '70px', width: '95%', margin: '10px auto', display: 'flex', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#f7f7f7', borderRadius: '10px' }}>
                <TurnedInNotIcon sx={{ color: 'red', marginLeft: '10px' }} />
                <TextField fullWidth id="couponCode" size='small' sx={{ margin: '0 1%' }} placeholder='Have a coupon ? Click here to enter your code' />
            </Box>
            <Box sx={{ height: 'auto', width: '95%', margin: '2% auto', display: 'flex', justifyContent: 'space-between', }}>
                <Box sx={{ height: 'auto', width: '930px', padding: '5px 0' }}>
                    <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '16px', }}>Billing details</Typography>
                    <Box sx={{ width: '100%', margin: '10px 0 15px', }}>
                        <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid2 size={6}>
                                <Typography variant='p' sx={{ marginBottom: '10px' }}>First name *</Typography>
                                <TextField sx={{ margin: '7px 0' }} fullWidth size='small' />
                            </Grid2>
                            <Grid2 size={6} >
                                <Typography variant='p'>Last name *</Typography>
                                <TextField sx={{ margin: '7px 0' }} fullWidth size='small' />
                            </Grid2>
                            <Grid2 size={12}>
                                <Typography variant='p' sx={{ marginBottom: '10px' }}>Company name (optional)</Typography>
                                <TextField sx={{ margin: '7px 0' }} fullWidth size='small' />
                            </Grid2>
                            <Grid2 size={12}>
                                <Typography variant='p' sx={{ marginBottom: '10px' }}>Country / Region *</Typography>
                                <TextField sx={{ margin: '7px 0' }} fullWidth size='small' />
                            </Grid2>
                            <Grid2 size={12}>
                                <Typography variant='p' sx={{ marginBottom: '10px' }}>Street address *</Typography>
                                <TextField sx={{ margin: '7px 0' }} fullWidth size='small' />
                                <TextField sx={{ margin: '7px 0' }} fullWidth size='small' />
                            </Grid2>
                            <Grid2 size={12}>
                                <Typography variant='p' sx={{ marginBottom: '10px' }}>Town / City *</Typography>
                                <TextField sx={{ margin: '7px 0' }} fullWidth size='small' />
                            </Grid2>
                            <Grid2 size={12}>
                                <Typography variant='p' sx={{ marginBottom: '10px' }}>State *</Typography>
                                <TextField sx={{ margin: '7px 0' }} fullWidth size='small' />
                            </Grid2>
                            <Grid2 size={12}>
                                <Typography variant='p' sx={{ marginBottom: '10px' }}>Zip Code *</Typography>
                                <TextField sx={{ margin: '7px 0' }} fullWidth size='small' />
                            </Grid2>
                            <Grid2 size={12}>
                                <Typography variant='p' sx={{ marginBottom: '10px' }}>Phone *</Typography>
                                <TextField sx={{ margin: '7px 0' }} fullWidth size='small' />
                            </Grid2>
                            <Grid2 size={12}>
                                <Typography variant='p' sx={{ marginBottom: '10px' }}>Email address *</Typography>
                                <TextField sx={{ margin: '7px 0 5px' }} fullWidth size='small' />
                            </Grid2>
                            <Grid2 size={12}>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox />} label="Create an account?" />
                                    <FormControlLabel sx={{ fontWeight: 'bold' }} control={<Checkbox />} label="Ship to different address?" />
                                </FormGroup>
                            </Grid2>
                            <Grid2 size={12}>
                                <Typography variant='p' sx={{ marginBottom: '10px' }}>Order notes (optional)</Typography>
                                <TextField sx={{ margin: '7px 0 5px' }} fullWidth size='large' />
                            </Grid2>
                        </Grid2>
                    </Box>
                </Box>
                <Box sx={{ height: '100%', width: '390px', border: 'solid 1.5px #2424', padding: '10px 12px', backgroundColor: '#fcfcfc', borderRadius: '10px' }}>
                    <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '20px' }}>Your Order</Typography>
                    <Box sx={{ height: '35px', width: '100%', borderBottom: 'solid 1.5px #2424', margin: '8px 0 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant='p' sx={{ fontSize: '18px', color: '#a7adb7' }}>Product</Typography>
                        <Typography variant='p' sx={{ fontSize: '18px', color: '#a7adb7' }}>Subtotal</Typography>
                    </Box>
                    <Box sx={{ height: 'auto', width: '100%', borderBottom: 'solid 1.5px #2424', margin: '10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ width: '290px', height: 'auto', marginBottom: '8px' }}>Optimum Nutrition (ON) Micronised Creatine Monohydrate for Performance Support * 1</Box>
                        <Typography variant='p' sx={{ fontSize: '22px', }}>$0.89</Typography>
                    </Box>
                    <Box sx={{ height: '35px', width: '100%', borderBottom: 'solid 1.5px #2424', margin: '5px 0 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant='p' sx={{ fontSize: '18px', color: '#a7adb7' }}>Subtotal</Typography>
                        <Typography variant='p' sx={{ fontSize: '22px', }}>$0.89</Typography>
                    </Box>
                    <Box sx={{ height: 'auto', width: '100%', borderBottom: 'solid 1.5px #2424', margin: '5px 0 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant='p' sx={{ fontSize: '18px', color: '#a7adb7' }}>Shipping :</Typography>
                        <Box sx={{ height: '80px', width: '200px', }}>
                            <Typography variant='p' sx={{ fontSize: '20px' }}>Flat rate : $15.00</Typography>
                            <Radio value="a" name="radioButtons" sx={{ marginTop: '-5px' }} />
                            <Typography variant='p' sx={{ fontSize: '20px', paddingRight: '21%' }}>Local pickup</Typography>
                            <Radio value="b" name="radioButtons" sx={{ marginTop: '-5px' }} />
                        </Box>
                    </Box>
                    <Box sx={{ height: '35px', width: '100%', borderBottom: 'solid 1.5px #2424', margin: '5px 0 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant='p' sx={{ fontSize: '18px', color: '#a7adb7' }}>Total</Typography>
                        <Typography variant='p' sx={{ fontSize: '22px', fontWeight: 'bold' }}>$0.89</Typography>
                    </Box>
                    <Box sx={{ height: 'auto', width: '100%', margin: '5px 0 10px',  }}>
                        <RadioGroup  row  name="transferButton" >
                            <FormControlLabel value="DBT" control={<Radio />} label="Direct Bank Transfer" />
                        </RadioGroup>
                        <Typography variant='p' sx={{fontSize:'17px',color:'#a7adb7'}}>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped untill  the funds have cleared in our account.</Typography>
                        <RadioGroup name="paymentsButton" sx={{margin:'12px 0'}}>
                            <FormControlLabel value="CP" control={<Radio />} label="Check Payments" />
                            <FormControlLabel value="CD" control={<Radio />} label="Cash On Delivery" />
                        </RadioGroup>
                        <Typography variant='p' sx={{fontSize:'17px',color:'#a7adb7'}}>Your personal data will be used to process your order,support  your experience thoughout this website, and for other purposes described with <Link to="" sx={{color:'blue !important'}}>privacy policy.</Link></Typography>
                        <FormGroup sx={{margin:'12px 0'}}>
                            <FormControlLabel control={<Checkbox />} label="I have read and agree to the website" />
                            <Link to="" style={{textDecoration:'none'}}>terms and conditions *</Link>
                        </FormGroup>
                        <Button variant='contained' sx={{textAlign:'center',margin:'10px 0',width:'100%',textTransform:'capitalize',fontSize:'18px'}}>place your order</Button>
                    </Box>
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default Checkout
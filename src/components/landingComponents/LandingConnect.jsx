import React from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'


const LandingConnect = () => {
    return (
        <React.Fragment >
            <Box id='reach' sx={{ height: '400px', width: '100%', position: 'relative' }}>
                <Box sx={{ height: '300px', width: '100%', position: 'absolute', bottom: '0', backgroundColor: '#2911754d', display: 'flex', justifyContent: 'space-evenly' }}>
                    <Box sx={{ height: '445px', width: '350px', transform: 'translateY(-11rem)' }}>
                        <img src='http://web.archive.org/web/20240720115017im_/https://www.medikabazaar.com/static/images/connectUs.png' alt="http://web.archive.org/web/20240720115017im_/https://www.medikabazaar.com/static/images/connectUs.png" height='478px' width='320px' />
                    </Box>
                    <Box sx={{ height: '100%', width: '500px' }}>
                        <Typography variant='h2' sx={{ fontWeight: 'bold', color: '#fff', textAlign: 'center', margin: '15% 5% 5%' }}>Let's Connect</Typography>
                        <Stack direction='row' spacing={3} sx={{ marginLeft: '11%' }}>
                            <Button variant='contained' sx={{ textTransform: 'capitalize', fontSize: '17px', fontWeight: 'bold', padding: '3% 5%', background: "#f1ac1b", color: '#fff', borderRadius: '10px' }}>
                                Contact us
                            </Button>
                            <Button variant='outlined' sx={{ textTransform: 'capitalize', fontSize: '17px', fontWeight: 'bold', padding: '3% 5%', color: '#fff', borderRadius: '10px', border: 'solid 2px #fff' }}>
                                Chat on whatsapp
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default LandingConnect
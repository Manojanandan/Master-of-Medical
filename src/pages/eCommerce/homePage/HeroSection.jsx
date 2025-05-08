import React from 'react'
import { Link } from 'react-router-dom';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material'

const HeroSection = () => {
    const heroSectionList = [
        {
            image: "",
            heading: "Payment only online",
            description: 'Find & Download Free Graphic Resources for Pharmacy Banner.',
            bannerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLjTgWcpCS5QZp09tbJJ_qF4g1I5TH1llQKUwbPVIlI2Q10mEoe4nZiU8&s'
        },
        {
            image: "",
            heading: "Payment only online",
            description: 'Find & Download Free Graphic Resources for Pharmacy Banner.',
            bannerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLjTgWcpCS5QZp09tbJJ_qF4g1I5TH1llQKUwbPVIlI2Q10mEoe4nZiU8&s'
        },
        {
            image: "",
            heading: "Payment only online",
            description: 'Find & Download Free Graphic Resources for Pharmacy Banner.',
            bannerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLjTgWcpCS5QZp09tbJJ_qF4g1I5TH1llQKUwbPVIlI2Q10mEoe4nZiU8&s'
        },
        {
            image: "",
            heading: "Payment only online",
            description: 'Find & Download Free Graphic Resources for Pharmacy Banner.',
            bannerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLjTgWcpCS5QZp09tbJJ_qF4g1I5TH1llQKUwbPVIlI2Q10mEoe4nZiU8&s'
        },
    ]
    return (
        <React.Fragment>
            <Box sx={{ height: 'auto', width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', margin: '3% 3% 1%', width: '95%' }}>
                    {heroSectionList?.map((e, i) => {
                        return (
                            <Box sx={{ height: '250px', width: '300px' }}>
                                <Stack direction='row' sx={{ height: 'auto', width: '100%' }} spacing={2}>
                                    <Box sx={{ height: '60px', width: '80px', border: 'solid 1px green' }}></Box>
                                    <Box sx={{ height: 'auto', width: '100%' }}>
                                        <Typography variant='p' sx={{ fontWeight: 'bold', width: '100%' }}>{e?.heading}</Typography><br />
                                        <Typography variant='p' sx={{ fontSize: '14px', }}>{e?.description}</Typography>
                                    </Box>
                                </Stack>
                                <Box sx={{ width: '100%', height: '150px', borderRadius: '10px', marginTop: '15px' }}>
                                    <Link to=''><img src={e?.bannerImage} alt={e?.bannerImage} height="150px" width="100%" style={{ borderRadius: '10px' }} /></Link>
                                </Box>
                            </Box>
                        )
                    })}
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default HeroSection
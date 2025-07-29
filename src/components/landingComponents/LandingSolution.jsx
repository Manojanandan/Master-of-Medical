import React, { useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, IconButton, Stack, Typography } from '@mui/material'
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import SpeedIcon from '@mui/icons-material/Speed';
import WifiTetheringIcon from '@mui/icons-material/WifiTethering';
import serviceBanner from '../../assets/services_medical_banner.png'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const LandingSolution = () => {
     const [expanded, setExpanded] = useState(0);

    const smallAcor = [
        {
            title: "The Problem",
            description: 'India’s medical procurement ecosystem is traditionally dependent on multiple layers of intermediaries—distributors, stockists, and agents. This leads to inflated costs, delayed deliveries, inconsistent product quality, and lack of real-time visibility'
        },
        {
            title: "Our Solution",
            description: 'We’ve built a tech-powered, direct-from-manufacturer procurement platform that eliminates all unnecessary middlemen. Hospitals, clinics, diagnostic labs, and pharmacies can now',
            list:["Source products directly from certified manufacturers","Access live inventory, real-time pricing, and fast delivery","Place bulk orders without distributor margins","Track orders end-to-end via our integrated logistics system","Enjoy greater control, transparency, and cost savings"]
        },
        {
            title: "For Sellers",
            description: 'We empower manufacturers and medical equipment producers to.',
            list: ["List their products with flexible pricing","Reach verified institutional buyers across India","Manage inventory and shipping with zero middle-agent hassles","Boost bulk demand without marketing overheads"],
            subTitle: "With M.O.M, we’re building a single, unified platform where medical buyers and sellers connect, transact, and grow — without friction."
        },
        {
            title: "Our ultimate goal",
            description: 'A smarter, faster, and more affordable healthcare system — powered by technology, backed by trust.'
        },
    ]

    return (
        <React.Fragment >
            <Box sx={{ height: '600px', width: '100%', textAlign: 'center', display: 'flex', alignItems: 'center', padding: '0 5%', gap: '6%',margin:'2% 0' }} id='solution'>
                <Box sx={{ width: '600px', textAlign: 'left', padding: '0% 0 10%'}}>
                    <Typography variant='p' component='div' sx={{ fontSize: '1.8rem', fontWeight: 'bold', textTransform: 'uppercase' }} >our <span style={{ color: '#009e92',fontWeight:'bold' }}>  solution</span></Typography>
                    <Typography variant='p' component='div' sx={{ fontSize: '2rem', fontWeight: 'bold', textTransform: 'uppercase', lineHeight: '40px', margin: '10px 0 15px' }}>At master of medical (M.O.M), We're not jsut building a platform</Typography>
                    <Typography variant='p' component='div' sx={{ fontSize: '22px', fontWeight: 'bold' }}> we're solving a real, critical problem in India's healthcare supply chain.</Typography>
                </Box>
                <Box sx={{ width: '600px', minHeight: '400px' }}>
                    {smallAcor?.map((e, i) => {
                        return (
                            <div style={{borderBottom:'solid 2px black'}} key={e?.id || e?.title || i}>
                                <Accordion  expanded={expanded === i} onChange={() => setExpanded(expanded === i ? null : i)} key={e?.id || e?.title || i}  sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                                    <AccordionSummary
                                        expandIcon={expanded === i ? <RemoveIcon sx={{ color: '#000000' }} /> : <AddIcon sx={{ color: '#000000' }} />}

                                    >
                                        <Typography component="span" sx={{ fontWeight: 'bold', color: '#00000',fontSize:'20px' }}>{e?.title}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography component="p" sx={{ fontWeight: 'bold', color: '#242424',fontSize:'18px',textAlign:'left' }}>{e?.description}</Typography><br/>
                                        {e?.list?.map((list, idx) => {
                                            return (
                                                <Typography variant='ul' sx={{textAlign:'left'}} key={list + '-' + idx}><li>{list}</li></Typography>
                                            )
                                        }) }
                                        {e?.subTitle &&  <Typography component="p" sx={{ fontWeight: 'bold',fontSize:'18px',textAlign:'left',paddingTop:'20px' }}>{e?.subTitle}</Typography>}
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        )
                    })}
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default LandingSolution
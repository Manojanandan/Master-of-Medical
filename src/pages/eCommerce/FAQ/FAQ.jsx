import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import BreadCrumbs from '../../../components/e_commerceComponents/BreadCrumbs'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BackpackIcon from '@mui/icons-material/Backpack';
import PersonIcon from '@mui/icons-material/Person';
import StarRateIcon from '@mui/icons-material/StarRate';
import InfoIcon from '@mui/icons-material/Info';

const FAQ = () => {
    const [expanded, setExpanded] = useState(null);

    const smallAcor = [
        {
            title: "Why is it mandatory to complete KYC for purchasing on Medikabazaar?",
            description: 'Medikabazaar offers regulated and OTC medical products. According to FDA guidelines, only medical professionals and institutions can purchase these items. KYC ensures identity verification during purchase. Individual customers are not eligible to buy. However, certain products do not require KYC verification for purchase.'
        },
        {
            title: "Which documents are required for KYC verification?",
            description: 'For regulated products, acceptable documents include a drug license, medical registration number, or shop and establishment certificate of your clinic, lab, or institution. For OTC products, a GST number or PAN card can also be submitted.'
        },
        {
            title: "Can I purchase products without doing KYC?",
            description: 'Yes, you can purchase certain products without KYC. However, for regulated items, submitting valid business proof during checkout is mandatory.'
        },
        {
            title: "What should I do if my valid KYC documents are not accepted?",
            description: 'If your valid KYC documents are not accepted, email them to support@medikabazaar.com. A confirmation email will be sent once your KYC is reviewed and approved.'
        },
    ]
    return (
        <Box sx={{ height: 'auto', width: '100%', }}>
            <BreadCrumbs title={"FAQ"} />
            <Box sx={{ height: 'auto', width: '95%', margin: '20px auto', display: 'flex', justifyContent: 'space-between', }}>
                <Paper sx={{ height: '360px', width: '350px', borderRight: 'solid 1.5px #2424' }} elevation={4}>
                    <List sx={{ width: '100%', maxWidth: 360,  }}  >
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <BackpackIcon sx={{color:'#c5225f'}} />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText  primary="My Orders" secondary="Track your orders, refunds and download order confirmation" />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <PersonIcon sx={{color:'#c5225f'}} />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText  primary="My Profile" secondary="Edit/update your profile details and address" />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <StarRateIcon sx={{color:'#c5225f'}}/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText  primary="My Whislist" secondary="Buy from items saved in wishlist" />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <InfoIcon sx={{color:'#c5225f'}} />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText  primary="FAQ's" secondary="Answers to questions about order tracking, return, refund and payment" />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </List>
                </Paper>
                <Box sx={{ height: 'auto', width: '1000px' }}>
                    <Box sx={{ height: '320px', width: '100%', borderRadius: '15px', }}>
                        <img style={{ borderRadius: '15px' }} height='320px' width='100%' src="https://static.vecteezy.com/system/resources/thumbnails/007/234/999/small/words-with-faq-business-idea-photo.jpg" />
                    </Box>
                    <Box sx={{ margin: '2% 0' }}>
                        <Typography variant='p' sx={{ fontSize: '25px', fontWeight: 'bold' }}>Frequently Asked Questions</Typography>
                    </Box>
                    <Box sx={{ width: '90%', height: '100%' }}>
                        {smallAcor?.map((e, i) => {
                            return (
                                <div>
                                    <Accordion elevation={3} expanded={expanded === i} onChange={() => setExpanded(expanded === i ? null : i)} key={i}>
                                        <AccordionSummary
                                            expandIcon={expanded === i ? <RemoveIcon sx={{ color: '#c5225f' }} /> : <AddIcon sx={{ color: '#f1ac1b' }} />}

                                        >
                                            <Typography component="span" sx={{ fontWeight: 'bold', color: '#c5225f' }}>{e?.title}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <ul style={{ margin: ' 0 2%' }}><li>{e?.description}</li></ul>
                                        </AccordionDetails>
                                    </Accordion><br />
                                </div>
                            )
                        })}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default FAQ
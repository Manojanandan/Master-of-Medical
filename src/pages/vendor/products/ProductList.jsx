import { Box, Card, CardContent, CardMedia, Pagination, Stack, Typography } from '@mui/material'
import React from 'react'
import EastIcon from '@mui/icons-material/East';

const ProductList = () => {
    const data = [
        {
            title: "card title here",
            description: 'card description fghfxgjdfhsdfghsdghd fghdfygredg dfghdfyherb gtwery4wgsdgv'
        },
        {
            title: "card title here",
            description: 'card description'
        },
        {
            title: "card title here",
            description: 'card description'
        },
        {
            title: "card title here",
            description: 'card description'
        },
        {
            title: "card title here",
            description: 'card description'
        },
        {
            title: "card title here",
            description: 'card description'
        },
    ]
    return (
        <Box sx={{ height: 'auto', width: '100%', }}>
            <Stack direction='row'>
                <Typography variant='p' component='div' sx={{ fontSize: '1.7rem', fontWeight: 'bold' }}>Products List</Typography>
            </Stack>
            <Box sx={{ display: 'flex', height: 'auto', width: '95%', margin: '2% auto 0', flexWrap: 'wrap', justifyContent: 'space-between' }}>
               {data?.map((item,key) => {
                return(
                    <Box key={key} sx={{ display: 'flex', width: '400px', height: '200px', background: '#ffff', borderRadius: '10px', boxShadow: 3,marginBottom:'3%', transition: 'transform 0.3s','&:hover': { transform: 'scale(1.04)',boxShadow: 6,} }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 181, borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }}
                            image="data:image/jpeg;base64,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"
                            alt="Live from space album cover"
                        />
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography variant='p' component='div' sx={{ fontSize: '17px', fontWeight: 'bold', width: '190px', height: '48px', textOverflow: 'ellipsis', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{item.title}</Typography>
                            <Typography variant='p' component='div' sx={{ fontSize: '15px', width: '190px', height: '87px', textOverflow: 'ellipsis', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', margin: '5px 0' }}>{item.description}</Typography>
                            <Box sx={{ height: '30px', width: '190px', display: 'flex', justifyContent: 'end', alignItems: 'center', gap: '10px', }}>
                                <Box sx={{ height: 'auto', width: '100px', display: 'flex', justifyContent: 'end', alignItems: 'center', gap: '10px', cursor: 'pointer', }}>
                                    <Typography variant='p' sx={{ fontSize: '15px', fontWeight: 'bold', color: '#c5225f' }}>View All</Typography>
                                    <EastIcon sx={{ color: '#c5225f' }} />
                                </Box>
                            </Box>
                        </CardContent>
                    </Box>
                )
               })
               }
            </Box>
            <Box sx={{height:'60px',width:'95%',margin:'0 auto',display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
                <Stack spacing={2}>
                    <Pagination count={5} color="secondary" size='large' />
                </Stack>
            </Box>
        </Box>
    )
}

export default ProductList
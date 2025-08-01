import React from 'react'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const Star = ({rating}) => {
    return (
        <Stack spacing={1} sx={{margin:'2% 0'}}>
            <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />
        </Stack>
    )
}

export default Star
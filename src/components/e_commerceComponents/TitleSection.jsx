import React from 'react'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { Button, Stack, Typography } from '@mui/material';

const TitleSection = ({title, subTitle}) => {
  return (
    <React.Fragment>
      <Stack direction='row' spacing={5} sx={{ margin: '0 3%', alignItems: 'center' }}>
        <Typography variant='h6' sx={{ fontWeight: 'bold',width:'12%' }}>{title}</Typography>
        <Typography variant='span' sx={{ fontSize: '13px', color: '#867e7e', width: '74%'}}>{subTitle}</Typography>
        <Button variant='outlined' endIcon={<TrendingFlatIcon />} sx={{ fontWeight: 'bold', textTransform: 'capitalize', fontSize: '13px', color: '#c5225f', borderRadius: '10px', outline: '1px solid #c5225f' }}>View All</Button>
      </Stack>
    </React.Fragment>
  )
}

export default TitleSection
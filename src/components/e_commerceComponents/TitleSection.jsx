import React from 'react'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TitleSection = ({ title, subTitle }) => {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate('/customer/products');
  };

  return (
    <React.Fragment>
      <Stack direction='row' spacing={2} sx={{ margin: '0 3%', alignItems: 'center', }}>
        <Typography variant='p' sx={{ fontWeight: 'bold', width: '12%', fontSize: '18px' }}>{title}</Typography>
        <Typography variant='span' sx={{ fontSize: '13px', color: '#867e7e', width: '70%' }}>{subTitle}</Typography>
        <Box sx={{ width: '18%', display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant='outlined' 
            endIcon={<TrendingFlatIcon />} 
            sx={{ fontWeight: 'bold', textTransform: 'capitalize', fontSize: '13px', color: '#c5225f', borderRadius: '10px', outline: '1px solid #c5225f' }}
            onClick={handleViewAll}
          >
            View All
          </Button>
        </Box>
      </Stack>
    </React.Fragment>
  )
}

export default TitleSection
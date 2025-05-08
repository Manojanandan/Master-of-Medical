import React from 'react'
import TitleSection from '../../../components/e_commerceComponents/TitleSection'
import { Box, Button, IconButton, Typography } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import Star from '../../../components/e_commerceComponents/Star';
import AddIcon from '@mui/icons-material/Add';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Link } from 'react-router-dom';

const BestSeller = () => {
  return (
    <React.Fragment>
      <Box sx={{ height: 'auto', width: '100%', margin: '3% 0', }}>
        <TitleSection title={"Best Sellers"} subTitle={"Don't miss this current offers until end of March"} />
        <Box sx={{ height: 'auto', width: '95%', margin: '1% 3%', display: 'flex' }}>
          <Box sx={{ height: 'auto', width: '360px', border: 'solid 1.5px #2424', borderRadius: '10px', margin: '0 0.5% 0 0' }}>
            <Box sx={{ height: '220px', width: '100%', borderBottom: 'solid 1.5px #2424', display: 'flex', padding: '10px 0 0', }}>
              <Box sx={{ height: '100%', width: '50%', padding: '0 2px' }}>
                <Box sx={{ width: '100%', padding: '3px 5px', borderRadius: '20px', color: '#fff', textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ width: '50px', padding: '0px 10px', borderRadius: '20px', backgroundColor: '#c5225f', color: '#fff', textAlign: 'center' }}>
                    <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '12px' }}>50%</Typography>
                  </Box>
                  <Box sx={{ width: '50px', padding: '0', textAlign: 'center' }}>
                    <IconButton sx={{ padding: '0' }} ><FavoriteBorderIcon /></IconButton>
                  </Box>
                </Box>
                <Box sx={{ height: '50%', width: '60%', margin: '5% auto' }}>
                  <img height='100%' width='100%' src="https://www.lifenowhealth.com/cdn/shop/files/Untitled-3_0021_Plantbasedcollagenbuilder.jpg?v=1695386987" alt="" />
                </Box>
                <Button size='small' variant='contained' startIcon={<AcUnitIcon />} sx={{ fontWeight: 'bold', borderRadius: '20px', backgroundColor: 'skyblue', margin: '5% 0 0% 5%', fontSize: '12px' }}>Cold sale</Button>
              </Box>
              <Box sx={{ height: '100%', width: '50%', padding: '0 3% 0 0' }}>
                <Box sx={{ width: '100%', height: '50px', margin: '25% 0 2%' }}>
                  <Typography variant='body1' sx={{ fontWeight: 'bold', textTransform: 'capitalize', textOverflow: 'ellipsis', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', fontSize: '13px' }}>Eur Health Planet Based Collagen builder mix fruit</Typography>
                </Box>
                <Star rating="3" />
                <Typography variant='h5' sx={{ color: '#c5225f', fontWeight: 'bold', marginBottom: '5%', fontSize: '19px' }}>
                  $0.30 <Typography variant='span' sx={{ color: '#242424', fontSize: '14px', fontWeight: '300' }}><strike>$1.30</strike></Typography>
                </Typography>
                <Button endIcon={<AddIcon />} variant='outlined' sx={{ width: '90%', borderRadius: '15px', fontWeight: 'bold', textTransform: 'capitalize', margin: '4% 0' }}>Add to cart</Button>
              </Box>
            </Box>
            <Box sx={{ height: '220px', width: '100%', borderBottom: 'solid 1.5px #2424', display: 'flex', padding: '10px 0 0', }}>
              <Box sx={{ height: '100%', width: '50%', padding: '0 2px' }}>
                <Box sx={{ width: '100%', padding: '3px 5px', borderRadius: '20px', color: '#fff', textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ width: '50px', padding: '0px 10px', borderRadius: '20px', backgroundColor: '#c5225f', color: '#fff', textAlign: 'center' }}>
                    <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '12px' }}>50%</Typography>
                  </Box>
                  <Box sx={{ width: '50px', padding: '0', textAlign: 'center' }}>
                    <IconButton sx={{ padding: '0' }} ><FavoriteBorderIcon /></IconButton>
                  </Box>
                </Box>
                <Box sx={{ height: '50%', width: '60%', margin: '5% auto' }}>
                  <img height='100%' width='100%' src="https://www.lifenowhealth.com/cdn/shop/files/Untitled-3_0021_Plantbasedcollagenbuilder.jpg?v=1695386987" alt="" />
                </Box>
                <Button size='small' variant='contained' startIcon={<AcUnitIcon />} sx={{ fontWeight: 'bold', borderRadius: '20px', backgroundColor: 'skyblue', margin: '5% 0 0% 5%', fontSize: '12px' }}>Cold sale</Button>
              </Box>
              <Box sx={{ height: '100%', width: '50%', padding: '0 3% 0 0' }}>
                <Box sx={{ width: '100%', height: '50px', margin: '25% 0 2%' }}>
                  <Typography variant='body1' sx={{ fontWeight: 'bold', textTransform: 'capitalize', textOverflow: 'ellipsis', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', fontSize: '13px' }}>Eur Health Planet Based Collagen builder mix fruit</Typography>
                </Box>
                <Star rating="3" />
                <Typography variant='h5' sx={{ color: '#c5225f', fontWeight: 'bold', marginBottom: '5%', fontSize: '19px' }}>
                  $0.30 <Typography variant='span' sx={{ color: '#242424', fontSize: '14px', fontWeight: '300' }}><strike>$1.30</strike></Typography>
                </Typography>
                <Button endIcon={<AddIcon />} variant='outlined' sx={{ width: '90%', borderRadius: '15px', fontWeight: 'bold', textTransform: 'capitalize', margin: '4% 0' }}>Add to cart</Button>
              </Box>
            </Box>
            <Box sx={{ height: '220px', width: '100%', display: 'flex', padding: '10px 0 0', }}>
              <Box sx={{ height: '100%', width: '50%', padding: '0 2px' }}>
                <Box sx={{ width: '100%', padding: '3px 5px', borderRadius: '20px', color: '#fff', textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ width: '50px', padding: '0px 10px', borderRadius: '20px', backgroundColor: '#c5225f', color: '#fff', textAlign: 'center' }}>
                    <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '12px' }}>50%</Typography>
                  </Box>
                  <Box sx={{ width: '50px', padding: '0', textAlign: 'center' }}>
                    <IconButton sx={{ padding: '0' }} ><FavoriteBorderIcon /></IconButton>
                  </Box>
                </Box>
                <Box sx={{ height: '50%', width: '60%', margin: '5% auto' }}>
                  <img height='100%' width='100%' src="https://www.lifenowhealth.com/cdn/shop/files/Untitled-3_0021_Plantbasedcollagenbuilder.jpg?v=1695386987" alt="" />
                </Box>
                <Button size='small' variant='contained' startIcon={<AcUnitIcon />} sx={{ fontWeight: 'bold', borderRadius: '20px', backgroundColor: 'skyblue', margin: '5% 0 0% 5%', fontSize: '12px' }}>Cold sale</Button>
              </Box>
              <Box sx={{ height: '100%', width: '50%', padding: '0 3% 0 0' }}>
                <Box sx={{ width: '100%', height: '50px', margin: '25% 0 2%' }}>
                  <Typography variant='body1' sx={{ fontWeight: 'bold', textTransform: 'capitalize', textOverflow: 'ellipsis', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', fontSize: '13px' }}>Eur Health Planet Based Collagen builder mix fruit</Typography>
                </Box>
                <Star rating="3" />
                <Typography variant='h5' sx={{ color: '#c5225f', fontWeight: 'bold', marginBottom: '5%', fontSize: '19px' }}>
                  $0.30 <Typography variant='span' sx={{ color: '#242424', fontSize: '14px', fontWeight: '300' }}><strike>$1.30</strike></Typography>
                </Typography>
                <Button endIcon={<AddIcon />} variant='outlined' sx={{ width: '90%', borderRadius: '15px', fontWeight: 'bold', textTransform: 'capitalize', margin: '4% 0' }}>Add to cart</Button>
              </Box>
            </Box>
          </Box>
          <Box sx={{ height: 'auto', width: '360px', border: 'solid 1.5px #2424', borderRadius: '10px', margin: '0 0.5% 0 0' }}>
            <Box sx={{ margin: '4% 0 0', width: '100%', padding: '3px 20px', borderRadius: '20px', color: '#fff', textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ width: '50px', padding: '3px 10px', borderRadius: '20px', backgroundColor: '#c5225f', color: '#fff', textAlign: 'center' }}>
                <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '12px' }}>50%</Typography>
              </Box>
              <Box sx={{ width: '50px', padding: '0', textAlign: 'center' }}>
                <IconButton sx={{ padding: '0' }} ><FavoriteBorderIcon /></IconButton>
              </Box>
            </Box>
            <Box sx={{ height: '300px', width: '75%', margin: '2% auto' }}>
              <img height='100%' width='100%' src="https://m.media-amazon.com/images/I/41q6LDtUjsL._AC_.jpg" alt="" />
            </Box>
            <Box sx={{ margin: '3% 5%' }}>
              <Star rating="4.5" />
            </Box>
            <Box sx={{ width: '95%', height: '70px', margin: '0 5%' }}>
              <Typography variant='body1' sx={{ fontWeight: 'bold', textTransform: 'capitalize', textOverflow: 'ellipsis', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>Eur Health Planet Based Collagen builder mix fruit</Typography>
            </Box>
            <Typography variant='h5' sx={{ color: '#c5225f', fontWeight: 'bold', margin: '0 5% 2%' }}>
              $0.30 <Typography variant='span' sx={{ color: '#242424', fontSize: '17px', fontWeight: '300' }}><strike>$1.30</strike></Typography>
            </Typography>
            <Box sx={{ width: '90%', height: '80px', margin: '0 5%', }}>
              <Typography variant='p' sx={{ textTransform: 'capitalize', textOverflow: 'ellipsis', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', fontSize: '13px' }}>Eur Health Planet Based Collagen builder mix fruit Eur Health Planet Based Collagen builder mix fruit Eur Health Planet Based Collagen builder mix fruit Eur Health Planet Based Collagen builder mix fruit</Typography>
            </Box>
            <Button startIcon={<ShoppingBagIcon />} variant='contained' sx={{ width: '90%', borderRadius: '10px', fontWeight: 'bold', textTransform: 'capitalize', margin: '10% 5% 2%', padding: '10px', backgroundColor: '#739d5b' }}>Add to cart</Button>
          </Box>
          <Box sx={{ height: 'auto', width: '360px', border: 'solid 1.5px #2424', borderRadius: '10px', margin: '0 0.5% 0 0' }}>
            <Box sx={{ height: '220px', width: '100%', borderBottom: 'solid 1.5px #2424', display: 'flex', padding: '10px 0 0', }}>
              <Box sx={{ height: '100%', width: '50%', padding: '0 2px' }}>
                <Box sx={{ width: '100%', padding: '3px 5px', borderRadius: '20px', color: '#fff', textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ width: '50px', padding: '0px 10px', borderRadius: '20px', backgroundColor: '#c5225f', color: '#fff', textAlign: 'center' }}>
                    <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '12px' }}>50%</Typography>
                  </Box>
                  <Box sx={{ width: '50px', padding: '0', textAlign: 'center' }}>
                    <IconButton sx={{ padding: '0' }} ><FavoriteBorderIcon /></IconButton>
                  </Box>
                </Box>
                <Box sx={{ height: '50%', width: '60%', margin: '5% auto' }}>
                  <img height='100%' width='100%' src="https://www.lifenowhealth.com/cdn/shop/files/Untitled-3_0021_Plantbasedcollagenbuilder.jpg?v=1695386987" alt="" />
                </Box>
                <Button size='small' variant='contained' startIcon={<AcUnitIcon />} sx={{ fontWeight: 'bold', borderRadius: '20px', backgroundColor: 'skyblue', margin: '5% 0 0% 5%', fontSize: '12px' }}>Cold sale</Button>
              </Box>
              <Box sx={{ height: '100%', width: '50%', padding: '0 3% 0 0' }}>
                <Box sx={{ width: '100%', height: '50px', margin: '25% 0 2%' }}>
                  <Typography variant='body1' sx={{ fontWeight: 'bold', textTransform: 'capitalize', textOverflow: 'ellipsis', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', fontSize: '13px' }}>Eur Health Planet Based Collagen builder mix fruit</Typography>
                </Box>
                <Star rating="3" />
                <Typography variant='h5' sx={{ color: '#c5225f', fontWeight: 'bold', marginBottom: '5%', fontSize: '19px' }}>
                  $0.30 <Typography variant='span' sx={{ color: '#242424', fontSize: '14px', fontWeight: '300' }}><strike>$1.30</strike></Typography>
                </Typography>
                <Button endIcon={<AddIcon />} variant='outlined' sx={{ width: '90%', borderRadius: '15px', fontWeight: 'bold', textTransform: 'capitalize', margin: '4% 0' }}>Add to cart</Button>
              </Box>
            </Box>
            <Box sx={{ height: '220px', width: '100%', borderBottom: 'solid 1.5px #2424', display: 'flex', padding: '10px 0 0', }}>
              <Box sx={{ height: '100%', width: '50%', padding: '0 2px' }}>
                <Box sx={{ width: '100%', padding: '3px 5px', borderRadius: '20px', color: '#fff', textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ width: '50px', padding: '0px 10px', borderRadius: '20px', backgroundColor: '#c5225f', color: '#fff', textAlign: 'center' }}>
                    <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '12px' }}>50%</Typography>
                  </Box>
                  <Box sx={{ width: '50px', padding: '0', textAlign: 'center' }}>
                    <IconButton sx={{ padding: '0' }} ><FavoriteBorderIcon /></IconButton>
                  </Box>
                </Box>
                <Box sx={{ height: '50%', width: '60%', margin: '5% auto' }}>
                  <img height='100%' width='100%' src="https://www.lifenowhealth.com/cdn/shop/files/Untitled-3_0021_Plantbasedcollagenbuilder.jpg?v=1695386987" alt="" />
                </Box>
                <Button size='small' variant='contained' startIcon={<AcUnitIcon />} sx={{ fontWeight: 'bold', borderRadius: '20px', backgroundColor: 'skyblue', margin: '5% 0 0% 5%', fontSize: '12px' }}>Cold sale</Button>
              </Box>
              <Box sx={{ height: '100%', width: '50%', padding: '0 3% 0 0' }}>
                <Box sx={{ width: '100%', height: '50px', margin: '25% 0 2%' }}>
                  <Typography variant='body1' sx={{ fontWeight: 'bold', textTransform: 'capitalize', textOverflow: 'ellipsis', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', fontSize: '13px' }}>Eur Health Planet Based Collagen builder mix fruit</Typography>
                </Box>
                <Star rating="3" />
                <Typography variant='h5' sx={{ color: '#c5225f', fontWeight: 'bold', marginBottom: '5%', fontSize: '19px' }}>
                  $0.30 <Typography variant='span' sx={{ color: '#242424', fontSize: '14px', fontWeight: '300' }}><strike>$1.30</strike></Typography>
                </Typography>
                <Button endIcon={<AddIcon />} variant='outlined' sx={{ width: '90%', borderRadius: '15px', fontWeight: 'bold', textTransform: 'capitalize', margin: '4% 0' }}>Add to cart</Button>
              </Box>
            </Box>
            <Box sx={{ height: '220px', width: '100%', display: 'flex', padding: '10px 0 0', }}>
              <Box sx={{ height: '100%', width: '50%', padding: '0 2px' }}>
                <Box sx={{ width: '100%', padding: '3px 5px', borderRadius: '20px', color: '#fff', textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ width: '50px', padding: '0px 10px', borderRadius: '20px', backgroundColor: '#c5225f', color: '#fff', textAlign: 'center' }}>
                    <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '12px' }}>50%</Typography>
                  </Box>
                  <Box sx={{ width: '50px', padding: '0', textAlign: 'center' }}>
                    <IconButton sx={{ padding: '0' }} ><FavoriteBorderIcon /></IconButton>
                  </Box>
                </Box>
                <Box sx={{ height: '50%', width: '60%', margin: '5% auto' }}>
                  <img height='100%' width='100%' src="https://www.lifenowhealth.com/cdn/shop/files/Untitled-3_0021_Plantbasedcollagenbuilder.jpg?v=1695386987" alt="" />
                </Box>
                <Button size='small' variant='contained' startIcon={<AcUnitIcon />} sx={{ fontWeight: 'bold', borderRadius: '20px', backgroundColor: 'skyblue', margin: '5% 0 0% 5%', fontSize: '12px' }}>Cold sale</Button>
              </Box>
              <Box sx={{ height: '100%', width: '50%', padding: '0 3% 0 0' }}>
                <Box sx={{ width: '100%', height: '50px', margin: '25% 0 2%' }}>
                  <Typography variant='body1' sx={{ fontWeight: 'bold', textTransform: 'capitalize', textOverflow: 'ellipsis', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', fontSize: '13px' }}>Eur Health Planet Based Collagen builder mix fruit</Typography>
                </Box>
                <Star rating="3" />
                <Typography variant='h5' sx={{ color: '#c5225f', fontWeight: 'bold', marginBottom: '5%', fontSize: '19px' }}>
                  $0.30 <Typography variant='span' sx={{ color: '#242424', fontSize: '14px', fontWeight: '300' }}><strike>$1.30</strike></Typography>
                </Typography>
                <Button endIcon={<AddIcon />} variant='outlined' sx={{ width: '90%', borderRadius: '15px', fontWeight: 'bold', textTransform: 'capitalize', margin: '4% 0' }}>Add to cart</Button>
              </Box>
            </Box>
          </Box>
          <Box sx={{ height: 'auto', width: '360px', border: 'solid 1.5px #2424', borderRadius: '10px' }}>
            <Box sx={{ height: '220px', width: '100%', borderBottom: 'solid 1.5px #2424', display: 'flex', padding: '10px 0 0', }}>
              <Box sx={{ height: '100%', width: '50%', padding: '0 2px' }}>
                <Box sx={{ width: '100%', padding: '3px 5px', borderRadius: '20px', color: '#fff', textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ width: '50px', padding: '0px 10px', borderRadius: '20px', backgroundColor: '#c5225f', color: '#fff', textAlign: 'center' }}>
                    <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '12px' }}>50%</Typography>
                  </Box>
                  <Box sx={{ width: '50px', padding: '0', textAlign: 'center' }}>
                    <IconButton sx={{ padding: '0' }} ><FavoriteBorderIcon /></IconButton>
                  </Box>
                </Box>
                <Box sx={{ height: '50%', width: '60%', margin: '5% auto' }}>
                  <img height='100%' width='100%' src="https://www.lifenowhealth.com/cdn/shop/files/Untitled-3_0021_Plantbasedcollagenbuilder.jpg?v=1695386987" alt="" />
                </Box>
                <Button size='small' variant='contained' startIcon={<AcUnitIcon />} sx={{ fontWeight: 'bold', borderRadius: '20px', backgroundColor: 'skyblue', margin: '5% 0 0% 5%', fontSize: '12px' }}>Cold sale</Button>
              </Box>
              <Box sx={{ height: '100%', width: '50%', padding: '0 3% 0 0' }}>
                <Box sx={{ width: '100%', height: '50px', margin: '25% 0 2%' }}>
                  <Typography variant='body1' sx={{ fontWeight: 'bold', textTransform: 'capitalize', textOverflow: 'ellipsis', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', fontSize: '13px' }}>Eur Health Planet Based Collagen builder mix fruit</Typography>
                </Box>
                <Star rating="3" />
                <Typography variant='h5' sx={{ color: '#c5225f', fontWeight: 'bold', marginBottom: '5%', fontSize: '19px' }}>
                  $0.30 <Typography variant='span' sx={{ color: '#242424', fontSize: '14px', fontWeight: '300' }}><strike>$1.30</strike></Typography>
                </Typography>
                <Button endIcon={<AddIcon />} variant='outlined' sx={{ width: '90%', borderRadius: '15px', fontWeight: 'bold', textTransform: 'capitalize', margin: '4% 0' }}>Add to cart</Button>
              </Box>
            </Box>
            <Box sx={{ height: '220px', width: '100%', borderBottom: 'solid 1.5px #2424', display: 'flex', padding: '10px 0 0', }}>
              <Box sx={{ height: '100%', width: '50%', padding: '0 2px' }}>
                <Box sx={{ width: '100%', padding: '3px 5px', borderRadius: '20px', color: '#fff', textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ width: '50px', padding: '0px 10px', borderRadius: '20px', backgroundColor: '#c5225f', color: '#fff', textAlign: 'center' }}>
                    <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '12px' }}>50%</Typography>
                  </Box>
                  <Box sx={{ width: '50px', padding: '0', textAlign: 'center' }}>
                    <IconButton sx={{ padding: '0' }} ><FavoriteBorderIcon /></IconButton>
                  </Box>
                </Box>
                <Box sx={{ height: '50%', width: '60%', margin: '5% auto' }}>
                  <img height='100%' width='100%' src="https://www.lifenowhealth.com/cdn/shop/files/Untitled-3_0021_Plantbasedcollagenbuilder.jpg?v=1695386987" alt="" />
                </Box>
                <Button size='small' variant='contained' startIcon={<AcUnitIcon />} sx={{ fontWeight: 'bold', borderRadius: '20px', backgroundColor: 'skyblue', margin: '5% 0 0% 5%', fontSize: '12px' }}>Cold sale</Button>
              </Box>
              <Box sx={{ height: '100%', width: '50%', padding: '0 3% 0 0' }}>
                <Box sx={{ width: '100%', height: '50px', margin: '25% 0 2%' }}>
                  <Typography variant='body1' sx={{ fontWeight: 'bold', textTransform: 'capitalize', textOverflow: 'ellipsis', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', fontSize: '13px' }}>Eur Health Planet Based Collagen builder mix fruit</Typography>
                </Box>
                <Star rating="3" />
                <Typography variant='h5' sx={{ color: '#c5225f', fontWeight: 'bold', marginBottom: '5%', fontSize: '19px' }}>
                  $0.30 <Typography variant='span' sx={{ color: '#242424', fontSize: '14px', fontWeight: '300' }}><strike>$1.30</strike></Typography>
                </Typography>
                <Button endIcon={<AddIcon />} variant='outlined' sx={{ width: '90%', borderRadius: '15px', fontWeight: 'bold', textTransform: 'capitalize', margin: '4% 0' }}>Add to cart</Button>
              </Box>
            </Box>
            <Box sx={{ height: '220px', width: '100%', display: 'flex', padding: '10px 0 0', }}>
              <Box sx={{ height: '100%', width: '50%', padding: '0 2px' }}>
                <Box sx={{ width: '100%', padding: '3px 5px', borderRadius: '20px', color: '#fff', textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ width: '50px', padding: '0px 10px', borderRadius: '20px', backgroundColor: '#c5225f', color: '#fff', textAlign: 'center' }}>
                    <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '12px' }}>50%</Typography>
                  </Box>
                  <Box sx={{ width: '50px', padding: '0', textAlign: 'center' }}>
                    <IconButton sx={{ padding: '0' }} ><FavoriteBorderIcon /></IconButton>
                  </Box>
                </Box>
                <Box sx={{ height: '50%', width: '60%', margin: '5% auto' }}>
                  <img height='100%' width='100%' src="https://www.lifenowhealth.com/cdn/shop/files/Untitled-3_0021_Plantbasedcollagenbuilder.jpg?v=1695386987" alt="" />
                </Box>
                <Button size='small' variant='contained' startIcon={<AcUnitIcon />} sx={{ fontWeight: 'bold', borderRadius: '20px', backgroundColor: 'skyblue', margin: '5% 0 0% 5%', fontSize: '12px' }}>Cold sale</Button>
              </Box>
              <Box sx={{ height: '100%', width: '50%', padding: '0 3% 0 0' }}>
                <Box sx={{ width: '100%', height: '50px', margin: '25% 0 2%' }}>
                  <Typography variant='body1' sx={{ fontWeight: 'bold', textTransform: 'capitalize', textOverflow: 'ellipsis', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', fontSize: '13px' }}>Eur Health Planet Based Collagen builder mix fruit</Typography>
                </Box>
                <Star rating="3" />
                <Typography variant='h5' sx={{ color: '#c5225f', fontWeight: 'bold', marginBottom: '5%', fontSize: '19px' }}>
                  $0.30 <Typography variant='span' sx={{ color: '#242424', fontSize: '14px', fontWeight: '300' }}><strike>$1.30</strike></Typography>
                </Typography>
                <Button endIcon={<AddIcon />} variant='outlined' sx={{ width: '90%', borderRadius: '15px', fontWeight: 'bold', textTransform: 'capitalize', margin: '4% 0' }}>Add to cart</Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ height: 'auto', width: '95%', margin: '3% 3%', display: 'flex' }}>
          <Box sx={{ height: 'auto', width: '360px', border: 'solid 1.5px #2424', borderRadius: '10px', margin: '0 0.5% 0 0' }}>
            <Box sx={{ height: '220px', width: '100%', borderBottom: 'solid 1.5px #2424', display: 'flex', padding: '10px 0 0', }}>
              <Box sx={{ height: '100%', width: '50%', padding: '0 2px' }}>
                <Box sx={{ width: '100%', padding: '3px 5px', borderRadius: '20px', color: '#fff', textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ width: '50px', padding: '0px 10px', borderRadius: '20px', backgroundColor: '#c5225f', color: '#fff', textAlign: 'center' }}>
                    <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '12px' }}>50%</Typography>
                  </Box>
                  <Box sx={{ width: '50px', padding: '0', textAlign: 'center' }}>
                    <IconButton sx={{ padding: '0' }} ><FavoriteBorderIcon /></IconButton>
                  </Box>
                </Box>
                <Box sx={{ height: '50%', width: '60%', margin: '5% auto' }}>
                  <img height='100%' width='100%' src="https://www.lifenowhealth.com/cdn/shop/files/Untitled-3_0021_Plantbasedcollagenbuilder.jpg?v=1695386987" alt="" />
                </Box>
                <Button size='small' variant='contained' startIcon={<AcUnitIcon />} sx={{ fontWeight: 'bold', borderRadius: '20px', backgroundColor: 'skyblue', margin: '5% 0 0% 5%', fontSize: '12px' }}>Cold sale</Button>
              </Box>
              <Box sx={{ height: '100%', width: '50%', padding: '0 3% 0 0' }}>
                <Box sx={{ width: '100%', height: '50px', margin: '25% 0 2%' }}>
                  <Typography variant='body1' sx={{ fontWeight: 'bold', textTransform: 'capitalize', textOverflow: 'ellipsis', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', fontSize: '13px' }}>Eur Health Planet Based Collagen builder mix fruit</Typography>
                </Box>
                <Star rating="3" />
                <Typography variant='h5' sx={{ color: '#c5225f', fontWeight: 'bold', marginBottom: '5%', fontSize: '19px' }}>
                  $0.30 <Typography variant='span' sx={{ color: '#242424', fontSize: '14px', fontWeight: '300' }}><strike>$1.30</strike></Typography>
                </Typography>
                <Button endIcon={<AddIcon />} variant='outlined' sx={{ width: '90%', borderRadius: '15px', fontWeight: 'bold', textTransform: 'capitalize', margin: '4% 0' }}>Add to cart</Button>
              </Box>
            </Box>
            <Box sx={{ height: '220px', width: '100%', borderBottom: 'solid 1.5px #2424', display: 'flex', padding: '10px 0 0', }}>
              <Box sx={{ height: '100%', width: '50%', padding: '0 2px' }}>
                <Box sx={{ width: '100%', padding: '3px 5px', borderRadius: '20px', color: '#fff', textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ width: '50px', padding: '0px 10px', borderRadius: '20px', backgroundColor: '#c5225f', color: '#fff', textAlign: 'center' }}>
                    <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '12px' }}>50%</Typography>
                  </Box>
                  <Box sx={{ width: '50px', padding: '0', textAlign: 'center' }}>
                    <IconButton sx={{ padding: '0' }} ><FavoriteBorderIcon /></IconButton>
                  </Box>
                </Box>
                <Box sx={{ height: '50%', width: '60%', margin: '5% auto' }}>
                  <img height='100%' width='100%' src="https://www.lifenowhealth.com/cdn/shop/files/Untitled-3_0021_Plantbasedcollagenbuilder.jpg?v=1695386987" alt="" />
                </Box>
                <Button size='small' variant='contained' startIcon={<AcUnitIcon />} sx={{ fontWeight: 'bold', borderRadius: '20px', backgroundColor: 'skyblue', margin: '5% 0 0% 5%', fontSize: '12px' }}>Cold sale</Button>
              </Box>
              <Box sx={{ height: '100%', width: '50%', padding: '0 3% 0 0' }}>
                <Box sx={{ width: '100%', height: '50px', margin: '25% 0 2%' }}>
                  <Typography variant='body1' sx={{ fontWeight: 'bold', textTransform: 'capitalize', textOverflow: 'ellipsis', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', fontSize: '13px' }}>Eur Health Planet Based Collagen builder mix fruit</Typography>
                </Box>
                <Star rating="3" />
                <Typography variant='h5' sx={{ color: '#c5225f', fontWeight: 'bold', marginBottom: '5%', fontSize: '19px' }}>
                  $0.30 <Typography variant='span' sx={{ color: '#242424', fontSize: '14px', fontWeight: '300' }}><strike>$1.30</strike></Typography>
                </Typography>
                <Button endIcon={<AddIcon />} variant='outlined' sx={{ width: '90%', borderRadius: '15px', fontWeight: 'bold', textTransform: 'capitalize', margin: '4% 0' }}>Add to cart</Button>
              </Box>
            </Box>
            <Box sx={{ height: '220px', width: '100%', display: 'flex', padding: '10px 0 0', }}>
              <Box sx={{ height: '100%', width: '50%', padding: '0 2px' }}>
                <Box sx={{ width: '100%', padding: '3px 5px', borderRadius: '20px', color: '#fff', textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ width: '50px', padding: '0px 10px', borderRadius: '20px', backgroundColor: '#c5225f', color: '#fff', textAlign: 'center' }}>
                    <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '12px' }}>50%</Typography>
                  </Box>
                  <Box sx={{ width: '50px', padding: '0', textAlign: 'center' }}>
                    <IconButton sx={{ padding: '0' }} ><FavoriteBorderIcon /></IconButton>
                  </Box>
                </Box>
                <Box sx={{ height: '50%', width: '60%', margin: '5% auto' }}>
                  <img height='100%' width='100%' src="https://www.lifenowhealth.com/cdn/shop/files/Untitled-3_0021_Plantbasedcollagenbuilder.jpg?v=1695386987" alt="" />
                </Box>
                <Button size='small' variant='contained' startIcon={<AcUnitIcon />} sx={{ fontWeight: 'bold', borderRadius: '20px', backgroundColor: 'skyblue', margin: '5% 0 0% 5%', fontSize: '12px' }}>Cold sale</Button>
              </Box>
              <Box sx={{ height: '100%', width: '50%', padding: '0 3% 0 0' }}>
                <Box sx={{ width: '100%', height: '50px', margin: '25% 0 2%' }}>
                  <Typography variant='body1' sx={{ fontWeight: 'bold', textTransform: 'capitalize', textOverflow: 'ellipsis', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', fontSize: '13px' }}>Eur Health Planet Based Collagen builder mix fruit</Typography>
                </Box>
                <Star rating="3" />
                <Typography variant='h5' sx={{ color: '#c5225f', fontWeight: 'bold', marginBottom: '5%', fontSize: '19px' }}>
                  $0.30 <Typography variant='span' sx={{ color: '#242424', fontSize: '14px', fontWeight: '300' }}><strike>$1.30</strike></Typography>
                </Typography>
                <Button endIcon={<AddIcon />} variant='outlined' sx={{ width: '90%', borderRadius: '15px', fontWeight: 'bold', textTransform: 'capitalize', margin: '4% 0' }}>Add to cart</Button>
              </Box>
            </Box>
          </Box>
          <Box sx={{ height: 'auto', width: '360px', border: 'solid 1.5px #2424', borderRadius: '10px', margin: '0 0.5% 0 0' }}>
            <Box sx={{ height: '220px', width: '100%', borderBottom: 'solid 1.5px #2424', display: 'flex', padding: '10px 0 0', }}>
              <Box sx={{ height: '100%', width: '50%', padding: '0 2px' }}>
                <Box sx={{ width: '100%', padding: '3px 5px', borderRadius: '20px', color: '#fff', textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ width: '50px', padding: '0px 10px', borderRadius: '20px', backgroundColor: '#c5225f', color: '#fff', textAlign: 'center' }}>
                    <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '12px' }}>50%</Typography>
                  </Box>
                  <Box sx={{ width: '50px', padding: '0', textAlign: 'center' }}>
                    <IconButton sx={{ padding: '0' }} ><FavoriteBorderIcon /></IconButton>
                  </Box>
                </Box>
                <Box sx={{ height: '50%', width: '60%', margin: '5% auto' }}>
                  <img height='100%' width='100%' src="https://www.lifenowhealth.com/cdn/shop/files/Untitled-3_0021_Plantbasedcollagenbuilder.jpg?v=1695386987" alt="" />
                </Box>
                <Button size='small' variant='contained' startIcon={<AcUnitIcon />} sx={{ fontWeight: 'bold', borderRadius: '20px', backgroundColor: 'skyblue', margin: '5% 0 0% 5%', fontSize: '12px' }}>Cold sale</Button>
              </Box>
              <Box sx={{ height: '100%', width: '50%', padding: '0 3% 0 0' }}>
                <Box sx={{ width: '100%', height: '50px', margin: '25% 0 2%' }}>
                  <Typography variant='body1' sx={{ fontWeight: 'bold', textTransform: 'capitalize', textOverflow: 'ellipsis', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', fontSize: '13px' }}>Eur Health Planet Based Collagen builder mix fruit</Typography>
                </Box>
                <Star rating="3" />
                <Typography variant='h5' sx={{ color: '#c5225f', fontWeight: 'bold', marginBottom: '5%', fontSize: '19px' }}>
                  $0.30 <Typography variant='span' sx={{ color: '#242424', fontSize: '14px', fontWeight: '300' }}><strike>$1.30</strike></Typography>
                </Typography>
                <Button endIcon={<AddIcon />} variant='outlined' sx={{ width: '90%', borderRadius: '15px', fontWeight: 'bold', textTransform: 'capitalize', margin: '4% 0' }}>Add to cart</Button>
              </Box>
            </Box>
            <Box sx={{ height: '220px', width: '100%', borderBottom: 'solid 1.5px #2424', display: 'flex', padding: '10px 0 0', }}>
              <Box sx={{ height: '100%', width: '50%', padding: '0 2px' }}>
                <Box sx={{ width: '100%', padding: '3px 5px', borderRadius: '20px', color: '#fff', textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ width: '50px', padding: '0px 10px', borderRadius: '20px', backgroundColor: '#c5225f', color: '#fff', textAlign: 'center' }}>
                    <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '12px' }}>50%</Typography>
                  </Box>
                  <Box sx={{ width: '50px', padding: '0', textAlign: 'center' }}>
                    <IconButton sx={{ padding: '0' }} ><FavoriteBorderIcon /></IconButton>
                  </Box>
                </Box>
                <Box sx={{ height: '50%', width: '60%', margin: '5% auto' }}>
                  <img height='100%' width='100%' src="https://www.lifenowhealth.com/cdn/shop/files/Untitled-3_0021_Plantbasedcollagenbuilder.jpg?v=1695386987" alt="" />
                </Box>
                <Button size='small' variant='contained' startIcon={<AcUnitIcon />} sx={{ fontWeight: 'bold', borderRadius: '20px', backgroundColor: 'skyblue', margin: '5% 0 0% 5%', fontSize: '12px' }}>Cold sale</Button>
              </Box>
              <Box sx={{ height: '100%', width: '50%', padding: '0 3% 0 0' }}>
                <Box sx={{ width: '100%', height: '50px', margin: '25% 0 2%' }}>
                  <Typography variant='body1' sx={{ fontWeight: 'bold', textTransform: 'capitalize', textOverflow: 'ellipsis', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', fontSize: '13px' }}>Eur Health Planet Based Collagen builder mix fruit</Typography>
                </Box>
                <Star rating="3" />
                <Typography variant='h5' sx={{ color: '#c5225f', fontWeight: 'bold', marginBottom: '5%', fontSize: '19px' }}>
                  $0.30 <Typography variant='span' sx={{ color: '#242424', fontSize: '14px', fontWeight: '300' }}><strike>$1.30</strike></Typography>
                </Typography>
                <Button endIcon={<AddIcon />} variant='outlined' sx={{ width: '90%', borderRadius: '15px', fontWeight: 'bold', textTransform: 'capitalize', margin: '4% 0' }}>Add to cart</Button>
              </Box>
            </Box>
            <Box sx={{ height: '220px', width: '100%', display: 'flex', padding: '10px 0 0', }}>
              <Box sx={{ height: '100%', width: '50%', padding: '0 2px' }}>
                <Box sx={{ width: '100%', padding: '3px 5px', borderRadius: '20px', color: '#fff', textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ width: '50px', padding: '0px 10px', borderRadius: '20px', backgroundColor: '#c5225f', color: '#fff', textAlign: 'center' }}>
                    <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '12px' }}>50%</Typography>
                  </Box>
                  <Box sx={{ width: '50px', padding: '0', textAlign: 'center' }}>
                    <IconButton sx={{ padding: '0' }} ><FavoriteBorderIcon /></IconButton>
                  </Box>
                </Box>
                <Box sx={{ height: '50%', width: '60%', margin: '5% auto' }}>
                  <img height='100%' width='100%' src="https://www.lifenowhealth.com/cdn/shop/files/Untitled-3_0021_Plantbasedcollagenbuilder.jpg?v=1695386987" alt="" />
                </Box>
                <Button size='small' variant='contained' startIcon={<AcUnitIcon />} sx={{ fontWeight: 'bold', borderRadius: '20px', backgroundColor: 'skyblue', margin: '5% 0 0% 5%', fontSize: '12px' }}>Cold sale</Button>
              </Box>
              <Box sx={{ height: '100%', width: '50%', padding: '0 3% 0 0' }}>
                <Box sx={{ width: '100%', height: '50px', margin: '25% 0 2%' }}>
                  <Typography variant='body1' sx={{ fontWeight: 'bold', textTransform: 'capitalize', textOverflow: 'ellipsis', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', fontSize: '13px' }}>Eur Health Planet Based Collagen builder mix fruit</Typography>
                </Box>
                <Star rating="3" />
                <Typography variant='h5' sx={{ color: '#c5225f', fontWeight: 'bold', marginBottom: '5%', fontSize: '19px' }}>
                  $0.30 <Typography variant='span' sx={{ color: '#242424', fontSize: '14px', fontWeight: '300' }}><strike>$1.30</strike></Typography>
                </Typography>
                <Button endIcon={<AddIcon />} variant='outlined' sx={{ width: '90%', borderRadius: '15px', fontWeight: 'bold', textTransform: 'capitalize', margin: '4% 0' }}>Add to cart</Button>
              </Box>
            </Box>
          </Box>
          <Box sx={{ height: '440px', width: '680px', border: 'solid 1.5px #2424', borderRadius: '10px' }}>
            <Box sx={{ height: '100%', width: '100%', display: 'flex', padding: '10px 0 0', }}>
              <Box sx={{ height: 'auto', width: '50%', padding: '0 2px' }}>
                <Box sx={{ width: '100%', padding: '3px 15px', borderRadius: '20px', color: '#fff', textAlign: 'center', display: 'flex', justifyContent: 'space-between', }}>
                  <Box sx={{ width: '50px', padding: '0px 10px', borderRadius: '20px', backgroundColor: '#c5225f', color: '#fff', textAlign: 'center' }}>
                    <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '12px' }}>50%</Typography>
                  </Box>
                  <Box sx={{ width: '50px', padding: '0', textAlign: 'center' }}>
                    <IconButton sx={{ padding: '0' }} ><FavoriteBorderIcon /></IconButton>
                  </Box>
                </Box>
                <Box sx={{ height: '300px', width: '90%', margin: '5% auto',}}>
                  <img height='100%' width='100%' src="https://www.lifenowhealth.com/cdn/shop/files/Untitled-3_0021_Plantbasedcollagenbuilder.jpg?v=1695386987" alt="" />
                </Box>
                <Button size='small' variant='contained' startIcon={<AcUnitIcon />} sx={{ fontWeight: 'bold', borderRadius: '20px', backgroundColor: 'skyblue', margin: '5% 0 0% 5%', fontSize: '12px' }}>Cold sale</Button>
              </Box>
              <Box sx={{ height: 'auto', width: '50%', padding: '0 3%', }}>
                <Box sx={{ margin: '15% 0 5%' }}>
                  <Star rating="3" />
                </Box>
                <Box sx={{ width: '100%', height: '60px', margin: '5% 0 2%' }}>
                  <Typography variant='body1' sx={{ fontWeight: 'bold', textTransform: 'capitalize', textOverflow: 'ellipsis', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', fontSize: '14px' }}>Eur Health Planet Based Collagen builder mix fruit</Typography>
                </Box>
                <Typography variant='h5' sx={{ color: '#c5225f', fontWeight: 'bold', marginBottom: '5%', }}>
                  $0.30 <Typography variant='span' sx={{ color: '#242424', fontSize: '15px', fontWeight: '300' }}><strike>$1.30</strike></Typography>
                </Typography>
                <Box sx={{ width: '95%', height: '100px', margin: '0 5% 0 0%'}}>
                  <Typography variant='p' sx={{ textTransform: 'capitalize', textOverflow: 'ellipsis', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical', fontSize: '14px' }}>Eur Health Planet Based Collagen builder mix fruit Eur Health Planet Based Collagen builder mix fruit Eur Health Planet Based Collagen builder mix fruit Eur Health Planet Based Collagen builder mix fruit Eur Health Planet Based Collagen builder mix fruit</Typography>
                </Box>
                <Button startIcon={<ShoppingBagIcon />} variant='contained' sx={{ width: '90%', borderRadius: '10px', fontWeight: 'bold', textTransform: 'capitalize', margin: '10% 5% 2%', padding: '10px', backgroundColor: '#739d5b' }}>Add to cart</Button>
                </Box>
            </Box>
            <Box sx={{ height: '200px', width: '680px', borderRadius: '10px', margin: '3% 0.5% 0 0' }}>
              <Link to=''><img height='200px' width='100%' style={{borderRadius:'10px'}} src="data:image/jpeg;base64,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" alt="" /></Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default BestSeller
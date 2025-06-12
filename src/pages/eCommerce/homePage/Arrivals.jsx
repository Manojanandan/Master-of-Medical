import React from 'react'
import TitleSection from '../../../components/e_commerceComponents/TitleSection'
import { Box } from '@mui/material'
import ProductCard from '../../../components/e_commerceComponents/ProductCard'

const Arrivals = () => {
    const onClick =() =>{
        console.log("arrival")
    }
    const arrivalsJson =[
        {
            offer: '70%',
            image: "https://www.lifenowhealth.com/cdn/shop/files/Untitled-3_0021_Plantbasedcollagenbuilder.jpg?v=1695386987",
            badge: "cold sale",
            title: "Eur Health Planet Based Collagen builder mix fruit",
            rating: '3.5',
            price: '30.00',
            onClick: onClick(),
        },
        {
            offer: '70%',
            image: "https://www.lifenowhealth.com/cdn/shop/files/Untitled-3_0021_Plantbasedcollagenbuilder.jpg?v=1695386987",
            badge: "cold sale",
            title: "Eur Health Planet Based Collagen builder mix fruit",
            rating: '3.5',
            price: '30.00',
            onClick: onClick(),
        },
        {
            offer: '70%',
            image: "https://www.lifenowhealth.com/cdn/shop/files/Untitled-3_0021_Plantbasedcollagenbuilder.jpg?v=1695386987",
            badge: "cold sale",
            title: "Eur Health Planet Based Collagen builder mix fruit",
            rating: '3.5',
            price: '30.00',
            onClick: onClick(),
        },
        {
            offer: '70%',
            image: "https://www.lifenowhealth.com/cdn/shop/files/Untitled-3_0021_Plantbasedcollagenbuilder.jpg?v=1695386987",
            badge: "cold sale",
            title: "Eur Health Planet Based Collagen builder mix fruit",
            rating: '3.5',
            price: '30.00',
            onClick: onClick(),
        },
    ]
  return (
    <React.Fragment>
        <Box sx={{height:'auto',width:'100%',margin:'2% 0',}}>
            <TitleSection title={"New Arrivals"} subTitle={"Don't miss this opportunity at a special discount just for this week."} />
            <Box sx={{display:'flex',justifyContent:'flex-start',margin: '1% 3% 1%',width:'95%',flexWrap:'wrap',gap:'4%'}}>
                {arrivalsJson?.map((e,i)=>{
                    return(
                        <ProductCard key={i} offer={e?.offer} image={e?.image} badge={e?.badge} title={e?.title} rating={e?.rating} price={e?.price} onClick={onClick} />
                    )
                })}
            </Box>
        </Box>
    </React.Fragment>
  )
}

export default Arrivals
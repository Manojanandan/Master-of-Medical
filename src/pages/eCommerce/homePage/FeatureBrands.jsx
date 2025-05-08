import { Box, Paper } from '@mui/material'
import React from 'react'
import TitleSection from '../../../components/e_commerceComponents/TitleSection'

const FeatureBrands = () => {
    const brandList = [
        {
            image: "https://www.cetaphil.com/on/demandware.static/Sites-Galderma-US-Site/-/default/dw0e792d48/images/Cetaphil_Logo_285.png",
        },
        {
            image: "https://ik.imagekit.io/anscommerce/image/tr:e-sharpen-01,h-627,w-1200,cm-pad_resize/catalog/brandstore/drmorepen/911-1724869800-633-1718735400-dr.morepenlogo181x63.webp",
        },
        {
            image: "https://cdn.shopify.com/s/files/1/0272/4714/9155/files/logo-aboutus.png?1207",
        },
        {
            image: "https://mir-s3-cdn-cf.behance.net/projects/404/5429e8163700417.Y3JvcCw0MDA5LDMxMzUsMCwyODc.jpg",
        },
        {
            image: "https://cdn.kindlife.in/images/feature_variant/54/LOGO.png?t=1692456956",
        },
        {
            image: "https://static.wixstatic.com/media/1ec870_df12fb5102d34eef834d984aac1cd204~mv2.webp/v1/fill/w_758,h_500,al_c,q_85,enc_avif,quality_auto/optimumnutrition_758x500.webp",
        },
        {
            image: "https://www.cetaphil.com/on/demandware.static/Sites-Galderma-US-Site/-/default/dw0e792d48/images/Cetaphil_Logo_285.png",
        },
        {
            image: "https://ik.imagekit.io/anscommerce/image/tr:e-sharpen-01,h-627,w-1200,cm-pad_resize/catalog/brandstore/drmorepen/911-1724869800-633-1718735400-dr.morepenlogo181x63.webp",
        },
        {
            image: "https://cdn.shopify.com/s/files/1/0272/4714/9155/files/logo-aboutus.png?1207",
        },
        {
            image: "https://mir-s3-cdn-cf.behance.net/projects/404/5429e8163700417.Y3JvcCw0MDA5LDMxMzUsMCwyODc.jpg",
        },
        
    ]
    return (
        <React.Fragment>
            <Box sx={{ height: 'auto', width: '100%', margin: '2% 0', }}>
                <TitleSection title={"Feature Brands"} subTitle={"Check Out Our Latest Brands"} />
                <Box sx={{ display: 'flex', justifyContent: 'space-around', margin: '2% 3%', width: '95%',  }}>
                    {brandList?.map((e, i) => {
                        return (
                            <Box sx={{ width: '100px', height: '100px', borderRadius: '50%', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
                                <img style={{ margin: '22% 10%' }} height='50px' width='80px' src={e?.image} alt={e?.image} />
                            </Box>
                        )
                    })}
                </Box>
            </Box>
        </React.Fragment>
    )
}
export default FeatureBrands
import { Box, Typography, Button } from '@mui/material'
import { t } from 'i18next'
import React, { SetStateAction, useEffect, useState } from 'react'
import EnterPriseInterface from '../interfaces/enterprise'

import {  join} from '@tauri-apps/api/path';

import { convertFileSrc  } from '@tauri-apps/api/tauri';



type EnterPriseType = {
   enterprise: EnterPriseInterface
   setEnterprise: React.Dispatch<SetStateAction<EnterPriseInterface>>
   edit: boolean
   setEdit: React.Dispatch<SetStateAction<boolean>>
   img: string
}


export const EnterPriseView = ({
   enterprise,
   img,
   edit, setEdit }: EnterPriseType) => {
   const [imgSrc, setImgSrc] = useState<string>("")


   useEffect(() => {
      const fetchImg = async () => {

         const filePath = await join('enterprise.jpg')

         setImgSrc(convertFileSrc(filePath))
        

      }

      fetchImg()

    

   }, [])



   return <Box >
      <Box maxWidth={"150px"}>

         <Typography
            variant='h5'
            noWrap
            textOverflow={"ellipsis"}
            maxWidth={"250px"}
         >
            {enterprise.name}

         </Typography>


         <Typography
            noWrap
            textOverflow={"ellipsis"}
            maxWidth={"250px"}
            textAlign={"left"}
            sx={{
               direction: "ltr"
            }}
            variant='h6'>{enterprise.subname} </Typography>

         <Box width={"150px"} my={1}>
            <img id='imgSrc' style={{
               display: "inline-block"

            }} src={imgSrc + "?v=" + Date.now()} key={img} alt='enterprise logo' />
         </Box>
      </Box>
      <Button sx={{ width: "100%", marginInline: "auto" }} variant='contained'
         onClick={() => setEdit(!edit)}
      >{t("Edit")}</Button>


   </Box>;
}


export default EnterPriseView
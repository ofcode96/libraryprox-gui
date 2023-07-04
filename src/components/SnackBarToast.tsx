import {  AlertProps, Snackbar } from '@mui/material'
import { useContext, useState } from 'react'
import { SnackBarContext } from '../contexts/SnackBarContext'
import { LanguageContext } from '../contexts/LanguageContext'
import MuiAlert from '@mui/material/Alert';
import React from 'react';
import SuccessSound from "../assets/sounds/success.mp3"
import { SoundContext } from '../contexts/Soundeffect';
import { t } from 'i18next';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
   props,
   ref,
 ) {
   return <MuiAlert elevation={8} ref={ref} variant="filled" {...props} />;
 });
 

function SnackBarToast() {
   const [openSnack, setOpenSnack] = useContext(SnackBarContext)
   const [dir,] = useContext(LanguageContext)
   const {sound, setSound} = useContext(SoundContext)

   const openSound =()=>{
      if(openSnack.open){
         if(sound){
            return  <audio autoPlay>
            <source src={SuccessSound}  />
         </audio>
         }
      }
   }

   return (
      <>
         <Snackbar
            autoHideDuration={2000}
            open={openSnack.open}
            anchorOrigin={{
               horizontal:dir === "rtl" ? "right":"left",
               vertical:"bottom"
            }}
            onClose={() => setOpenSnack({...openSnack,open:false})}
         >
            <Alert sx={{ width: '100%' }} severity={openSnack.severity}>{t(openSnack.msg!)}
            </Alert>
         
         </Snackbar>
         {openSound()}
        
      </>
   )
}

export default SnackBarToast
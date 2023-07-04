import { Fab } from '@mui/material'
import React, { useContext } from 'react'
import { LanguageContext } from '../contexts/LanguageContext'
import { Add } from '@mui/icons-material'

interface FloatingActionButtonProps{
   onclick : React.MouseEventHandler<HTMLButtonElement> | undefined
}

export default function FloatingActionButton({onclick}:FloatingActionButtonProps) {
   const [dir,] = useContext(LanguageContext)
   
   return (
      <Fab
      className='heartbeat'
         onClick={onclick}
         sx={{
            position: "fixed",
            bottom: "25px",
            right: dir === "rtl" ? "95%" : "0",
            left: dir === "ltr" ? "95%" : "0",
            zIndex: 1000
         }}>
         <Add />
      </Fab>)
}

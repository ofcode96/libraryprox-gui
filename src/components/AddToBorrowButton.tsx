import { Add } from '@mui/icons-material'
import { Tooltip, IconButton, SxProps, Theme } from '@mui/material'
import { t } from 'i18next'
import React from 'react'

export type AddToBorrowButtonProps = {
   onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined,
   isActive?: boolean
}

export default function AddToBorrowButton({ onClick, isActive: isActive = true }: AddToBorrowButtonProps) {
   
   const sx: SxProps<Theme> | undefined = {
      backgroundColor: isActive ? "green" : "red",
      color:"white",
      ":disabled":{
         backgroundColor: isActive ? "green" : "red",
         color:"white"
      }
   }
   return (
      <Tooltip title={isActive ? t("add to borrow"):t("cant add to borrow")}>
         <IconButton 
            disabled={!isActive && true}
         sx={sx}
            size='small' onClick={onClick}>
            <Add />
         </IconButton>
      </Tooltip>
   )
}

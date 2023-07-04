import { Alert, Box, Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { SetStateAction, useContext, useState } from 'react'
import { BorrowAddContext, BorrowAddInterface } from '../contexts/BorrowAddContext'
import { BorrowContext } from '../contexts/BorrowContext'
import { bookApi, borrowApi } from '../constants/utils'
import { SnackBarContext } from '../contexts/SnackBarContext'
import BorrowInterface from '../interfaces/borrow'
import useMe from '../hooks/useMe'
import { logger } from '../helpers/Logger'
import { t } from 'i18next'
import { error } from 'console'

type AddNewBorrowFormProps = {
   setNewBorrow: React.Dispatch<SetStateAction<boolean>>
}

export default function AddBorrowForm({ setNewBorrow }: AddNewBorrowFormProps) {

   const { setBorrowSaved, borrowSaved } = useContext(BorrowAddContext)
   const [openSnack, setOpenSnack] = useContext(SnackBarContext)
   const { setBorrows } = useContext(BorrowContext)

   let id = Math.floor(Date.now() * Math.random() + (Math.random() * 1000))

   const [addBorrow, setAddBorrow] = useState<BorrowInterface>({
      id,
      book_id: borrowSaved.bookId,
      start_date: "",
      state: 0,
      student_id: borrowSaved.studentId,
      end_date: "",
      owner_id: 0

   })

   const currentUser = useMe()

   const [error, setError] = useState(false)

   const newBorrow = async (e: React.FormEvent) => {
      e.preventDefault()

      if(addBorrow.start_date?.length === 0 || addBorrow.end_date?.length === 0 ){
         setError(true)
         return
      }

      await borrowApi.add(addBorrow)


      setAddBorrow(
         {
            ...addBorrow,
            id: Math.floor(Date.now() * Math.random() + (Math.random() * 1000)
            )
         })

      setNewBorrow(false)

      setOpenSnack({ ...openSnack, open: true, msg: "add new borrow" })

      const updateborrows = await borrowApi.all()

      setBorrows(updateborrows)

      await bookApi.update({ is_aviable: false, last_browed: addBorrow.student_id! }, addBorrow.book_id!)

      localStorage.setItem('borrowAdd', JSON.stringify(null))

       // log new oprations
       logger(`add new borrow ${id}`, currentUser?.username!)


   }
   return (
      <Dialog
         open={true}
         onClose={() => setNewBorrow(false)}
      >
         <DialogTitle>{t("Add New Borrow")}</DialogTitle>
         <DialogContent>
            <form onSubmit={newBorrow}
               style={{
                  display: "flex",
                  flexDirection: "column"
               }} >
               <TextField
                  required
                  sx={{ width: "400px" }}
                  margin="dense"
                  id="name"
                  label={t("Student ID :") + borrowSaved.studentId}
                  defaultValue={borrowSaved.studentFname}
                  type="text"
                  InputProps={{
                     readOnly: true,
                  }}

               />
               <TextField
               required
                  sx={{ width: "400px" }}
                  margin="dense"
                  id="name"
                  label={t("Book ID :") + borrowSaved.bookId}
                  defaultValue={borrowSaved.bookTitle}
                  type="text"
                  InputProps={{
                     readOnly: true,
                  }}

               />

               <TextField
                  sx={{ width: "400px" }}
                  margin="dense"
                  id="name"
                  label={t('start date')}
                  type="date"
                  variant="outlined"
                  onChange={(e) => setAddBorrow({ ...addBorrow, start_date: e.target.value })}
               />
               <TextField
                  sx={{ width: "400px" }}
                  margin="dense"
                  id="name"
                  label={t("end date")}
                  type="date"
                  variant="outlined"
                  onChange={(e) => setAddBorrow({ ...addBorrow, end_date: e.target.value })}
               />

               <Button type='submit' sx={{
                  mt: 1
               }} variant='contained'>{t("New Borrow")}</Button>
            </form>
            {
            error ?  <Box marginTop={1}>
            <Alert severity="error">
               {t('Do not leave cells blank')}</Alert>
         </Box> : <></>
           }
         </DialogContent>

      </Dialog>
   )
}

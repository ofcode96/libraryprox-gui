import React, { SetStateAction, useContext, useState } from 'react'
import { BorrowContext } from '../contexts/BorrowContext'
import { Button, Dialog, DialogContent, DialogTitle, FormControl, FormHelperText, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import { SnackBarContext } from '../contexts/SnackBarContext'
import TimeConverter from '../helpers/TimeConverter'
import { borrowApi } from '../constants/utils'
import BorrowInterface from '../interfaces/borrow'
import useMe from '../hooks/useMe'
import { logger } from '../helpers/Logger'
import { t } from 'i18next'


type UpdateStudentFormProps = {
   setOpenUpdateBorrow: React.Dispatch<SetStateAction<boolean>>,
   borrow: BorrowInterface
}
export default function UpdateBorrow({ setOpenUpdateBorrow, borrow }: UpdateStudentFormProps) {
   const { borrows, setBorrows } = useContext(BorrowContext)
   const [openSnack, setOpenSnack] = useContext(SnackBarContext)



   const [upBorrow, setUpBorrow] = useState<BorrowInterface>()

   const [stateSelect, setStateSelect] = useState(borrow.state?.toString())

   let start_date_general = TimeConverter.toRealTime(borrow.start_date!)
   let end_date_general = TimeConverter.toRealTime(borrow.end_date!)

   const currentUser = useMe()
   
   const updateBorrow = async (e: React.FormEvent) => {
      e.preventDefault()


      await borrowApi.update({ ...upBorrow }, borrow.id!)


      const updateBorrows = await borrowApi.all()
      setBorrows(updateBorrows)


      setOpenSnack({ ...openSnack, open: true, msg: "Update Success" })
      setOpenUpdateBorrow(false)
      // log new oprations
      logger(`Update Borrow ${borrow.id!}`, currentUser?.username!)


   }

   return (
      <Dialog
         open={true}
         onClose={() => setOpenUpdateBorrow(false)}
      >
         <DialogTitle>{t("Update Borrow")}</DialogTitle>
         <DialogContent>
            <form onSubmit={updateBorrow}
               style={{
                  display: "flex",
                  flexDirection: "column"
               }} >
               <TextField
                  sx={{ width: "400px" }}
                  margin="dense"
                  id="name"
                  label={t("Student ID :") + borrow.student_id}
                  defaultValue={borrow.student_id}
                  type="text"
                  InputProps={{
                     readOnly: true,
                  }}

               />
               <TextField
                  sx={{ width: "400px" }}
                  margin="dense"
                  id="name"
                  label={t("Book ID :") + borrow.book_id}
                  defaultValue={borrow.book_id}
                  type="text"
                  InputProps={{
                     readOnly: true,
                  }}

               />

               <TextField
                  sx={{ width: "400px" }}
                  margin="dense"
                  id="name"
                  label={t("start date")}
                  type="date"
                  variant="outlined"
                  defaultValue={start_date_general.toISOString().slice(0, 10)}
                  onChange={
                     (e) => setUpBorrow({
                        ...upBorrow,
                        start_date: e.target.value
                     })
                  }
               />
               <TextField
                  sx={{ width: "400px" }}
                  margin="dense"
                  id="name"
                  label={t("end date")}
                  type="date"
                  variant="outlined"
                  defaultValue={end_date_general.toISOString().slice(0, 10)}
                  onChange={
                     (e) => setUpBorrow({
                        ...upBorrow,
                        end_date: e.target.value
                     })}
               />
               <FormControl sx={{ my: 1, flex: 1 }}>
                  <FormHelperText> {t("state")}</FormHelperText>
                  <Select

                     defaultValue={stateSelect}
                     onChange={(e: SelectChangeEvent) => {



                        setStateSelect(e.target.value)
                        setUpBorrow({ ...upBorrow, state: +e.target.value })

                     }
                     }

                     inputProps={{ 'aria-label': 'Without label' }}
                  >

                     <MenuItem value={0}>{t("Running")}</MenuItem>
                     <MenuItem value={1}>{t("Stoped")}</MenuItem>
                     <MenuItem value={2}>{t("Missed")}</MenuItem>
                     <MenuItem value={3}>{t("Don't Back")}</MenuItem>

                  </Select>

               </FormControl>


               <Button type='submit' sx={{
                  mt: 1
               }} variant='contained'>{t("Update Borrow")}</Button>
            </form>
         </DialogContent>
      </Dialog>
   )
}

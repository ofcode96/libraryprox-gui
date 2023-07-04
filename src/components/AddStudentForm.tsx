import { Alert, Box, Button, Dialog, DialogContent, DialogTitle, FormControl, FormHelperText, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import React, { SetStateAction, useContext, useState } from 'react'
import StudentsInterface from '../interfaces/student'
import { studentApi } from '../constants/utils'
import { StudentsContext } from '../contexts/StudentsContext'
import { SnackBarContext } from '../contexts/SnackBarContext'
import { logger } from '../helpers/Logger'
import useMe from '../hooks/useMe'
import { LogsContext } from '../contexts/LogContext'
import { t } from 'i18next'


type AddNewStudentFormProps = {
   setNewStudent: React.Dispatch<SetStateAction<boolean>>
}

export default function AddStudentForm({ setNewStudent }: AddNewStudentFormProps) {

   const { setStudents } = useContext(StudentsContext)
   const currentUser = useMe()
   const [openSnack, setOpenSnack] = useContext(SnackBarContext)


   const [isBanned, setIsbanned] = useState("")
   const [roleSelect, setRoleSelect] = useState("")

   let id = Math.floor(Date.now() * Math.random() + (Math.random() * 1000))
   const [addStudent, setAddStudent] = useState<StudentsInterface>({
      id: id,
      fname: "",
      address: "",
      date_birth: "",
      decription: "",
      is_banned: false,
      phone: "",
      role: 0,
      owner_id: 0
   })

   const [error, setError] = useState(false)

   const newStudent = async (e: React.FormEvent) => {
      e.preventDefault()

      if(
         addStudent.fname?.length === 0 || 
         addStudent.date_birth?.length === 0          
         ){
         setError(true)
         return
      }



      await studentApi.add(addStudent)

      setAddStudent(
         {
            ...addStudent,
            id: Math.floor(Date.now() * Math.random() + (Math.random() * 1000)
            )
         })

      setNewStudent(false)
      setOpenSnack({ ...openSnack, open: true, msg: "add new student" })

      const updatestudents = await studentApi.all()

      setStudents(updatestudents)

      // log new oprations
      logger(`add new student ${addStudent.id}`, currentUser?.username!)



   }

   return (
      <Dialog
         open={true}
         onClose={() => setNewStudent(false)}
      >
         <DialogTitle>{t("Add New Student")}</DialogTitle>
         <DialogContent>
            <form
               onSubmit={newStudent}
               style={{
                  display: "flex",
                  flexDirection: "column"
               }}


            >
               <TextField
                  sx={{ width: "400px" }}
                  margin="dense"
                  id="name"
                  label={t("Full Name")}
                  type="text"
                  variant="outlined"
                  onChange={(e) => setAddStudent({ ...addStudent, fname: e.target.value })}
               />
               <TextField
                  sx={{ width: "400px" }}
                  margin="dense"
                  id="name"
                  label={t("address")}
                  type="text"
                  variant="outlined"
                  onChange={(e) => setAddStudent({ ...addStudent, address: e.target.value })}
               />

               <TextField
                  sx={{ width: "400px" }}
                  margin="dense"
                  id="name"
                  
                  type="date"
                  variant="outlined"
                  onChange={(e) => setAddStudent({ ...addStudent, date_birth: e.target.value })}
               />

               <TextField
                  sx={{ width: "400px" }}
                  margin="dense"
                  id="name"
                  label={t("phone")}
                  type="text"
                  variant="outlined"
                  onChange={(e) => setAddStudent({ ...addStudent, phone: e.target.value })}
               />
               <Box display={"flex"} gap={2}>
                  <FormControl sx={{ my: 1, flex: 1 }}>
                     <FormHelperText>{t('Banned')}</FormHelperText>
                     <Select
                        value={isBanned}
                        onChange={(e: SelectChangeEvent) => {
                           setIsbanned(e.target.value)
                           setAddStudent({ ...addStudent, is_banned: isBanned === t("yes") ? true : false })
                        }
                        }

                        inputProps={{ 'aria-label': 'Without label' }}
                     >

                        <MenuItem value={"yes"}>{t("Yes")}</MenuItem>
                        <MenuItem value={"no"}>{t("No")}</MenuItem>

                     </Select>

                  </FormControl>

                  <FormControl sx={{ my: 1, flex: 1 }}>
                     <FormHelperText> {t("role")} </FormHelperText>
                     <Select
                        defaultValue={"0"}
                        value={roleSelect}
                        onChange={(e: SelectChangeEvent) => {
                           setRoleSelect(e.target.value)
                           setAddStudent({ ...addStudent, role: +roleSelect })
                        }}

                        inputProps={{ 'aria-label': 'Without label' }}
                     >

                        <MenuItem value={0}>{t("Student")}</MenuItem>
                        <MenuItem value={1}>{t("VIP")}</MenuItem>
                        <MenuItem value={2}>{t("VVIP")}</MenuItem>

                     </Select>

                  </FormControl>
               </Box>

               <TextField
                  sx={{ width: "400px" }}
                  margin="dense"
                  id="name"
                  label={t("decription")}
                  type="text"
                  variant="outlined"
                  onChange={(e) => setAddStudent({ ...addStudent, decription: e.target.value })}
               />


               <Button type='submit' sx={{
                  mt: 1
               }} variant='contained'>{t("New Student")}</Button>
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

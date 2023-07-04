import React, { SetStateAction, useContext, useState } from 'react'
import StudentsInterface from '../interfaces/student'
import { Dialog, DialogTitle, DialogContent, TextField, Box, FormControl, FormHelperText, Select, SelectChangeEvent, MenuItem, Button } from '@mui/material'
import TimeConverter from '../helpers/TimeConverter'
import { studentApi } from '../constants/utils'
import { StudentsContext } from '../contexts/StudentsContext'
import { SnackBarContext } from '../contexts/SnackBarContext'
import { t } from 'i18next'

type UpdateStudentFormProps = {
   setOpenUpdate: React.Dispatch<SetStateAction<boolean>>,
   student: StudentsInterface
}


export default function UpdateStudent({ setOpenUpdate, student }: UpdateStudentFormProps) {

   const {students,setStudents} = useContext(StudentsContext)
   const [openSnack,setOpenSnack] = useContext(SnackBarContext)

   const [upStudent, setUpStudent] = useState<StudentsInterface>()

   let generalDate = TimeConverter.toRealTime(student.date_birth!)


   const [isBanned, setIsbanned] = useState(student.is_banned?"yes":"no")


   const [roleSelect, setRoleSelect] = useState(""+student.role)



   const updateStudent = async(e:React.FormEvent) => {
      e.preventDefault()

      await studentApi.update({ ...upStudent },student.id!)

      const updateStudents = await studentApi.all()
      setStudents(updateStudents)

      setOpenSnack({...openSnack,open:true, msg:"Update Success"})
      setOpenUpdate(false)

   }


   return (
      <Dialog
         open={true}
         onClose={() => setOpenUpdate(false)}
      >
         <DialogTitle>{t("Update Student")}</DialogTitle>
         <DialogContent>
            <form
               onSubmit={updateStudent}
               style={{
                  display: "flex",
                  flexDirection: "column"
               }}


            >
               <TextField
                  sx={{ width: "400px" }}
                  margin="dense"
                  id="name"
                  label={t("full name")}
                  type="text"
                  variant="outlined"
                  defaultValue={student.fname}
                  onChange={(e) => setUpStudent({ ...upStudent, fname: e.target.value })}
               />
               <TextField
                  sx={{ width: "400px" }}
                  margin="dense"
                  id="name"
                  label={t("address")}
                  type="text"
                  variant="outlined"
                  defaultValue={student.address}
                  onChange={(e) => setUpStudent({ ...upStudent, address: e.target.value })}
               />

               <TextField
                  sx={{ width: "400px" }}
                  margin="dense"
                  id="name"
                  label={t("date birth")}
                  type="date"
                  variant="outlined"
                  defaultValue={generalDate.toISOString().slice(0, 10)}
                  onChange={(e) => setUpStudent({ ...upStudent, date_birth: e.target.value })}
               />

               <TextField
                  sx={{ width: "400px" }}
                  margin="dense"
                  id="name"
                  label={t("phone")}
                  type="text"
                  variant="outlined"
                  defaultValue={student.phone}
                  onChange={(e) => setUpStudent({ ...upStudent, phone: e.target.value })}
               />
               <Box display={"flex"} gap={2}>
                  <FormControl sx={{ my: 1, flex: 1 }}>
                     <FormHelperText> {t("is banned")}</FormHelperText>
                     <Select
                        value={isBanned}
                        onChange={(e: SelectChangeEvent) => {
                           setIsbanned(e.target.value)
                           setUpStudent({ ...upStudent, is_banned: e.target.value == "yes" ? true : false })
                        }
                        }

                        inputProps={{ 'aria-label': 'Without label' }}
                     >

                        <MenuItem value={"yes"}>{t("Yes")}</MenuItem>
                        <MenuItem value={"no"}>{t("No")}</MenuItem>

                     </Select>

                  </FormControl>

                  <FormControl sx={{ my: 1, flex: 1 }}>
                     <FormHelperText> {t("role")}</FormHelperText>
                     <Select
                        value={roleSelect}
                        onChange={(e: SelectChangeEvent) => {
                           setRoleSelect(e.target.value)
                           setUpStudent({ ...upStudent,
                               role: +e.target.value })
                        }}

                        inputProps={{ 'aria-label': 'Without label' }}
                     >

                        <MenuItem value={0}>{t("Student")}</MenuItem>
                        <MenuItem value={1}>VIP</MenuItem>
                        <MenuItem value={2}>VVIP</MenuItem>

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
                  defaultValue={student.decription}
                  onChange={(e) => setUpStudent({ ...upStudent, decription: e.target.value })}
               />


               <Button type='submit' sx={{
                  mt: 1
               }} variant='contained'>{t("Update Student")}</Button>
            </form>
         </DialogContent>

      </Dialog>
   )
}


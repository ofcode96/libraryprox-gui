import { Alert, Box, Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { SetStateAction, useContext, useState } from 'react'
import { SnackBarContext } from '../contexts/SnackBarContext'
import { usersManegerApi } from '../constants/utils'
import { UsersManagmentContext } from '../contexts/UsersManagmentContext'
import { UsersManage } from '../interfaces/usersmanagrs'
import useMe from '../hooks/useMe'
import { logger } from '../helpers/Logger'
import { t } from 'i18next'


type AddNewUserFormProps = {
   setNewUser: React.Dispatch<SetStateAction<boolean>>
}

export default function AddUserForm({ setNewUser }: AddNewUserFormProps) {
   const { userManage, setUserManage } = useContext(UsersManagmentContext)

   const [openSnack, setOpenSnack] = useContext(SnackBarContext)
   let id = Math.floor(Date.now() * Math.random() + (Math.random() * 1000))

   const [addUser, setAddUser] = useState<UsersManage>({
      id: id,
      is_admin: false,
      username: "",
      password: ""

   })

   const currentUser = useMe()

   const [error, setError] = useState(false)

   const newUser = async (e: React.FormEvent) => {
      e.preventDefault()

      if (addUser.password?.length ===0 || addUser.username?.length ===0)
      {

         setError(true)
         return 
      }

      await usersManegerApi.add(addUser)


      setAddUser(
         {
            ...addUser,
            id: Math.floor(Date.now() * Math.random() + (Math.random() * 1000)
            )
         })


      setNewUser(false)
      setOpenSnack({ ...openSnack, open: true, msg: "add new user" })

      const updateusers = await usersManegerApi.all()

      setUserManage(updateusers)

       // log new oprations
       logger(`dAdd new Borrow ${id}`, currentUser?.username!)

   }
   return (
      <Dialog
         open={true}
         onClose={() => setNewUser(false)}
      >
         <DialogTitle>{t("Add New User")}</DialogTitle>
         <DialogContent>
            <form
               onSubmit={newUser}
               style={{
                  display: "flex",
                  flexDirection: "column"
               }}>

               <TextField
                  sx={{ width: "400px" }}
                  margin="dense"
                  id="name"
                  label={t("User Name")}
                  type="text"
                  variant="outlined"
                  onChange={(e) => setAddUser({ ...addUser, username: e.target.value })}
               />

               <TextField
                  sx={{ width: "400px" }}
                  margin="dense"
                  id="name"
                  label={t("Password")}
                  type="password"
                  variant="outlined"
                  onChange={(e) => setAddUser({ ...addUser, password: e.target.value })}
               />

               <Button type='submit' sx={{
                  mt: 1
               }} variant='contained'>{t("New User")}</Button>

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

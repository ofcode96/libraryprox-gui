import { Box, Typography, Table, TableHead, Paper, TableBody, TableCell, TableRow, Switch, IconButton, Avatar } from '@mui/material'
import { t } from 'i18next'
import TableContainer from '@mui/material/TableContainer';
import { Edit, Remove } from '@mui/icons-material';
import { ChangeEvent, useContext, useState } from 'react';
import { UsersManagmentContext } from '../../contexts/UsersManagmentContext';
import { AddUserForm, DailogCustume, FloatingActionButton, SearchBar, SnackBarToast } from '../../components';
import { usersManegerApi } from '../../constants/utils';
import { UsersManage } from '../../interfaces/usersmanagrs';
import { SnackBarContext } from '../../contexts/SnackBarContext';
import filtredList from '../../helpers/FilteredList';
import { LanguageContext } from '../../contexts/LanguageContext';
import useMe from '../../hooks/useMe';
import { logger } from '../../helpers/Logger';



export default function UsersPanal() {

   const [searchId, setSearchId] = useState(false)
   const [searchQuiry, setSearch] = useState('')


   const [openNewUser, setNewUser] = useState(false)


   const { userManage, setUserManage } = useContext(UsersManagmentContext)
   const [openSnack, setOpenSnack] = useContext(SnackBarContext)

   const [openDailog, setOpenDailog] = useState(false)
   const [id, setId] = useState(0)

   // Users Filter List 
   const filtredListUsers = filtredList(userManage, searchId, searchQuiry, "username")


   const deleteUser = async () => {
      await usersManegerApi.remove(id)
      const updateUsers = await usersManegerApi.all()
      setUserManage(updateUsers)
      setOpenDailog(false)
      // log new oprations
      logger(`Delete User ${id}`, currentUser?.username!)

   }

   const updateUser = async (e: ChangeEvent<HTMLInputElement>, user: UsersManage) => {
      await usersManegerApi.update({ ...user, is_admin: e.target.checked }, user.id!)
      setOpenSnack({ ...openSnack, open: true, msg: "Update user " })

      // log new oprations
      logger(`Update User ${user.id!}`, currentUser?.username!)


   }

   const [dir] = useContext(LanguageContext)

   const currentUser = useMe()

   const adminColor = (user: UsersManage) => {
      if (user.id == currentUser?.id) {
         if (localStorage.getItem('darkMode') === "true") {
            return "#2E4F4F"
         } else {
            return "#B9EDDD"
         }
      }
   }


   return (
      <>
         <SearchBar {...{ setSearch, setSearchId }} />
         <Typography variant='h3'>{t('Users')}</Typography>
         <Box
            marginTop={5}
            maxWidth={"90%"}
            height={"auto"}
            overflow={"auto"}
         >

            <TableContainer component={Paper} dir={dir === "rtl" ? "rtl" : "ltr"}>
               <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                     <TableRow>
                        <TableCell
                           align={dir === 'rtl' ? 'right' : "left"}
                        >{t("id").toUpperCase()}</TableCell>
                        <TableCell
                           align={dir === 'rtl' ? 'right' : "left"}>{t("User Name")}</TableCell>
                        <TableCell
                           align={dir === 'rtl' ? 'right' : "left"}>
                              {t("Admin")}</TableCell>
                        <TableCell
                           align={dir === 'rtl' ? 'right' : "left"}>{t("Delete")}</TableCell>

                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {filtredListUsers.map((user) => (
                        <TableRow
                           key={user.id}
                           sx={{
                              background: adminColor(user),
                              color: user.id === currentUser?.id
                                 ? "#white"
                                 : "transparent",

                              '&:last-child td, &:last-child th': { border: 0 }
                           }}


                        >
                           <TableCell
                              align={dir === 'rtl' ? 'right' : "left"}
                              component="th" scope="row">
                              {user.id}
                           </TableCell>

                           <TableCell
                              align={dir === 'rtl' ? 'right' : "left"}
                           >{user.username}</TableCell>

                           <TableCell
                              align={dir === 'rtl' ? 'right' : "left"}>
                              
                              <Switch

                                 defaultChecked={user.is_admin}
                                 onChange={(e) => updateUser(e, user)}

                              /> 
                           </TableCell>
                           <TableCell
                              align={dir === 'rtl' ? 'right' : "left"}>

                              <IconButton

                                 onClick={() => {
                                    setId(user.id!)
                                    setOpenDailog(true)
                                 }}

                                 size='small'  >
                                 <Avatar sizes='small' sx={{ bgcolor: "firebrick", color: "white" }}  >
                                    <Remove />
                                 </Avatar>
                              </IconButton>


                           </TableCell>

                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </TableContainer>


            {openDailog && <DailogCustume

               setOpen={setOpenDailog}
               action={deleteUser}
               actionTitle={t('Delete')}
               color='error'
               dialogTitle={t('Do You Wont To Remove this User')}
               dialogBody={t('If You remove this User You will never can resore him So be carfull ')}
            />}

         </Box>

         <FloatingActionButton onclick={() => setNewUser(true)} />
         {openNewUser && <AddUserForm {...{ setNewUser }} />}

         <SnackBarToast />


      </>
   )
}

import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { Avatar, Box, Card, CardContent, Divider, IconButton, TextField, Typography } from '@mui/material';
import { UserContext } from '../contexts/UserContext';
import { API_URL_BASE, usersManegerApi } from '../constants/utils';

import QRCode from "react-qr-code";
import CustomizedSnackbars from './SnackBarCustume';
import Snack from '../interfaces/snackbar';
import useMe from '../hooks/useMe';
import { UsersManage } from '../interfaces/usersmanagrs';
import { t } from 'i18next';
import { CloseFullscreen, Edit, QrCode } from '@mui/icons-material';

type Anchor = 'left' | 'right';


export interface ProfileProps {
   setProfile: React.Dispatch<React.SetStateAction<boolean>>
}

export interface UserInformation {
   username: string
   id?: number
}

export default function Profile({ setProfile: setProfile }: ProfileProps) {
   const [state, setState] = useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
   });

   const [snack, setSnack] = useState<Snack>({
      open: false,
      message: "",
      sevirity: "info"
   })

   const [qr, setQr] = useState(false)
   const [edit, setEdit] = useState(false)
   const [token,] = useContext(UserContext)

   const [user, setMe] = useState<UsersManage | undefined>({
      username: "",
      id: 0,
      is_admin: false,
      password: ""
   })



   const toggleDrawer =
      (anchor: Anchor, open: boolean) =>
         (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
               event.type === 'keydown' &&
               ((event as React.KeyboardEvent).key === 'Tab' ||
                  (event as React.KeyboardEvent).key === 'Shift')
            ) {
               setProfile(false)
               return;
            }

            setProfile(false)
            setState({ ...state, [anchor]: open });
         };


   const currentUser = useMe()

   const getInfo = async () => {
      const user = await usersManegerApi.getById(currentUser?.id!)
      setMe(user)

   }

   useEffect(() => {
      if (!user?.username) {
         getInfo()
      }

   }, [user])


   const updateUserInfo = async (e: React.FormEvent) => {
      e.preventDefault()

      await usersManegerApi.update({
         username: user?.username,
         passowrd: user?.password
      }, currentUser?.id!)

      setMe(user)
      setSnack({ open: true, sevirity: "success", message: "Success" });

      setEdit(false)

   }


   const [dir,] = useContext(LanguageContext)



   const anchor = !(dir === "rtl") ? "left" : "right"
   return (
      <div>


         <Drawer
            anchor={anchor}
            open={true}
            onClose={toggleDrawer(anchor, false)}
            sx={{ zIndex: 10000 }}

         >
            <Box

               sx={{
                  width: 400,
                  padding: "1em",
                  margin: 2,
                  height: "auto",
                  bgcolor: "main"
               }}
            >
               <Typography variant='h4' fontWeight={600}>
                  {t('Profile')}
               </Typography>

               <Card sx={{ mt: "1em", borderRadius: 2 }}>
                  <CardContent sx={{

                     display: "flex",
                     alignItems: "center",
                     gap: 4

                  }}>
                     <Avatar sizes='small' sx={{
                        width: 70,
                        height: 70,
                        background: "primary"
                     }}></Avatar>

                     <Box>
                        <Typography
                           fontSize={20}
                           variant='h4'
                           textAlign={"center"}
                           noWrap
                        >
                           {user?.username}
                        </Typography>
                        <Typography variant='h6' textAlign={"center"}>{
                           user?.is_admin ? t("Admin") : t("User")
                        }</Typography>
                     </Box>
                     <Box display={"flex"}>
                        <IconButton sx={{
                           textAlign: "center",
                           marginInline: "auto",
                           display: "block",
                           marginTop: 1,
                        }}
                           onClick={() => {
                              setQr(false)
                              setEdit(!edit)
                           }}
                        >
                           {edit ? <CloseFullscreen /> : <Edit color='primary' />}
                        </IconButton>
                        <IconButton onClick={() => {
                           setQr(!qr)
                           setEdit(false)
                        }}>
                           <QrCode />
                        </IconButton>
                     </Box>
                  </CardContent>
               </Card>



               <Divider />
               <Box my={3} display={!edit ? "none" : "block"}>
                  <form onSubmit={updateUserInfo}>
                     <TextField
                        placeholder={user?.username}
                        dir='ltr'
                        fullWidth
                        id="outlined-basic"
                        label={t("username")}
                        variant="outlined"
                        onChange={(e) => setMe({ ...user, username: e.target.value })}
                     />
                     <Box height={30} />
                     <TextField
                        dir='ltr'
                        fullWidth
                        id="outlined-basic"
                        label={t("New Password")}
                        variant="outlined"
                        onChange={(e) => setMe({ ...user, password: e.target.value })}
                     />
                     <Button
                        type='submit'
                        sx={{
                           display: "inline-block",
                           marginTop: 2,
                           width: "100%",

                        }}
                        variant='contained'
                     >{t("Update")}</Button>
                  </form>

               </Box>

               <Box display={!qr ? "none" : "block"}>
                  <Typography variant='h6' my={1} textAlign={"center"}>
                     {t("Don't Shar This Qr To Anyone")}
                  </Typography>
                  
                  <div style={{ background: 'white', padding: '16px' }}>
                     <QRCode
                        value={`{"token":"${token}","ip":"${localStorage.getItem('ip')}"}`}
                        // value='test'
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                     />
                  </div>
               </Box>

               <CustomizedSnackbars
                  {...{ snack, setSnack }}
               />



            </Box>
         </Drawer>


      </div>
   );
}

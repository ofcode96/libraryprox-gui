import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import React, { useContext, useState } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { Card, CardContent, Switch, Typography } from '@mui/material';
import useMe from '../hooks/useMe';
import { t } from 'i18next';
import { SoundContext } from '../contexts/Soundeffect';
import { EnterPrise } from '.';

type Anchor = 'left' | 'right';


export interface SettingsProps {
   setSetting: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Settings({ setSetting }: SettingsProps) {
   const [state, setState] = useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
   });

   const toggleDrawer =
      (anchor: Anchor, open: boolean) =>
         (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
               event.type === 'keydown' &&
               ((event as React.KeyboardEvent).key === 'Tab' ||
                  (event as React.KeyboardEvent).key === 'Shift')
            ) {
               setSetting(false)
               return;
            }

            setSetting(false)
            setState({ ...state, [anchor]: open });
         };


   const currentUser = useMe()

   const { sound, setSound } = useContext(SoundContext)

   const [chicked, setChicked] = useState(
      localStorage.getItem('sound') == "true" ? true : false
   )

   const soundHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setChicked(e.target.checked)
      setSound(e.target.checked)
   }





   const [dir,] = useContext(LanguageContext)

   const anchor = dir === "rtl" ? "left" : "right"
   return (
      <div>


         <Drawer
            anchor={anchor}
            open={true}
            onClose={toggleDrawer(anchor, false)}
            sx={{ zIndex: 10000 }}
         >
            <Box
               sx={{ width: "100%", paddingTop: "2em" }}
               role="presentation"
               className={"scroll-hider"}
            >
               <Typography variant='h4' fontWeight={600} mx={3}>
                  {t('Settings')}
               </Typography>

               <List>
                  <ListItem>
                     <Card sx={{ padding: 1, width: "100%" }} >
                        <CardContent>
                           <Typography variant='h6' >
                              {t("Current User")}
                           </Typography>
                           <Divider sx={{ borderBottom: 1 / 2, paddingBlock: 1 / 2 }} />
                           <Typography variant='h6' >
                              {currentUser?.username}
                           </Typography>
                        </CardContent>

                     </Card>
                  </ListItem>
                  <ListItem sx={{ width: "100%" }}>
                     <Card sx={{ padding: 1, width: "100%" }} >
                        <CardContent>
                           <Typography variant='h6' >
                              {t("Sound")}
                           </Typography>
                           <Divider sx={{ borderBottom: 1 / 2, paddingBlock: 1 / 2 }} />
                           {t("OFF")}<Switch
                              checked={chicked}
                              onChange={soundHandler}
                           />{t("ON")}
                        </CardContent>
                     </Card>
                  </ListItem>
                  <ListItem>
                     <Card sx={{ padding: 1, width: "100%" }} >
                        <CardContent>
                           <Typography variant='h6' >
                              {t("Shared Ip")}
                           </Typography>
                           <Divider sx={{ borderBottom: 1 / 2, paddingBlock: 1 / 2 }} />
                           <Typography fontStyle={'italic'} variant='h6' >
                              {localStorage.getItem('ip')}
                           </Typography>
                        </CardContent>
                     </Card>
                  </ListItem>

                  {currentUser?.is_admin && <EnterPrise />}

               </List>

            </Box>
         </Drawer>


      </div>
   );
}














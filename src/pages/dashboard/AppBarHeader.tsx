import { Person2Rounded, Settings, PowerSettingsNew } from "@mui/icons-material";
import { Toolbar } from "@mui/material";
import { useState, useContext } from "react";
import { DashTop, IconToggleSideBar, AppBarTitle, UserMenuIconButton, DropDownMenuUser, DarkThemeToggle, LanguageAppBar, Settings as SettingsPage, Profile } from "../../components";
import { UserContext } from "../../contexts/UserContext";
import libraryIcon from "../../assets/imgs/logo.png"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { LanguageContext } from "../../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import { useSignOut } from "react-auth-kit";


const drawerWidth = 240;




interface AppBarProps extends MuiAppBarProps {
   open: boolean;
   mode?: boolean;
   dark: boolean
   dirLayout?: string | null | undefined
   setOpen: React.Dispatch<React.SetStateAction<boolean>>
   setDark: React.Dispatch<React.SetStateAction<boolean>>

}
const AppBar = styled(MuiAppBar, {
   shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open, mode, dirLayout }) => ({
   backgroundColor: !mode ? "white" : "black",
   color: !mode ? "black" : "white",
   boxShadow: "none",
   zIndex: theme.zIndex.drawer + 1,
   transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
   }),
   ...(open && {
      // marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px )`,
      marginInlineStart: dirLayout === "rtl" ? `${drawerWidth}px` : "0",
      transition: theme.transitions.create(['width', 'margin'], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen,
      }),
   }),
}));


const AppBarHeader = ({ open, mode, setOpen, setDark, dark }: AppBarProps) => {


   const [username,] = useState("")
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   const openMenuDrop = Boolean(anchorEl);
   const [, setToken] = useContext(UserContext)

   const [setting, setSetting] = useState(false)
   const [profile, setProfile] = useState(false)




   const navigate = useNavigate()

   const singOut = useSignOut()




   const handleDrawerOpen = () => {
      setOpen(true);
   };
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };
   const logout = () => {
      setToken('')

      singOut()
      navigate('/login', { replace: true })

      localStorage.setItem("darkMode", "")
      localStorage.setItem("server",JSON.stringify(true))

   }
   const settings = () => {
      setSetting(!setting)
   }
   const profiles = () => {
      setProfile(!profile)
   }
   const funcFiltring = (key: string) => {
      switch (key) {
         case "logout":
            return logout

         case "settings":
            return settings

         case "profile":
            return profiles

         default:
            break;
      }
   }

   const appBarItems = [
      {
         itemName: t("Profile"),
         icon: <Person2Rounded sx={{ marginRight: "10px" }} />,
         onclickKey: "profile"
      },
      {
         itemName: t("Settings"),
         icon: <Settings sx={{ marginRight: "10px" }} />,
         onclickKey: "settings"
      },
      {
         itemName: t("Logout"),
         icon: <PowerSettingsNew sx={{ marginRight: "10px" }} />,
         onclickKey: "logout"
      }
   ]

   const [dir,] = useContext(LanguageContext)


   return <AppBar
      position="fixed"
      dirLayout={dir}
      elevation={12}
      {...{ open, dark, mode, setDark, setOpen }}
   >

      <DashTop
         {...{ title: document.title, imgSrc: libraryIcon }}
      />

      <Toolbar>

         <IconToggleSideBar  {...{ handleDrawerOpen, open }} />



         <AppBarTitle />



         <UserMenuIconButton
            {...{ username, handleClick }}

         />


         <DropDownMenuUser
            {...{ anchorEl, appBarItems, funcFiltring, handleClose, openMenuDrop }}

         />


         <DarkThemeToggle
            {...{ dark, setDark }}

         />
         <LanguageAppBar />



         {setting && <SettingsPage  setSetting={setSetting} />}
         {profile && <Profile setProfile={setProfile} />}

         
      </Toolbar>


   </AppBar>

}

export default AppBarHeader
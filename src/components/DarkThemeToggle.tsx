import { LightMode, NightlightRound } from "@mui/icons-material"
import { IconButton } from "@mui/material"

interface DarkThemeToggleProps {
   dark: boolean
   setDark: (value: React.SetStateAction<boolean>) => void
}

const DarkThemeToggle = ({ dark, setDark }: DarkThemeToggleProps) => <IconButton
   sx={{
      backgroundColor: !dark ? "var(--main)" : "white",
      color: dark ? "black" : "white",
      ":hover": {
         backgroundColor: !dark ? "var(--main)" : "white",
      },

   }}
   onClick={() => { 
      localStorage.setItem("darkMode",`${!dark}`) 
      setDark(!dark)
      
   }}>
   {dark ? <LightMode /> : <NightlightRound />}

</IconButton>




export default DarkThemeToggle
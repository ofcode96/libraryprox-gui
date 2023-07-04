import { IconButton } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";

interface IconToggleSideBarProps {
   handleDrawerOpen: () => void
   open: boolean
}

const IconToggleSideBar = ({ handleDrawerOpen, open }: IconToggleSideBarProps) => {

   const [dir,] =useContext(LanguageContext)

   return <IconButton
      color="inherit"
      aria-label="open drawer"
      onClick={handleDrawerOpen}
      edge="start"
      sx={{ ...(dir == "rtl" ? { ml: 2 } : { mx:2  }),padding:0,mx:0, ...(open && { display: 'none' }) }}
   >
      <MenuIcon />
   </IconButton>
}



export default IconToggleSideBar
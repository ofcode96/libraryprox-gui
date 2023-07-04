import { useMemo, useState , useEffect} from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import SideList from './SideList';
import AppBarHeader from './AppBarHeader';
import { PDFProvider } from '../../contexts/PDFContext';
import { BorrowAddProvider } from '../../contexts/BorrowAddContext';
import { appWindow } from '@tauri-apps/api/window';


export default function Dashboard() {

   const [open, setOpen] = useState(false);

   const [dark, setDark] = useState(localStorage.getItem("darkMode") == 'true' ? true : false)

   const darkTheme = useMemo(() => createTheme({
      palette: {
         mode: dark ? "dark" : "light",
         primary:{
            main:"#0E8388",
            dark:"#2D2727",
         },
         
         
      }
   }), [dark])


   const fullSize = async()=>{
     const isFullscreen = await appWindow.isFullscreen()
     if (!isFullscreen) appWindow.maximize()
   }

   useEffect(() => {
      fullSize()
   }, [])
   



   return (
      <ThemeProvider theme={darkTheme}>
         <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <AppBarHeader   {...{ open, mode: dark, dark, setOpen, setDark }} />


            <BorrowAddProvider>
               <PDFProvider>
                  <SideList  {...{ open, setOpen }} />
               </PDFProvider>
            </BorrowAddProvider>


         </Box>
      </ThemeProvider>
   );
}


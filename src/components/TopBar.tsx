import { Box, IconButton, Stack, Tooltip } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import { appWindow } from "@tauri-apps/api/window"
import { exit } from '@tauri-apps/api/process';
import { processApi } from '../constants/utils';
import { invoke } from '@tauri-apps/api/tauri';
import { Command } from '@tauri-apps/api/shell';




type TopBarType = { color?: string }


export default function TopBar({ color }: TopBarType) {

   const processDetector = async () => {


      const process = await processApi.get()

      process.filter(p => p.state == "Not Responding").forEach(async (p) => {
         await processApi.kill(p.pid)
      })





   }


   const close = async () => {   
      appWindow.hide()   
         setTimeout(async () => {
            appWindow.close()
            await exit(1)
         }, 3000);
    

     

   }
   const restore = () => {
      appWindow.toggleMaximize()
   }
   const minimize = () => {
      appWindow.minimize()
   }

   const isDark = localStorage.getItem("darkMode") == 'true' ? true : false

   const buttonsColor = () => {
      if (color === "white") {
         return !isDark
         ? "white"
         : "black"
      }
      return isDark
         ? "white"
         : "black"
   }


   return (
      <Box
         height={"30px"}
         width={"100%"}
         data-tauri-drag-region
         component={"div"}

      >
         <Stack direction={"row-reverse"} data-tauri-drag-region >
            <Tooltip title="close" data-tauri-drag-region>
               <IconButton
               className='closeBtn'
                  sx={{
                     borderRadius: 0,
                     marginTop: -1,
                     color: buttonsColor(),

                     "&:hover": {
                        backgroundColor: "#ED2B2A",
                       
                     }
                  }}
                  onClick={close}
                  size='large'
                  aria-label="close"
               >
                  <CloseIcon className='cbtn'  />
               </IconButton>
            </Tooltip>
            <IconButton
               onClick={restore}
               aria-label="restore"
               size='large'
               sx={{
                  borderRadius: 0,
                  marginTop: -1,
                  color: buttonsColor(),
               }}
            >
               <FilterNoneIcon sx={{
                  color: buttonsColor(),
               }} />
            </IconButton>
            <IconButton
               onClick={minimize}
               aria-label="minimize"
               size='large'
               sx={{
                  borderRadius: 0,
                  marginTop: -1,
                  color: buttonsColor(),
               }}
            >
               <MinimizeIcon sx={{
                  color: buttonsColor(),
               }} />
            </IconButton>

         </Stack>
      </Box>
   )
}

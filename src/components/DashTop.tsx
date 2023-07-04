import { Box, Typography } from "@mui/material"
import TopBar from "./TopBar"


export interface DashTopProps {
   title?: string
   imgSrc?: string

}

 const DashTop = ({title, imgSrc}:DashTopProps) => <Box
  display={"flex"} py={".5em"}
   borderBottom={".25px solid #ffffff22"}
   boxShadow={" -1px 8px 14px -9px rgba(77,76,76,0.77"}
   >
   <Box display={"flex"}>
      <img 
      className="jello-vertical"
      data-tauri-drag-region src={imgSrc} style={{
         width: "45px",
         height: "45px",
         marginInline:"1em"
      }} />
      <Typography
      className="tracking-in-contract"
      data-tauri-drag-region
         variant='h4'
         fontSize={27}
         fontWeight={500}
         sx={{
            marginInline: "10px",
            marginBlock:"6px"
         }}
      >{title}</Typography>
   </Box>
   <TopBar />
</Box>


export default DashTop
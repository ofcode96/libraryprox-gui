import { Home } from "@mui/icons-material"
import { Typography, Box } from "@mui/material"
import { t } from "i18next"
import { Route, Routes } from "react-router-dom"

interface AppBarTitleProps {
   title: string
   child: JSX.Element[] | JSX.Element
   sx?: {}
}




const AppBarTitle = () => {


   const titleElement = (title: string, icon: JSX.Element) =>
      (<Typography variant="h4" fontWeight="bold" mx={"40px"} >{title}</Typography>)



   return <Typography variant="h5" 
   fontWeight={700}
   letterSpacing={1}
    noWrap component="div" sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
     <Routes>
         <Route path='/dashboard/home' element={titleElement( t('Dashboard') ,<Home sx={{
            marginTop: "7px", marginInline: "calc(2.27% - 1em)"
         }} />)}/>
         <Route path='/dashboard/book' element={titleElement( t('Books') ,<Home sx={{
            marginTop: "7px", marginInline: "calc(2.27% - 1em)"
         }} />)}/>
         <Route path='/dashboard/student' element={titleElement( t('Students') ,<Home sx={{
            marginTop: "7px", marginInline: "calc(2.27% - 1em)"
         }} />)}/>
         <Route path='/dashboard/borrow' element={titleElement( t('Borrow') ,<Home sx={{
            marginTop: "7px", marginInline: "calc(2.27% - 1em)"
         }} />)}/>
         <Route path='/dashboard/users' element={titleElement( t('Users') ,<Home sx={{
            marginTop: "7px", marginInline: "calc(2.27% - 1em)"
         }} />)}/>
         <Route path='/dashboard/logs' element={titleElement( t('Logs') ,<Home sx={{
            marginTop: "7px", marginInline: "calc(2.27% - 1em)"
         }} />)}/>
         <Route path='/dashboard/about' element={titleElement( t('About') ,<Home sx={{
            marginTop: "7px", marginInline: "calc(2.27% - 1em)"
         }} />)}/>
     </Routes>
   </Typography>
}


export default AppBarTitle
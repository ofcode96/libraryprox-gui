import { AlertColor } from "@mui/material/Alert"



export default interface Snack {
   open: boolean ,
   message : string
   sevirity : AlertColor | undefined
}
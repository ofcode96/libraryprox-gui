import { AlertColor } from "@mui/material";
import { createContext, useState } from "react";


interface SnackBarProps {
   open?: boolean;
   severity?: AlertColor | undefined;
   msg?: string;
}
export type SnackBarType = [
   openSnack: SnackBarProps,
   setOpenSnack: React.Dispatch<React.SetStateAction<SnackBarProps>>
]

export const SnackBarContext = createContext<SnackBarType>([
   {
      open: false,
      severity: "success",
      msg: "This is a success message!"
   }, () => { }
])


export interface PropsContext {
   children: React.ReactNode
}


export const SnackBarProvider = ({ children }: PropsContext) => {

   const [openSnack, setOpenSnack] = useState<SnackBarProps>({
      open:false,
      severity:"success",
      msg:"This is a success message!"

   })

   
   


   return <SnackBarContext.Provider value={[openSnack,setOpenSnack]} >
      {children}
   </SnackBarContext.Provider>

}
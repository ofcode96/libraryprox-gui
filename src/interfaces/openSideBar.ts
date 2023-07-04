import Children from "./children"



export interface OpenSideBar {
   open : boolean 
   setOpen : React.Dispatch<React.SetStateAction<boolean>>
   children?:Children
 }

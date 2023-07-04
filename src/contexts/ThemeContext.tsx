import { createContext, useEffect, useReducer, useState } from "react";
import Children from "../interfaces/children";



export interface ThemeChangerType {
   color: string|null
   changeTheme: React.Dispatch<React.SetStateAction<string | null>>
   forceUpdate:()=>void
   styleTheme: () => React.CSSProperties | undefined

}

const initialize: string = "#000"



export const ThemeChangerContext = createContext<ThemeChangerType>({
   color: "",
   changeTheme: () => { },
   forceUpdate:()=>{},
   styleTheme: () => undefined

})


export const ThemeChangerProvider = ({ children }: Children) => {
   const [color, changeTheme] = useState<string|null>("red")

   const [ignore,forceUpdate] = useReducer(x=>x+1,0)

   const styleTheme =():React.CSSProperties | undefined=>{
      switch (color) {
         case "red":
            
            return {
               backgroundColor:"red"
            }
         case "yellow":
            
            return {
               backgroundColor:"yellow"
            }
      
         default:
            break;
      }
   }

   useEffect(() => {
      
     
   }, [color,ignore])




   return <ThemeChangerContext.Provider value={{ color, changeTheme,forceUpdate ,styleTheme, }}>
      {children}
   </ThemeChangerContext.Provider>
}
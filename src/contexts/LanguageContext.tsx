import { createContext, useEffect, useState } from "react";


export type LanguageDirType = [
   dir:string|null| undefined,
   setDir:React.Dispatch<React.SetStateAction<string >>
]

export const LanguageContext = createContext<LanguageDirType>([
   "",() => {}
])


export interface LangsContext {
   children : React.ReactNode
}


export const LaguageProvider =({children}:LangsContext)=>{
   const [dir,setDir] = useState(document.dir)

   useEffect(()=>{
      document.dir = dir 

   },[dir])

   return <LanguageContext.Provider value={[dir,setDir]}>
      {children}
   </LanguageContext.Provider>
} 
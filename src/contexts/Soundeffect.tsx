import { SetStateAction, createContext, useEffect, useState } from "react";
import Children from "../interfaces/children";




export type SoundContextType = {
   sound: boolean
   setSound: React.Dispatch<SetStateAction<boolean>>
}

export const SoundContext = createContext<SoundContextType>({
   sound: true,
   setSound: () => { }
})



export const SoundProvider = ({ children }: Children) => {
   const [sound, setSound] = useState(
      localStorage.getItem('sound') == "true" ? true : false
   )

   useEffect(() => {
      localStorage.setItem('sound',""+sound)

   }, [sound])
   
   console.log(sound)


   return <SoundContext.Provider value ={{sound,setSound}}>
      {children}
   </SoundContext.Provider>
}
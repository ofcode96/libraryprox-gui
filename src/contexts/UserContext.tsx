import {createContext ,useEffect ,useState } from 'react';
import { API_URL_BASE } from '../constants/utils';
import Children from '../interfaces/children';
import { Body, FetchOptions, ResponseType, fetch } from '@tauri-apps/api/http';

export type TokenContext = [token:string|null,setToken:React.Dispatch<React.SetStateAction<string | null>>]


export  const UserContext  = createContext<TokenContext>([
   "",() => {}
])






export const UserProvider = ({children}: Children)=>{
   const [token,setToken] = useState(localStorage.getItem("libAwesome"))

   useEffect(()=>{
      const token_gen  = async ()=>{
         const options:FetchOptions = {
            method:"GET",
            headers:{
               "Content-Type":"application/json",
               "Authorization" : "Bearer "+token
            }        
         
         
         }
     
            const response = await fetch(API_URL_BASE+"/api/v1/users/me",options)
            if (!response.ok) setToken(null)
   
         
      }
      localStorage.setItem("libAwesome",token!)
    
      token_gen()
   },[token])

   return(
      <UserContext.Provider value={[token,setToken]}>
         {children}
      </UserContext.Provider>
   )
}
import { createContext, useEffect, useState } from "react";
import Children from "../interfaces/children";
import { usersManegerApi } from "../constants/utils";
import { UsersManage } from "../interfaces/usersmanagrs";





export type UsersManagmentContextProps = {
   userManage: UsersManage[],
   setUserManage: (userManage: UsersManage[]) => void
}

const iniailize: UsersManage[] = [
   {
      id: 0,
      username: "",
      is_admin: true
   }
]

export const UsersManagmentContext = createContext<UsersManagmentContextProps>({
   userManage: [],
   setUserManage: () => { }
})


export const UsersManagmentProvider = ({ children }: Children) => {
   const [userManage, setUserManage] = useState<UsersManage[]>(iniailize)

   
   useEffect(()=>{
      usersManegerApi
         .all()
         .then(user=>setUserManage(user))
   },[])


   return <UsersManagmentContext.Provider value={{ userManage, setUserManage }}>
      {children}
   </UsersManagmentContext.Provider>
}


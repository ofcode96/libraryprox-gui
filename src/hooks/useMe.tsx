import { useEffect, useState } from "react"
import { UsersManage } from "../interfaces/usersmanagrs"
import jwtDecode from "jwt-decode"



const useMe = ()=>{
   const [currentUser, setCurrentUser] = useState<UsersManage>()
   useEffect(() => {

      try {
        const token = localStorage.getItem('libAwesome')
        const decodedtoken: UsersManage = jwtDecode(token!)
        setCurrentUser(decodedtoken)
  
      } catch (error) {
  
      }
  
    }, [])


   return currentUser
}

export default useMe
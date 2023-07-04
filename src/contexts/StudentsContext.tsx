import { createContext,  useEffect, useState } from "react";
import Children from "../interfaces/children";
import {  studentApi } from "../constants/utils";
import StudentsInterface from "../interfaces/student";



const initialize: StudentsInterface[] = [
   {
      id: 0,
      address: "",
      date_birth: "",
      signin_date: "",
      phone: "",
      role: 0,
      is_banned: false,
      decription: "",
      owner_id: 0

   }
]

export interface StudentsType {
   students: StudentsInterface[]
   setStudents: (students: StudentsInterface[]) => void
  
}




export const StudentsContext = createContext<StudentsType>({
   students: [],
   setStudents: () => { }

})


export const StudentsProvider = ({ children }: Children) => {

   const [students, setStudents] = useState<StudentsInterface[]>(initialize)




   useEffect(() => {
      studentApi
         .all()
         .then(student => setStudents(student))
   }, [])

   return <StudentsContext.Provider value={{ students, setStudents }}>
      {children}
   </StudentsContext.Provider>
}
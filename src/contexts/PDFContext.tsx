import React, { SetStateAction, createContext, useEffect, useState } from "react";
import StudentsInterface from "../interfaces/student";
import Children from "../interfaces/children";


export type PDFContextType = {
   studentPDF : StudentsInterface,
   setStudentPDF : (studentPDF: StudentsInterface) => void
}


export const PDFContext = createContext<PDFContextType>({
   studentPDF:{},
   setStudentPDF:()=>{}
})

export const PDFProvider = ({children}:Children)=>{
   const [studentPDF,setStudentPDF] = useState<StudentsInterface>({
      id:0,
      fname:""
   })

   useEffect(()=>{
      setStudentPDF(studentPDF)
   },[studentPDF])


   return <PDFContext.Provider value={{studentPDF,setStudentPDF}}>
      {children}
   </PDFContext.Provider>
}
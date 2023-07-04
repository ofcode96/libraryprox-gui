import { createContext, useEffect, useState } from "react";
import Children from '../interfaces/children'
import { borrowApi } from "../constants/utils";
import BorrowInterface from "../interfaces/borrow";




const initialize: BorrowInterface[] = [
   {
      book_id: 0,
      id: 0,
      end_date: "",
      start_date: "",
      student_id: 0,
      state: 0,
      owner_id: 0

   }
]

export type BorrowContextType = {
   borrows: BorrowInterface[]
   setBorrows: (borrows: BorrowInterface[]) => void
}

export const BorrowContext = createContext<BorrowContextType>({
   borrows: [],
   setBorrows: () => { }
})

export const BorrowProvider = ({ children }: Children) => {

   const [borrows, setBorrows] = useState<BorrowInterface[]>(initialize)

   useEffect(()=>{
      borrowApi
         .all()
         .then(borrow=>setBorrows(borrow))
   },[])


   return <BorrowContext.Provider value={{borrows, setBorrows}}>
      {children}
   </BorrowContext.Provider>




}
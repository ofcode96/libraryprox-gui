import { createContext, useEffect, useState } from "react";
import Children from "../interfaces/children";

export interface BorrowAddInterface {
   id:number
   bookId: number
   studentId: number
   bookTitle: string
   studentFname: string

}

export type BorrowAddContextType = {
   borrowSaved: BorrowAddInterface
   setBorrowSaved: (borrowSaved: BorrowAddInterface) => void
}
export const initilaize: BorrowAddInterface = {
   id:0,
   bookId: 0,
   studentId: 0,
   bookTitle: "",
   studentFname: ""
}

export const BorrowAddContext = createContext<BorrowAddContextType>({
   borrowSaved: initilaize, setBorrowSaved: () => { }
})

export const BorrowAddProvider = ({ children }: Children) => {
   const [borrowSaved, setBorrowSaved] = useState(initilaize)

   useEffect(() => {
      localStorage.setItem('borrowAdd', JSON.stringify(borrowSaved))
   }, [borrowSaved, setBorrowSaved])

   return <BorrowAddContext.Provider value={{ borrowSaved, setBorrowSaved }}  >{children}</BorrowAddContext.Provider>


}
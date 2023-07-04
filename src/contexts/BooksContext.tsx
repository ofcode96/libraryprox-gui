import {  createContext,  useEffect, useState } from "react";
import Children from "../interfaces/children";
import BookInterface from "../interfaces/book";
import { bookApi } from "../constants/utils";
import { useQuery } from "@tanstack/react-query";



const initiaze:BookInterface[] = [{
     id: 0,
     title: "",
     author: "",
     date_print: 0,
     copies: 0,
     decription: "",
     edition: 0,
     is_aviable: true,
     last_browed: 0,
     owner_id: 0,
     pages: 0,
     part: 0,
     price:0,
     version:0
   }]

export interface BookContextType{
   books:BookInterface[],
   setBooks: (books: BookInterface[]) => void
   
}

export const BooksContext = createContext<BookContextType>({
   books:[],
   setBooks:()=>{}
  
})





export const BooksProvider = ({ children }: Children) => {
  
  
   const [books, setBooks] = useState<BookInterface[]>(initiaze)
 
   // const {data} = useQuery({
   //    queryKey:["books"],
   //    queryFn:async ()=> await bookApi.all()
   // })

  
    useEffect(() => {
      bookApi
      .all()
      .then(books=> setBooks(books))

    }, [])
  
   

   return <BooksContext.Provider value={{ books,setBooks }}>
      {children}
   </BooksContext.Provider>
}
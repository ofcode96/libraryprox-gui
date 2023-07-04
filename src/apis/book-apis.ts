import { API_URL_BASE } from "../constants/utils"
import BookInterface from "../interfaces/book"
import { Body, FetchOptions, ResponseType, fetch } from '@tauri-apps/api/http';

const token = localStorage.getItem("libAwesome")

export default class BookApi {

   async all(): Promise<BookInterface[]> {

      let books: BookInterface[] = []
      const options:FetchOptions = {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
         }
      }
      const response = await fetch(API_URL_BASE + "/api/v1/books", options)

      const data = await response.data

      if (!response.ok) {
         console.log('cant grapp books')
         return []
      }

      books = data as BookInterface[]

      return books
   }

   async alltest(quiry?:any|null): Promise<BookInterface[]> {

      let books: BookInterface[] = []
      const options:FetchOptions = {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
         }
      }
      const response = await fetch(API_URL_BASE + "/api/v1/books", options)

      const data = await response.data

      if (!response.ok) {
         console.log('cant grapp books')
         return []
      }

      books = data as BookInterface[]
      if(quiry !== null){
         return books.filter(
            book=>{
              return  book.id?.toString().includes(quiry) || book.title?.toLowerCase().includes((quiry as string).toLowerCase())
            })
      }

      return  books
   }

   async getById(id: number): Promise<BookInterface> {
      const options:FetchOptions = {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
         },
         responseType:ResponseType.JSON
         
      }

      const response = await fetch(API_URL_BASE + `/api/v1/books/${id}`, options)
      const book = await response.data

      if (!response.ok) {
         console.error("can get book id")
         throw [] 
      }

      return book as BookInterface

   }

   async remove(id: number) {
      const options:FetchOptions = {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
         }
      }

      const response = await fetch(API_URL_BASE + `/api/v1/books/${id}`, options)

      if (!response.ok) {
         console.error("can get  book ")
         return []
      }

   }

   async update (books:Object,id:number){
      
      const options:FetchOptions = {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,

         },
         body: Body.json(books)
      }
      
      const response = await fetch(API_URL_BASE + `/api/v1/books/${id}`, options)

      if (!response.ok) {
         console.log("cant update book")
         return []
      }

   }
   
   async add(book:Object){
      const options:FetchOptions = {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,

         },
         body: Body.json(book)
      }

      const response = await fetch(API_URL_BASE + '/api/v1/books', options)

      if (!response.ok) {
         console.log("cant add nw book")
         return {}
      }


   }



}
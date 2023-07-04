import { API_URL_BASE } from "../constants/utils"
import BorrowInterface from "../interfaces/borrow"
import { Body, FetchOptions, ResponseType, fetch } from '@tauri-apps/api/http';
const token = localStorage.getItem("libAwesome")
export default class BorrowApi {

   async all(): Promise<BorrowInterface[]>{
      let borrows:BorrowInterface[] = []

      const options:FetchOptions = {
         method:"GET",
         headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " +token 
         },
         responseType:ResponseType.JSON
      }

      const response = await fetch(API_URL_BASE+'/api/v1/borrows',options)
      const data = await response.data
      if (!response.ok){
         console.log("Cant grap the borrows ")
         return []
      }

      borrows = data as BorrowInterface[]

      return borrows 
   }

   async add (borrow:Object){
      const options:FetchOptions = {
         method:"POST",
         headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " +token 
         },
         body:Body.json(borrow)
      }

      const response = await fetch(API_URL_BASE+'/api/v1/borrows',options)
     
      if (!response.ok){
         console.log("Cant add the borrows ")
         return []
      }

   }

   async remove (id:number ) {
      const options:FetchOptions = {
         method:"DELETE",
         headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + token,
         }
      }

      const response = await fetch(API_URL_BASE+`/api/v1/borrows/${id}`,options)
      if (!response.ok){
         console.log("Cant add the borrows ")
         return {}
      }
   }

   async update (borrow:Object,id:number){
      const options:FetchOptions = {
         method:"PUT",
         headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + token,
         },
         body:Body.json(borrow)
      }

      const response = await fetch(API_URL_BASE+`/api/v1/borrows/${id}`,options)
      if (!response.ok){
         console.log("cant update borrow")
         return {}
      }
   }


}
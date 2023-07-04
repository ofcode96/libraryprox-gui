import { API_URL_BASE } from "../constants/utils";
import { Body, FetchOptions, ResponseType, fetch } from '@tauri-apps/api/http';
import ProcessInterface from "../interfaces/process";


const token = localStorage.getItem("libAwesome")




export default class ProcessApi {
   async get():Promise<ProcessInterface[]> {
      const options: FetchOptions = {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
         },
         responseType: ResponseType.JSON
      }
      const response = await fetch(API_URL_BASE + "/mainServer", options)
      const data = await response.data

      if (!response.ok) {
         console.error("error on cant get proccess MainServer");
      }

      return data as ProcessInterface[]

   }
   async kill(pid:number) {
      const options: FetchOptions = {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
         },
         responseType: ResponseType.JSON
      }
      const response = await fetch(API_URL_BASE + "/kill?pid="+pid, options)
     
      if (!response.ok) {
         console.error("error on cant kill server");
      }


   }
}
import { API_URL_BASE } from "../constants/utils"
import LogInterface from "../interfaces/log"
import { Body, FetchOptions, ResponseType, fetch } from '@tauri-apps/api/http';
const token = localStorage.getItem("libAwesome")


export default class LogsApi {
   async all(): Promise<LogInterface[]> {

      let logs: LogInterface[] = []

      const options:FetchOptions = {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
         },
         responseType:ResponseType.JSON
      }

      const response = await fetch(API_URL_BASE + "/api/v1/log", options)

      const data = await response.data

      if (!response.ok) {
         console.log('cant grap logs')
         return []
      }

      logs = data as LogInterface[]

      return logs

   }

   async add(log:LogInterface){
      const options:FetchOptions = {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,

         }
      }
      const response = await fetch(API_URL_BASE + `/api/v1/log?msg=${log.opration}&user=${log.user}`, options)

      if (!response.ok) {
         console.log("cant add new log")
         return {}
      }


   }


}
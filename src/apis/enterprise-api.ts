import { API_URL_BASE } from "../constants/utils"
import { Body, FetchOptions, ResponseType, fetch } from '@tauri-apps/api/http';
const token = localStorage.getItem("libAwesome")

export default class EnterpriseApi {
   async all(): Promise<{ name?: string, subname?: string, img?: string }> {
      const options:FetchOptions = {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
         },
         responseType:ResponseType.JSON
      }
      const response = await fetch(API_URL_BASE + "/api/v1/enterprise", options)
      const data = await response.data

      if (!response.ok) {
         console.log('cant grapp enterprise')
         return {}
      }

      return data as { name?: string, subname?: string, img?: string }

   }

   async add(name: string, subname: string, body: Body) {
      const options:FetchOptions = {
         method: "POST",
         headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "multipart/form-data",
            "accept": "application/json"
         },
         body: body

      }
      const response = await fetch(
         API_URL_BASE + `/api/v1/enterprise?name=${name}&subname=${subname}`
         , options)
      if (!response.ok) {
         console.log("cant add entreprise")
         console.log(response)
         return {response}
      }
   }

   async newAdd (name: string, subname: string, file: string){
      const options:FetchOptions = {
         method: "POST",
         headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
         }
        

      }
      const response = await fetch(
         API_URL_BASE + `/api/v1/enterprise/new?name=${name}&subname=${subname}&file=${file}`
         , options)
      if (!response.ok) {
         console.log("cant add entreprise")
         console.log(response)
         return {response}
      }
   }

}
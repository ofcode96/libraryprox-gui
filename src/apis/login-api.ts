import { API_URL_BASE } from "../constants/utils"
import { Body, FetchOptions, ResponseType, fetch } from '@tauri-apps/api/http';



export default class LoginApi {
   async login(username: string, password: string): Promise<{
      error: boolean,
      data: any
   }> {
      const options:FetchOptions = {
         method: "POST",
         headers: { "Content-Type": "application/x-www-form-urlencoded" },
         body: Body.text(`grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`)
      }

      const response = await fetch(API_URL_BASE + '/api/v1/token', options)
      const data = await response.data
      let error = false

      if (!response.ok) {

         return { error: true ,data:{}}
      }

      return { error, data }
   }

}
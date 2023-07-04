import { API_URL_BASE } from "../constants/utils";
import { UsersManage } from "../interfaces/usersmanagrs";
import { Body, FetchOptions, ResponseType, fetch } from '@tauri-apps/api/http';

const token = localStorage.getItem("libAwesome")

export default class Me {
   async me(): Promise<UsersManage> {
      const options:FetchOptions = {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
         },
         responseType:ResponseType.JSON
      }


      const response = await fetch(API_URL_BASE + "/api/v1/users/me", options)
      const me = await response.data
   
      if (!response.ok) {
         console.error("error on me");
      } 

      return me as UsersManage


   }
}
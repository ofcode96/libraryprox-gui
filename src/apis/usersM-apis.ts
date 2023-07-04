import { Body, FetchOptions, ResponseType, fetch } from '@tauri-apps/api/http';
import { API_URL_BASE } from "../constants/utils"
import { UsersManage } from "../interfaces/usersmanagrs"

const token = localStorage.getItem("libAwesome")
export default class UsersManegerApi {
   async all() {
      let users: UsersManage[] = []

      const options:FetchOptions = {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
         },
         responseType:ResponseType.JSON
      }

      const response = await fetch(API_URL_BASE + "/api/v1/users", options)
      const data = await response.data

      if (!response.ok) {
         console.log('cant grapp users')
         return []
      }

      users = data as UsersManage[]

      return users
   }


   async getById (id:number){
      const options:FetchOptions = {
         method:"GET",
         headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + token,
         },
         responseType:ResponseType.JSON
      }

      const response = await fetch(API_URL_BASE+'/api/v1/users/'+id,options)
      const data = await response.data

      if (!response.ok){
         console.log("cant get user")
         return {}
      }

      return data as UsersManage
      
   }
   
   async add (user:Object){
      const options:FetchOptions = {
         method:"POST",
         headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + token,
         },
         body:Body.json(user)

      }
      const response = await fetch(API_URL_BASE+'/api/v1/users',options)
      if (!response.ok){
         console.log("cant add user")
         return {}
      }

   }


   async remove(id: number) {
      const options:FetchOptions = {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
         }
      }

      const response = await fetch(API_URL_BASE + `/api/v1/users/${id}`, options)
      if (!response.ok) {
         console.log("cant remove users")
         return {}
      }
   }

   async update(user: Object, id: number) {
      const options:FetchOptions = {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
         },
         body:Body.json(user)
      }

      const response = await fetch(API_URL_BASE + `/api/v1/users/${id}`, options)
      if (!response.ok) {
         console.log("cant update users")
         return {}
      }
   }
}

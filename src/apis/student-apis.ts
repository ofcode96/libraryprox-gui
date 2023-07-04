import { API_URL_BASE } from "../constants/utils"
import StudentsInterface from "../interfaces/student"
import { Body, FetchOptions, ResponseType, fetch } from '@tauri-apps/api/http';

const token = localStorage.getItem("libAwesome")
export default class StudentApi {

   async all(): Promise<StudentsInterface[]>{
      let students:StudentsInterface[]  = []

      const options:FetchOptions = {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
         },
         responseType:ResponseType.JSON
      }

      const response = await fetch(API_URL_BASE + "/api/v1/students", options)
      const data = await response.data

      if (!response.ok) {
         console.log('cant grapp books')
         return []
      } 

      students = data as StudentsInterface[]

      return students 
   }

   async getById(id:number): Promise<StudentsInterface>{

      const options:FetchOptions = {
         method :"GET",
         headers:{
            "Content-type":"application/json",
            "Authorization":"Bearer " +token
         },
         responseType:ResponseType.JSON
      }

      const response = await fetch(`${API_URL_BASE}/api/v1/students/${id}`, options)
      const student = await response.data

      if (!response.ok) {
         console.log('cant get id students')
         throw []
      } 

      return student as StudentsInterface

   }

   async add (student:Object){
      const options:FetchOptions = {
         method:"POST",
         headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + token,
         },
         body:Body.json(student)

      }
      const response = await fetch(API_URL_BASE+'/api/v1/students',options)
      if (!response.ok){
         console.log("cant add student")
         return {}
      }

   }

   async remove(id:number){
      const options:FetchOptions = {
         method:"DELETE",
         headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + token,
         },
         responseType:ResponseType.JSON
      }

      const response = await fetch(API_URL_BASE+`/api/v1/students/${id}`,options)
      if (!response.ok){
         console.log("cant remove student")
         return {}
      }
   }

   async update (student:Object,id:number){
      const options:FetchOptions = {
         method:"PUT",
         headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + token,
         },
         body:Body.json(student)
      }

      const response = await fetch(API_URL_BASE+`/api/v1/students/${id}`,options)
      if (!response.ok){
         console.log("cant delete student")
         return {}
      }
   }
}
import { ResponseType, fetch } from "@tauri-apps/api/http"
import backendData from "../../backend-data.json"
import BookApi from "../apis/book-apis"
import BorrowApi from '../apis/borrow-apis'
import EnterpriseApi from '../apis/enterprise-api'
import LoginApi from '../apis/login-api'
import LogsApi from '../apis/logs-api'
import Me from '../apis/me-apis'
import StudentApi from "../apis/student-apis"
import UsersManegerApi from '../apis/usersM-apis'
import ProcessApi from "../apis/process-apis"
import { invoke } from "@tauri-apps/api/tauri"
import { json } from "node:stream/consumers"


export const loginApi = new LoginApi()
export const bookApi = new BookApi()
export const studentApi = new StudentApi()
export const borrowApi = new BorrowApi()
export const usersManegerApi = new UsersManegerApi()
export const itsMeApi = new Me()
export const logApi = new LogsApi()
export const enterpriceApi = new EnterpriseApi()
export const processApi = new ProcessApi()

export const getIp = () => {

   invoke("get_host_name")
   .then(data=>{
     const finalData = JSON.parse(data as string) 
      localStorage.setItem('PC', finalData)
   })

   const PC = localStorage.getItem('PC') 

   fetch(`http://${PC}:9000/ip`,
   {
      method:"GET",
      responseType:ResponseType.JSON
   }
   )
   .then(res=>{
      type IP =  {ip:string}
      const data = res.data as IP 
      
      localStorage.setItem('ip',data.ip )

   }
      
    )
   


}




 const PC =localStorage.getItem('PC') as string

export const API_URL_BASE = "http://"+ PC + ":9000"

console.log(API_URL_BASE)



export const initAdmin = async ()=>{
   
   await fetch(`${API_URL_BASE}/api/v1/admin`)
      .then(data => data.data)
      .then(data => {
         console.log(data)
      })

}
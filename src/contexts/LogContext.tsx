import { createContext, useEffect, useRef, useState } from "react";
import Children from "../interfaces/children";
import LogInterface from "../interfaces/log";
import { logApi } from "../constants/utils";



const initiaze: LogInterface[] = [{
   date: "",
   opration: "",
   user: ""
}]

export interface LogContextType {
   logs: LogInterface[],
   setLogs: (logs: LogInterface[]) => void

}

export const LogsContext = createContext<LogContextType>({
   logs: [],
   setLogs: () => { }

})





export const LogsProvider = ({ children }: Children) => {


   const [logs, setLogs] = useState<LogInterface[]>(initiaze)




   useEffect(() => {
      logApi
         .all()
         .then(logs => {

            setLogs(logs)

         })
   }, [])



   return <LogsContext.Provider value={{ logs, setLogs }}>
      {children}
   </LogsContext.Provider>
}
import { useCallback, useContext, useEffect } from "react"
import { LogsContext } from "../contexts/LogContext"
import { logApi } from "../constants/utils"


const useLogUpdater = ()=>{
   const { setLogs } = useContext(LogsContext)

   const update = useCallback(async ()=>{
      const updateLogs = await logApi.all()
      setLogs(updateLogs)
   },[setLogs])

   useEffect(() => {
      update()
   }, [update])

   
}

export default useLogUpdater
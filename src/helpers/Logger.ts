import { logApi } from "../constants/utils"


// Log file
export const logger = async (opration: string, user: string) => {
   await logApi.add({ opration: opration, user: user })

}
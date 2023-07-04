

export default class TimeConverter{

   public static toRealTime = (timestemp: number|string) => new Date(Math.floor((+timestemp+86400)*1000))


   public static toTimeStemp = (realTime: string) => new Date(realTime).getTime()
   

   public static  daysBetween(start:number,end:number){
      const dayInSec = (3600*24)
      const diff = end -start
      return Math.ceil(diff/dayInSec)
  }
  



}
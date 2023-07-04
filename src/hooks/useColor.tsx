import { useEffect, useState } from "react"

const useColor = () => {
   const [color,changeColor] = useState(localStorage.getItem('primary'))
   const colorsStyles = ()=>{
      switch (color) {
         case "red":
            return {
               main: "#FF0303"
            }
         case "yellow":
            return {
               main: "#E7B10A"
            }
         case "pink":
            return {
               main: "#E384FF"
            }
   
   
         default:
            return {
               main: "#FFF"
            }
      }

   }

   useEffect(() => {
      colorsStyles()
   }, [color])
   

   return {changeColor,colorsStyles}
}


export default useColor
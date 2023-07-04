import { FormControl, IconButton, InputAdornment, TextField } from "@mui/material"
import AccountCircle from "@mui/icons-material/AccountCircle"
import { FocusEventHandler, useState } from "react"
import { Visibility, VisibilityOff } from "@mui/icons-material"

interface TextFieldProps {
   placeHolder?: string
   startIcon?: JSX.Element | null
   passwordIcon?: boolean
   type?: string
   value :string
   onChange :(e:React.ChangeEvent<HTMLInputElement>)=>void
   onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined

}


export default function RoundedInput({
   placeHolder, startIcon,  type = "text" , value,onChange,onFocus
}: TextFieldProps) {
   const [typeInput, setTypeInput] = useState(type);

   const startAdor = startIcon && (
      <InputAdornment position="start">
         {startIcon}
      </InputAdornment>
   )



   const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
   };

   const endAdor = type === "password" && (
      <InputAdornment position="end">
         <IconButton
            aria-label="toggle password visibility"
            onMouseDown={handleMouseDownPassword}
            edge="end"
         >
           
         </IconButton>
      </InputAdornment>
   )

  
   return (
      <FormControl>
         <TextField
            className="white-input"
            placeholder={placeHolder}
            type={typeInput}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            autoComplete="off"
           
           variant="standard"
            InputProps={{
               startAdornment: startAdor,
               endAdornment: endAdor,
               disableUnderline:true
            }}

         />
      </FormControl>
   )
}



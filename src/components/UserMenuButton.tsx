import { AccountCircle } from "@mui/icons-material"
import { Tooltip, Avatar, IconButton } from "@mui/material"



interface UserMenuIconButtonProps{
   username : string
   handleClick :(event: React.MouseEvent<HTMLButtonElement>) => void
}

const UserMenuIconButton = ({username,handleClick}:UserMenuIconButtonProps) =>
   <Tooltip title={username}   >
      <Avatar

         sx={{
            marginX: ".35em",
            backgroundColor:"transparent",
            color:"white"
         }}

      >
         <IconButton sx={{ padding:"1em" }}  onClick={handleClick}  >
            <AccountCircle sx={{
               scale: "1.85"
            }} />
         </IconButton>
      </Avatar>
   </Tooltip>



export default UserMenuIconButton
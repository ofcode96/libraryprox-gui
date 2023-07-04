import { Box, Menu, MenuItem } from "@mui/material";


interface DropDownMenuUserProps{
   anchorEl:HTMLElement | null
   openMenuDrop:boolean
   handleClose:() => void
   appBarItems:{
      itemName: string;
      icon: JSX.Element;
      onclickKey: string;
  }[]

  funcFiltring:(key: string) => (() => void) | undefined
}


const DropDownMenuUser = ({
   anchorEl,
   openMenuDrop,
   handleClose,
   appBarItems,
   funcFiltring

}:DropDownMenuUserProps)=>{
   return <Box sx={{ textAlign: "center" }}
   >
      <Menu
         id="basic-menu"
         anchorEl={anchorEl}
         open={openMenuDrop}
         onClose={handleClose}
         MenuListProps={{
            'aria-labelledby': 'basic-button',
         }}
         sx={{
            marginTop: "1em"
         }}
      >
         {appBarItems.map(

            item => (<MenuItem
            sx={{justifyContent:"flex-start",gap:"5px"}}
            key={item.itemName}
               onClick={funcFiltring(item.onclickKey)} >
               {item.icon} {item.itemName}
            </MenuItem>)

         )}


      </Menu>
   </Box>

}


export default DropDownMenuUser
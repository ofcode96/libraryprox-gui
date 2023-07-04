import Button, { ButtonPropsColorOverrides } from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { SetStateAction, forwardRef, useState } from 'react';

const Transition = forwardRef(function Transition(
   props: TransitionProps & {
      children: React.ReactElement<any, any>;
   },
   ref: React.Ref<unknown>,
) {
   return <Slide direction="up" ref={ref} {...props} />;
});

export type DailogCustume = {
   setOpen: React.Dispatch<SetStateAction<boolean>>,
   action: () => void
   dialogTitle: string
   dialogBody: string
   actionTitle: string
   color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
}

export default function DailogCustume({ setOpen, action, dialogTitle, dialogBody, actionTitle, color }: DailogCustume) {




   return (
      <div>
         <Dialog
            open={true}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setOpen(false)}
            aria-describedby="alert-dialog-slide-description"
         >
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>
               <DialogContentText id="alert-dialog-slide-description">
                  {dialogBody}
               </DialogContentText>
            </DialogContent>
            <DialogActions>

               <Button variant='contained'  color={color} onClick={action}>{actionTitle}</Button>
            </DialogActions>
         </Dialog>
      </div>
   );
}
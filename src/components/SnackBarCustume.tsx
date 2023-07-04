import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snack from '../interfaces/snackbar';
import { LanguageContext } from '../contexts/LanguageContext';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface CustomSnackBarProps {
   snack:Snack 
   setSnack : React.Dispatch<React.SetStateAction<Snack>>

}

export default function CustomizedSnackbars({snack,setSnack}:CustomSnackBarProps) {
  
   const [dir,] = React.useContext(LanguageContext)


  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnack({...snack,open:false});
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
    
      <Snackbar anchorOrigin={{
         vertical: 'bottom',
          horizontal:dir == "rtl" ? 'left' :"right"
          }} open={snack.open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snack.sevirity} sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
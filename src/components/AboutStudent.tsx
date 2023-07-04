import { List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import Modal from '@mui/material/Modal';
import { SetStateAction, useContext } from "react"
import StudentsInterface from '../interfaces/student';
import { t, dir } from 'i18next';
import { LanguageContext } from '../contexts/LanguageContext';
import TimeConverter from '../helpers/TimeConverter';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};




type AboutStudentProps  = {
  setOpenAbout:React.Dispatch<SetStateAction<boolean>>
  student:StudentsInterface
}

export default function AboutStudent({setOpenAbout,student}:AboutStudentProps) {

  
  const [dir] = useContext(LanguageContext)


  const tableData = Object.entries(student).map(([key, value]) => {
    if (key === "role") {
      switch (+value) {
        case 0:
          value = t("Student")
          break;
      
        case 1:
          value = t("VIP")
          break;
      
        case 2:
          value = t("VVIP")
          break;
      
        default:
          break;
      }
      
    }
    if (key === "is_banned") {
      value = value ? t("Banned") : t("Regular")
    }

    if (key === "signin_date") {
      value = TimeConverter.toRealTime(value).toISOString().slice(0,10)
    }
    if (key === "date_birth") {
      value = TimeConverter.toRealTime(value).toISOString().slice(0,10)
    }

    return <TableRow>
      <TableCell align={dir === "rtl" ? "right" : "left"} >
        {t(key.replace('_'," "))}
      </TableCell>
      <TableCell align={dir === "rtl" ? "right" : "left"} >
        {value}
      </TableCell>
    </TableRow>
  })


  return (
    <Modal
   
      onClose={()=>setOpenAbout(false)}
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    
    >
     <TableContainer sx={style} component={Paper} >
        <Table sx={{ overflow: "scroll", maxHeight: 100 }}>
          <TableBody >
            {...tableData}
          </TableBody>
        </Table>
      </TableContainer>

    </Modal>
  )
}

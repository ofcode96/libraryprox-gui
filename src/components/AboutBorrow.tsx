import React, { SetStateAction, useContext } from 'react'
import Modal from '@mui/material/Modal';
import { List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import BorrowInterface from '../interfaces/borrow';
import { t } from 'i18next';
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


export type AboutStudentProps  = {
   setOpenAboutBorrow:React.Dispatch<SetStateAction<boolean>>
   borrow:BorrowInterface
 }
 

export default function AboutBorrow({setOpenAboutBorrow,borrow}:AboutStudentProps) {


  const [dir] = useContext(LanguageContext)


  const tableData = Object.entries(borrow).map(([key, value]) => {
    if (key === "state") {
      switch (+value) {
        case 0:
          value = t("Running")
          break;
      
        case 1:
          value = t("Stoped")
          break;
      
        case 2:
          value = t("Missed")
          break;
        case 3:
          value = t("Don't Back")
          break;
      
        default:
          break;
      }
      
    }


    if (key === "start_date") {
      value = TimeConverter.toRealTime(value).toISOString().slice(0,10)
    }
    if (key === "end_date") {
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
      open={true}
      onClose={()=>setOpenAboutBorrow(false)}
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

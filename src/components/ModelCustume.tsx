import Modal from '@mui/material/Modal';
import { SetStateAction } from 'react';
import { Paper, SxProps, Table, TableBody, TableCell, TableContainer, TableRow, Theme } from '@mui/material';
import BookInterface from '../interfaces/book';
import { LanguageContext } from '../contexts/LanguageContext';

import { useContext } from "react"
import { t } from 'i18next';

const style: SxProps<Theme> | undefined = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,

  bgcolor: 'background.paper',
  border: '3px solid var(--main)',
  boxShadow: 24,
  p: 4,
  maxHeight: {
    sm: 650,
    lg: 1000
  },
  "::-webkit-scrollbar": {
    display: "none"
  }

};



interface OpenModelProps {
  openModelBook: boolean
  setOpenModelBook: React.Dispatch<SetStateAction<boolean>>
  bookCard: BookInterface
}

export default function ModelCostume({ bookCard, openModelBook, setOpenModelBook }: OpenModelProps) {


  const [dir] = useContext(LanguageContext)


  const tableData = Object.entries(bookCard).map(([key, value]) => {
    if (key === "is_aviable") {
      value = value ? t("No") : t("Yes")
    }
    if (key === "decription") {
      value = !value.length ? t("Empty") : value
    }
    if (key === "last_browed") {
      value = !value ? t("No One") : value
    }

    return <TableRow>
      <TableCell align={dir === "rtl" ? "right" : "left"} >
        {t(key.replace('_'," ").toLowerCase())}
      </TableCell>
      <TableCell align={dir === "rtl" ? "right" : "left"} >
        {value}
      </TableCell>
    </TableRow>
  })

  return (

    <Modal
      open={openModelBook}
      onClose={() => setOpenModelBook(false)}
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

  );
}
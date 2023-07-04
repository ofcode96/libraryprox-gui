import React, { useContext, useState } from 'react'
import { AddBorrowForm, BorrowCard, FloatingActionButton, SearchBar, SnackBarToast } from '../../components'
import { BorrowContext } from '../../contexts/BorrowContext'
import { Box, CircularProgress } from '@mui/material'
import filtredList from '../../helpers/FilteredList'
import { t } from 'i18next'

function Borrow() {
  const [searchId, setSearchId] = useState(true)
  const [searchQuiry, setSearch] = useState('')

  const [openNewBorrow, setNewBorrow] = useState(false)


  const { borrows } = useContext(BorrowContext)

  // Borrows Filter List 
  const filtredListBorrows = filtredList(borrows, searchId, searchQuiry)



  return (
    <>
      <SearchBar  {...{ setSearch, setSearchId, isId: true }} />
      <Box
      
        sx={{
          
          width: "100%",
          marginTop: 7,
          display: "flex",
          rowGap: "1em",
          columnGap: "15px",
          flexWrap: "wrap",
          justifyContent: "center",


        }}
      >
        {filtredListBorrows.length <= 0 ? <h1>{t("Student is not exists")}</h1> : filtredListBorrows.map((borrow, index) => {
          if (borrow.id === 0) {
            return <Box
            key={index}
            sx={{
              height: "100%",
              display: "grid",
              placeItems: "center"
            }}>
              <CircularProgress />
            </Box>
          }
          return <BorrowCard key={index} {...borrow} />
        })}

        <FloatingActionButton onclick={() => setNewBorrow(true)} />
        {openNewBorrow && <AddBorrowForm {...{ setNewBorrow }} />}



      </Box>
      <SnackBarToast />

    </>
  )
}

export default Borrow
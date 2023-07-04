import { useContext, useState } from 'react'
import { StudentsContext } from '../../contexts/StudentsContext'
import { AddStudentForm, FloatingActionButton, SearchBar, SnackBarToast, StudentCard } from '../../components'
import filtredList from '../../helpers/FilteredList'
import { Box, CircularProgress } from '@mui/material'

import { t } from 'i18next'



function Students() {
  const [searchId, setSearchId] = useState(false)
  const [searchQuiry, setSearch] = useState('')

  const { students } = useContext(StudentsContext)

  const [openNewStudent, setNewStudent] = useState(false)

  // Students Filter List 
  const filtredListStudents = filtredList(students, searchId, searchQuiry, "fname")


  return (
    <>
      <SearchBar  {...{ setSearch, setSearchId }} />
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
        {filtredListStudents.length <= 0 ? <h1>{t("Student is not exists")}</h1> : filtredListStudents.map((student, index) => {
          if (student.id === 0) {
            return <Box sx={{
              height: "100%",
              display: "grid",
              placeItems: "center"
            }}>
              <CircularProgress />
            </Box>
          }
          return<StudentCard key={index} {...student} />


        })}





        <FloatingActionButton onclick={() => setNewStudent(true)} />
        {openNewStudent && <AddStudentForm {...{ setNewStudent }} />}


      </Box>

      <SnackBarToast />
    </>
  )
}

export default Students
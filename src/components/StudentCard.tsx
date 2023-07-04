import { Card, CardContent, Box, Typography, Avatar, Divider, CardActions, Button, Skeleton, Tooltip, IconButton } from '@mui/material'
import { t } from 'i18next'
import StudentsInterface from '../interfaces/student'
import { API_URL_BASE, enterpriceApi, studentApi } from '../constants/utils'
import { useContext, useEffect, useState } from 'react'
import AboutStudent from './AboutStudent'
import { SnackBarContext } from '../contexts/SnackBarContext'
import { StudentsContext } from '../contexts/StudentsContext'
import { AddToBorrowButton, UpdateStudent } from '../components'
import { PDFContext } from '../contexts/PDFContext'
import { useNavigate } from 'react-router-dom'
import { BorrowAddContext } from '../contexts/BorrowAddContext'
import { logger } from '../helpers/Logger'
import useMe from '../hooks/useMe'
import EnterPriseInterface from '../interfaces/enterprise'
import TimeConverter from '../helpers/TimeConverter'
import { PictureAsPdf } from '@mui/icons-material'

import {  join} from '@tauri-apps/api/path';

import { convertFileSrc  } from '@tauri-apps/api/tauri';

export default function StudentCard(student: StudentsInterface) {

   const [openSnack, setOpenSnack] = useContext(SnackBarContext)
   const { borrowSaved, setBorrowSaved } = useContext(BorrowAddContext)

   const { setStudents } = useContext(StudentsContext)

   const { studentPDF, setStudentPDF } = useContext(PDFContext)

   const navigate = useNavigate()

   const currentUser = useMe()


   const [openAbout, setOpenAbout] = useState(false)
   const [openUpdate, setOpenUpdate] = useState(false)

   const [enterprise, setEnterprise] = useState<EnterPriseInterface>({ name: "", subname: "", img: "" })

   const getAll = async () => {
      const all = await enterpriceApi.all()
      setEnterprise({
         name: all.name,
         img: all.img,
         subname: all.subname
      })

   }

   useEffect(() => {
      getAll()
   }, [])

   const [imgSrc, setImgSrc] = useState<string>("")


   useEffect(() => {
      const fetchImg = async () => {

         const filePath = await join('enterprise.jpg')

         setImgSrc(convertFileSrc(filePath))
        

      }

      fetchImg()

    

   }, [])

   const about = async () => {
      setOpenAbout(true)
   }


   const deleteStudent = async () => {
      await studentApi.remove(student.id!)
      setOpenSnack({ ...openSnack, open: true, msg: "item is deleted  " })

      const updatestudents = await studentApi.all()

      setStudents(updatestudents)

      // log new oprations
      logger(`delete student ${student.id!}`, currentUser?.username!)


   }

   const updateStudent = () => {
      setOpenUpdate(true)
   }

   const addStudentBorrow = () => {
      setBorrowSaved({ ...borrowSaved, studentId: student.id!, studentFname: student.fname! })
      setOpenSnack({ ...openSnack, open: true, msg: "item add to borrow  ", severity: "info" })

   }

   const siginDate = new Date(TimeConverter.toRealTime(student.signin_date!).toISOString().slice(0, 10)).getFullYear()



   return (
      <div>
         <Card
            variant='elevation'
            sx={{
               width: 350,
               height: 280,
               position: "relative",
            }}
         >
            <CardContent sx={{ padding: 0 }}>
               <Box sx={{

                  height: "50px",
                  display: "flex",
                  gap: 1
               }} >
                  {imgSrc ? <img src={imgSrc+ `?v=${ Date.now()}`} style={{ width: "50px", height: "50px", marginInline: 10 }} />
                     : <Skeleton variant="rectangular" width={210} height={118} />
                  }

                  <Typography variant='caption' marginTop={1} fontSize={"10px"}>
                     {enterprise.name}
                     <p style={{ fontWeight: "bold" }}>
                        {enterprise.subname}
                     </p>
                  </Typography>
               </Box>
            </CardContent>
            <CardContent sx={{
               display: "flex", flexDirection: "row-reverse"
               , padding: 5, justifyContent: "space-between", gap: 3
            }}  >
               <Box display={"grid"} sx={{ placeItems: "center", transform: "scale(2)" }} border={"1px solid white"} width={50} height={50}>
                  <Avatar sizes='small' ></Avatar>
               </Box>
               <Box >
                  <Tooltip title={student.fname}>
                     <Typography mx={1}
                        textOverflow={'ellipsis'}
                        noWrap
                        width={180}
                     >
                        {t('name')} :
                        <b>{student.fname}</b>
                     </Typography>
                  </Tooltip>
                  <Typography mx={1}>{t("ID")} : <b>{student.id}</b> </Typography>

               </Box>
            </CardContent>
            <center>{`${siginDate}-${siginDate + 1}`}</center>
            <Divider sx={{ marginBlock: ".5em" }} />
            <CardActions sx={{ display: "flex", justifyContent: "space-between",gap:"1px" }}>
               <Button
                  onClick={about}
                  sx={{ flexGrow: 1, fontSize: "clamp(10px,12px,13px)", height: 40 }} size="small" variant='contained' color='primary' >
                  {t("About")}
               </Button>
               <Button
                  onClick={updateStudent}

                  sx={{ flexGrow: 1, fontSize: "clamp(8px,10px,12px)", height: 40 }} size="small" variant='contained' >
                  {t("Update")}
               </Button>
               <Button
                  onClick={deleteStudent}
                  sx={{ flexGrow: 1, fontSize: "clamp(10px,12px,13px)", height: 40 }} size="small" variant='contained' color='error'
               >
                  {t("Delete")}
               </Button>
               <IconButton
                  onClick={() => {
                     setStudentPDF(student)
                     navigate('/pdf')
                  }}
                  

               >
                  <PictureAsPdf color='warning' />
               </IconButton>
               <AddToBorrowButton onClick={addStudentBorrow} isActive={!student.is_banned} />
            </CardActions>

         </Card>

         {openAbout && <AboutStudent  {...{ setOpenAbout, student }} />}
         {openUpdate && <UpdateStudent  {...{ setOpenUpdate, student }} />}

      </div>
   )
}

import { Avatar, Box, Button, Card, CardActions, CardContent, Chip, Divider, Typography } from '@mui/material'

import { BorrowContext } from '../contexts/BorrowContext'
import TimeConverter from '../helpers/TimeConverter'
import { t } from 'i18next'
import { useContext, useEffect, useState } from 'react'
import { bookApi, borrowApi, studentApi } from '../constants/utils'
import { SnackBarContext } from '../contexts/SnackBarContext'
import { AboutBorrow, UpdateBorrow } from './';
import BorrowInterface from '../interfaces/borrow'
import { logger } from '../helpers/Logger'
import useMe from '../hooks/useMe'
import { CalendarToday, Dangerous, GppBad, GppGood, Start, Title, Warning } from '@mui/icons-material'






export default function BorrowCard(borrow: BorrowInterface) {

   const [openSnack, setOpenSnack] = useContext(SnackBarContext)
   const [openAboutBorrow, setOpenAboutBorrow] = useState(false);
   const [openUpdateBorrow, setOpenUpdateBorrow] = useState(false);

   const { setBorrows } = useContext(BorrowContext)

   const [ids, setIds] = useState({
      bookId: "",
      studentId: ""
   })

   const getIds = async () => {
      const bookId = await bookApi.getById(borrow.book_id!)

      const studentId = await studentApi.getById(borrow.student_id!)


      setIds({
         bookId: bookId.title!,
         studentId: studentId.fname!
      })
   }

   const currentUser = useMe()

   const deleteBorrow = async () => {
      await borrowApi.remove(borrow.id!)

      setOpenSnack({ ...openSnack, open: true, msg: "item is deleted  " })

      const updateBorrows = await borrowApi.all()
      setBorrows(updateBorrows)

      await bookApi.update({ is_aviable: true }, borrow.book_id!)

      // log new oprations
      logger(`delete borrow ${borrow.id!}`, currentUser?.username!)

   }

   const about = async () => setOpenAboutBorrow(true)

   let expireDate = TimeConverter
      .daysBetween(new Date().getTime() / 1000, +borrow.end_date!)

   const update = () => setOpenUpdateBorrow(true)

   useEffect(() => {
      getIds()
   }, [])

   return (
      <div>
         <Card
            elevation={6}
            variant='elevation'
            sx={{
               width: 300,
               height: "auto",
               position: "relative",
               direction: "ltr",
            }}
         >
            <CardContent>
               <Typography
                  sx={{
                     border: "1px solid #ffffff33",
                     borderRadius: "5px",
                     padding: 1,
                     fontSize: "12px",
                     fontWeight: "bold",
                     fontStyle: 'oblique',
                     direction: "ltr",


                  }} variant='h5'

               >ID:{borrow.id} </Typography>
               <Typography display={"flex"}
                  noWrap
                  maxWidth={300}
                  textOverflow={"ellipsis"}
                  variant="h5" component="div"
                  my={1}
               >
                  <Avatar sx={{ fontSize: 10, width: 30, height: 30, marginBlock: "3px" }}>
                     <Title />
                  </Avatar>
                  <span style={{ marginInline: 5 }} >
                     {ids.bookId}
                  </span>
               </Typography>
               <Box
                  display={"flex"}
                  justifyContent={"flex-start"}
                  gap={2}
               >

                  <Chip
                     label={TimeConverter.toRealTime(borrow.start_date!).toISOString().slice(0, 10)}
                     icon={<GppGood />}
                     color='primary'
                  />
                  <Chip
                     label={TimeConverter.toRealTime(borrow.end_date!).toISOString().slice(0, 10)}
                     icon={<GppBad />}
                     color='warning'
                  />

               </Box>

               <Box mt={2} gap={1} display={"flex"}>
                  <Chip
                     label={`${TimeConverter.daysBetween(+borrow.start_date!, +borrow.end_date!)}Day`}
                     icon={<CalendarToday />}
                     color='info'
                  />
                  <Chip
                     label={`${expireDate < 0 ? 0 : expireDate} day ${expireDate > 1 ? "s" : ""} Left `}
                     icon={<Warning />}
                     color={expireDate > 1 ? "success" : "error"}
                  />
               </Box>

            </CardContent>



            <Divider sx={{ marginBlock: ".5em" }} />
            <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
               <Button
                  onClick={about}
                  sx={{ flexGrow: 1, fontSize: "clamp(10px,12px,13px)", height: 40 }} size="small" variant='contained' color='primary' >
                  {t("About")}
               </Button>


               <Button

                  onClick={update}
                  sx={{ flexGrow: 1, fontSize: "clamp(8px,10px,12px)", height: 40 }} size="small" variant='contained' >
                  {t("Update")}
               </Button>
               <Button
                  onClick={deleteBorrow}
                  sx={{ flexGrow: 1, fontSize: "clamp(10px,12px,13px)", height: 40 }} size="small" variant='contained' color='error'
               >
                  {t("Delete")}
               </Button>

            </CardActions>
         </Card>
         {openAboutBorrow && <AboutBorrow  {...{ setOpenAboutBorrow, borrow }} />}

         {openUpdateBorrow && <UpdateBorrow  {...{ setOpenUpdateBorrow, borrow }} />}


      </div>
   )
}

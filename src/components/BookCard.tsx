import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, Box, Divider, Paper, Skeleton, Tooltip } from '@mui/material';
import { CalendarMonth, Create, Description, Man, Subtitles } from '@mui/icons-material';
import { useContext, useEffect, useState } from 'react';
import { bookApi, studentApi } from '../constants/utils';

import { AddToBorrowButton, ModelCostume, UpdateBookForm } from '.'
import { BooksContext } from '../contexts/BooksContext';
import { SnackBarContext } from '../contexts/SnackBarContext';
import BookInterface from '../interfaces/book';
import { BorrowAddContext } from '../contexts/BorrowAddContext';
import { t } from 'i18next';
import { logger } from '../helpers/Logger';
import useMe from '../hooks/useMe';



export default function BookCard(bookCard: BookInterface) {

   const { books, setBooks } = useContext(BooksContext)

   const { setBorrowSaved, borrowSaved } = useContext(BorrowAddContext)

   const [openSnack, setOpenSnack] = useContext(SnackBarContext)



   const [openModelBook, setOpenModelBook] = useState(false);
   const [openUpdateBook, setUpdateBook] = useState(false);

   const [lastBorrowed, setLastBrrowed] = useState('')

   const currentUser = useMe()

   const about = async () => {

      await bookApi.getById(bookCard.id!)

      setOpenModelBook(true)


   }



   const deleteBook = async () => {

      await bookApi.remove(bookCard.id!)


      setOpenSnack({ ...openSnack, open: true, msg: "item is deleted  " })
      const updateBooks = await bookApi.all()
      setBooks(updateBooks)

       // log new oprations
       logger(`delete Book ${bookCard.id!} `,currentUser?.username!)



   }


   const updateBook = async () => {
      await bookApi.getById(bookCard.id!)
      setUpdateBook(true)

   }


   const addBookBorrow = () => {
      setBorrowSaved({ ...borrowSaved, bookId: bookCard.id!, bookTitle: bookCard.title! })
      setOpenSnack({ ...openSnack, open: true, msg: "item add to borrow  ", severity: "info" })

   }

   // const changeBorrow = async () => {

   //    // const student = await studentApi.getById(bookCard.last_browed!)
   //    // setLastBrrowed(student.fname!)


   // }
   // useEffect(() => {
   //    changeBorrow()
   // }, [])



   return (
      <Paper elevation={6} sx={{
         borderRadius: "20px",
         width: {
            md: "350px",
            lg: "20%"
         },
         padding: 1,
         direction: "ltr"

      }}>
         <CardContent>
            <Typography sx={{
               border: "1px solid #ffffff33",
               borderRadius: "5px",
               padding: 1,
               fontSize: "12px",
               fontWeight: "bold",
               fontStyle: 'oblique',
               direction: "ltr",


            }} variant='h5' >
               ID :{bookCard.id}
            </Typography>
            <Tooltip  title={bookCard.title} >
               <Typography textOverflow={'ellipsis'} marginTop={1} variant="h5" component="div"
                  maxWidth={"330px"}
                  noWrap
               >
                  <Subtitles sx={{ my: "-4px" }} />  <span style={{
                     padding: 1
                  }}>{bookCard.title}</span>
               </Typography>
            </Tooltip>

            <Box
               display={"flex"}
               alignItems={"center"}
               justifyContent={"space-between"}
               mt={2}
            >

               <Typography sx={{ fontSize: 14, }} color="text.secondary" gutterBottom>
                  <Create />   {bookCard.author}
               </Typography>
               <Typography sx={{}} color="text.secondary">
                  <CalendarMonth /> {bookCard.date_print}
               </Typography>

            </Box>
            {lastBorrowed
               ? <Typography variant="body2">
                 <Man/> {lastBorrowed}
               </Typography>
               : <Box width={"100%"} height={21}></Box>
            }

            {bookCard.decription ?
               <Typography 
               variant="body2" 
              
>
                 <span
                 style={{
                  display:"flex",
                  gap:5,
                  alignItems:"center",
                  paddingTop:4
                 }}
                 ><Description/> {bookCard.decription}</span>
               </Typography>
               : <Box width={"100%"} height={21}></Box>
            }

           



         </CardContent>
         <Divider />
         <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button sx={{ flexGrow: 1, fontSize: "clamp(10px,12px,13px)", height: 40 }} size="small" variant='contained'  onClick={about}>
               {t("About")}
            </Button>
            <Button sx={{ flexGrow: 1, fontSize: "clamp(8px,10px,12px)", height: 40 }} onClick={updateBook} size="small" variant='contained' >

               {t("Update")}
            </Button>
            <Button sx={{ flexGrow: 1, fontSize: "clamp(10px,12px,13px)", height: 40 }} size="small" variant='contained' color='error'
               onClick={deleteBook}>

               {t("Delete")}
            </Button>
            <AddToBorrowButton onClick={addBookBorrow} isActive={bookCard.is_aviable} />
         </CardActions>

         <ModelCostume  {...{ bookCard, openModelBook, setOpenModelBook }} />
         
         <UpdateBookForm {...{ openUpdateBook, setUpdateBook, bookCard }} />

      </Paper>
   );
}
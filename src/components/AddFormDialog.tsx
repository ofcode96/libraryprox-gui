import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { SetStateAction, useContext, useState } from 'react';
import { bookApi } from '../constants/utils';
import { BooksContext } from '../contexts/BooksContext';
import { SnackBarContext } from '../contexts/SnackBarContext';
import { Alert, Box } from '@mui/material';
import { t } from 'i18next';
import { logger } from '../helpers/Logger';
import useMe from '../hooks/useMe';
import { error } from 'console';

interface AddNewBookFormProps {
   openNewBook: boolean
   setNewBook: React.Dispatch<SetStateAction<boolean>>
}

export default function AddBookForm({ openNewBook, setNewBook }: AddNewBookFormProps) {

   const { setBooks } = useContext(BooksContext)

   const [openSnack, setOpenSnack] = useContext(SnackBarContext)


   let id = Math.floor(Date.now() * Math.random() + (Math.random() * 1000))

   const [book, setBook] = useState({
      id: id,
      title: "",
      version: 0,
      part: 0,
      pages: 0,
      date_print: "",
      price: 0,
      copies: 0,
      edition: 0,
      author: "",
      decription: "",
      is_aviable: true,

   })

   const currentUser  = useMe()

   const [error, setError] = useState(false)

   const newBook = async (e: React.FormEvent) => {
      e.preventDefault()
      
      if(
         book.title?.length === 0 || 
         book.date_print?.length === 0||
         book.author?.length === 0          
         ){
         setError(true)
         return
      }

      await bookApi.add(book)

      setBook(
         {
            ...book,
            id: Math.floor(Date.now() * Math.random() + (Math.random() * 1000)
            )
         })


      setNewBook(false);

      setOpenSnack({ ...openSnack, open: true, msg: "add new book" })

      const updatedbooks = await bookApi.all()

      setBooks(updatedbooks)

       // log new oprations
       logger(`Add New Book`,currentUser?.username!)


   }



   return (

      <Dialog

         open={openNewBook} onClose={()=>setNewBook(false)}>
         <DialogTitle>{t("Add New Book")}</DialogTitle>
         <DialogContent>
            <form
               onSubmit={newBook}
               style={{
                  display: "flex",
                  flexDirection: "column"
               }} >

               <TextField
                  required
                  margin="dense"
                  id="name"
                  label={t("title")}
                  type="text"
                  variant="outlined"
                  onChange={(e) => setBook({ ...book, title: e.target.value })}
               />
               <Box display={"flex"} maxWidth={"100%"} gap={1} >
                  <TextField
                     fullWidth
                     sx={{}}
                     margin="dense"
                     id="name"
                     label={t("version")}
                     type="number"
                     variant="outlined"
                     onChange={(e) => setBook({ ...book, version: +e.target.value })}
                  />
                  <TextField
                     fullWidth
                     sx={{}}
                     margin="dense"
                     id="name"
                     label={t("part")}
                     type="number"
                     variant="outlined"
                     onChange={(e) => setBook({ ...book, part: +e.target.value })}
                  />
                  <TextField
                     fullWidth
                     margin="dense"
                     id="name"
                     label={t("pages")}
                     type="number"
                     variant="outlined"
                     onChange={(e) => setBook({ ...book, pages: +e.target.value })}
                  />
               </Box>
               <label>{t("date print")}</label>
               <TextField
required
                  margin="dense"
                  id="name"
                  type="date"
                  variant="outlined"
                  onChange={(e) => setBook({ ...book, date_print: e.target.value })}
               />
               <Box display={"flex"} maxWidth={"100%"} gap={1}>
                  <TextField
                     margin="dense"
                     id="name"
                     label={t("price")}
                     type="number"
                     variant="outlined"
                     inputProps={{
                        step: 0.01
                     }}
                     onChange={(e) => setBook({ ...book, price: +e.target.value })}
                  />
                  <TextField
                     margin="dense"
                     id="name"
                     label={t("copies")}
                     type="number"
                     variant="outlined"
                     onChange={(e) => setBook({ ...book, copies: +e.target.value })}
                  />
                  <TextField
                     margin="dense"
                     id="Edition"
                     label={t("edition")}
                     type="number"
                     variant="outlined"
                     onChange={(e) => setBook({ ...book, edition: +e.target.value })}
                  />
               </Box>
               <TextField

                  margin="dense"
                  id="name"
                  label={t("author")}
                  type="text"
                  variant="outlined"
                  onChange={(e) => setBook({ ...book, author: e.target.value })}
               />
               <TextField

                  margin="dense"
                  id="name"
                  label={t("decription")}
                  type="text"
                  variant="outlined"
                  onChange={(e) => setBook({ ...book, decription: e.target.value })}
               />
               <Button type='submit' sx={{
                  mt: 1
               }} variant='contained'>{t("New Book")}</Button>
            </form>

            {
            error ?  <Box marginTop={1}>
            <Alert severity="error">
               {t('Do not leave cells blank')}</Alert>
         </Box> : <></>
           }
         </DialogContent>

      </Dialog>


   );
}
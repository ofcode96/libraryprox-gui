import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { SetStateAction, useContext, useState } from 'react';
import TimeConverter from '../helpers/TimeConverter';
import { BooksContext } from '../contexts/BooksContext';
import { SnackBarContext } from '../contexts/SnackBarContext';
import BookApi from '../apis/book-apis';
import { FormControl, FormHelperText, Select, SelectChangeEvent, MenuItem, Box } from '@mui/material';
import BookInterface from '../interfaces/book';
import { t } from 'i18next';
import useMe from '../hooks/useMe';
import { logger } from '../helpers/Logger';



interface UpdateNewBookFormProps {
   openUpdateBook: boolean
   setUpdateBook: React.Dispatch<SetStateAction<boolean>>
   bookCard: BookInterface
}

export default function UpdateBookForm({
   openUpdateBook, setUpdateBook, bookCard }: UpdateNewBookFormProps) {

   const { books, setBooks } = useContext(BooksContext)

   const [upBook, setUpBook] = useState<BookInterface>()

   const [aviableSelect, setAviableSelect] = useState(bookCard.is_aviable === true ? "Yes" : "No")



   const [openSnack, setOpenSnack] = useContext(SnackBarContext)

   const bookApi = new BookApi()

   const currentUser = useMe()

   const updateBook = async (e: React.FormEvent) => {
      e.preventDefault()

      await bookApi.update({ ...upBook }, bookCard.id!)

      const updatedbooks = await bookApi.all()

      setBooks(updatedbooks)

      setOpenSnack({ ...openSnack, open: true, msg: "Update Success" })
      setUpdateBook(false);

       // log new oprations
       logger(`Update Book ${bookCard.id!} `,currentUser?.username!)



   }



   return (
      <div>
         <Dialog

            open={openUpdateBook} onClose={() => setUpdateBook(false)}>
            <DialogTitle>{t('Update Book')}</DialogTitle>
            <DialogContent>
               <form
                  onSubmit={updateBook}
                  style={{
                     display: "flex",
                     flexDirection: "column"
                  }} >

                  <TextField

                     margin="dense"
                     id="name"
                     label={t("title")}
                     type="text"
                     variant="outlined"
                     defaultValue={bookCard.title}
                     onChange={(e) => setUpBook({ ...upBook, title: e.target.value })}
                  />
                  <Box display={"flex"} gap={1}>
                     <TextField

                        margin="dense"
                        id="name"
                        label={t("version")}
                        type="number"
                        variant="outlined"
                        defaultValue={bookCard.version}
                        onChange={(e) => setUpBook({ ...upBook, version: +e.target.value })}
                     />
                     <TextField

                        margin="dense"
                        id="name"
                        label={t("part")}
                        type="number"
                        variant="outlined"
                        defaultValue={bookCard.part}
                        onChange={(e) => setUpBook({ ...upBook, part: +e.target.value })}
                     />
                     <TextField
                        fullWidth
                        margin="dense"
                        id="name"
                        label={t("date print")}
                        type="date"
                        variant="outlined"
                        defaultValue=
                        {bookCard.date_print}
                        onChange={(e) => setUpBook({ ...upBook, date_print: + e.target.value })}
                     />
                  </Box>
                  <Box display={"flex"} gap={1} >
                     <TextField
                        
                        margin="dense"
                        id="name"
                        label={t("pages")}
                        type="number"
                        variant="outlined"
                        defaultValue={bookCard.pages}
                        onChange={(e) => setUpBook({ ...upBook, pages: +e.target.value })}
                     />
                     <TextField

                        margin="dense"
                        id="name"
                        label={t("price")}
                        type="number"
                        variant="outlined"
                        defaultValue={bookCard.price}
                        inputProps={{
                           step: 0.01
                        }}
                        onChange={(e) => setUpBook({ ...upBook, price: +e.target.value })}
                     />
                     <TextField

                        margin="dense"
                        id="name"
                        label={t("copies")}
                        type="number"
                        variant="outlined"
                        defaultValue={bookCard.copies}
                        onChange={(e) => setUpBook({ ...upBook, copies: +e.target.value })}
                     />
                     <TextField

                        margin="dense"
                        id="Edition"
                        label={t("edition")}
                        type="number"
                        variant="outlined"
                        defaultValue={bookCard.edition}
                        onChange={(e) => setUpBook({ ...upBook, edition: +e.target.value })}
                     />

                  </Box>

                  <TextField

                     margin="dense"
                     id="name"
                     label={t("author")}
                     type="text"
                     variant="outlined"
                     defaultValue={bookCard.author}
                     onChange={(e) => setUpBook({ ...upBook, author: e.target.value })}
                  />
                  <TextField

                     margin="dense"
                     id="name"
                     label={t("decription")}
                     type="text"
                     variant="outlined"
                     defaultValue={bookCard.decription}
                     onChange={(e) => setUpBook({ ...upBook, decription: e.target.value })}
                  />
                  <FormControl sx={{ my: 1, flex: 1 }}>
                     <FormHelperText> {t("is aviable")} </FormHelperText>
                     <Select
                        sx={{width:100}}
                        defaultValue={aviableSelect}
                        onChange={(e: SelectChangeEvent) => {



                           setAviableSelect(e.target.value)
                           setUpBook({ ...upBook, is_aviable: e.target.value == "Yes" ? true : false })

                        }
                        }

                        inputProps={{ 'aria-label': 'Without label' }}
                     >

                        <MenuItem value={"Yes"}>{t("Yes")}</MenuItem>
                        <MenuItem value={"No"}>{t("No")}</MenuItem>


                     </Select>

                  </FormControl>

                  <Button type='submit' sx={{
                     mt: 1
                  }} variant='contained'>{t("Update Book")}</Button>
               </form>
            </DialogContent>

         </Dialog>
      </div >
   );
}
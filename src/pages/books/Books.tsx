import { Box, CircularProgress, Skeleton } from '@mui/material'
import { CardBook, AddBookForm, SnackBarToast, FloatingActionButton, SearchBar } from '../../components'
import { useContext, useEffect, useState } from 'react'
import TimeConverter from '../../helpers/TimeConverter'
import { BooksContext } from '../../contexts/BooksContext'
import filtredList from '../../helpers/FilteredList'
import { t } from 'i18next'
import { useQuery } from '@tanstack/react-query'
import { bookApi } from '../../constants/utils'
import BookInterface from '../../interfaces/book'


function Books() {


  const [openNewBook, setNewBook] = useState(false)

  const [searchId, setSearchId] = useState(false)
  const [searchQuiry, setSearch] = useState('')

  const { books, } = useContext(BooksContext)

  const {data ,isLoading , isSuccess } = useQuery({
      queryKey:["books",searchQuiry],
      keepPreviousData:true,
      queryFn:async ()=> await bookApi.alltest(searchQuiry)
   })

   console.log(data)


  // filter Books 
  const  filtredListBooks = filtredList(data! , searchId, searchQuiry,"title")

  const renderig = ()=>{
    if(isLoading){
      return <Box sx={{
        height: "100vh",
        display: "grid",
        placeItems: "center",
        
      }}>
        <CircularProgress />
      </Box>
    }else{
      if (data!.length <= 0){
        return <h1>{t("Don't Found This Book")}</h1>
      }

    }

    if(isSuccess){
      return data?.map((book, index) => {


            const formatDate = TimeConverter.toRealTime(book.date_print!).toISOString().slice(0, 10)

          
            return <CardBook key={index} {...{ ...book,
              
              //date_print:formatDate 

            }} />
 


          })
    }
  }



  return (

    <>
      <SearchBar  {...{ setSearch, setSearchId }} />

      <Box

        sx={{
          width: "100%",
          marginTop: 7,
          display: "flex",
          rowGap: "1em",
          columnGap: "10px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}>


       {renderig()}



        <FloatingActionButton onclick={() => setNewBook(true)} />

        <AddBookForm {...{ openNewBook, setNewBook }} />
      </Box>

      <SnackBarToast />


    </>
  )
}

export default Books


import { Man2, OpenInNew, BookTwoTone, CurrencyExchangeSharp } from "@mui/icons-material"
import { Box, Card, Avatar, Skeleton, Typography, IconButton } from "@mui/material"
import { t } from "i18next"
import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { studentApi, bookApi, borrowApi } from "../constants/utils"
import LineChartCard from "./LineChartCard"
import { LanguageContext } from "../contexts/LanguageContext"
import { useQuery } from "@tanstack/react-query"



export const CardsWithChart = () => {
  const [dashboard, setDashboardInfo] = useState<{
    students: number,
    books: number,
    borrows: number,
  }>({
    students: 0,
    books: 0,
    borrows: 0,
  })

  const [dir] = useContext(LanguageContext)


  const getsDataFromApi = async () => {
    const studentslength: number = (await studentApi.all()).length
    const bookslength: number = (await bookApi.all()).length
    const borrowslength: number = (await borrowApi.all()).length

    setDashboardInfo({
      students: studentslength,
      books: bookslength,
      borrows: borrowslength
    })

    return dashboard
  }




  const {data,status,isLoading } = useQuery({
    queryKey:['counters'],
    queryFn:getsDataFromApi
  })




  const navigate = useNavigate()

  return <Box width={{
    sm:"78%",
    lg:"82.5%",
    md:"76%",
  }} >
    <Box

      overflow={"hidden"}
      width={"98%"}
      mt={4} display={"flex"} gap={2.5} flexWrap={"wrap"}>

      <Card variant='elevation' elevation={12} sx={{
        flex: "1",
        display: "flex",
        padding: "1em",
        borderRadius: "10px",
        borderBottom: "8px solid var(--main)",

        justifyContent: "flex-start",
        alignItems: "center",
        gap: "2.25em"
      }} >
        <Avatar sx={{
          scale: "1.5", 
          mx: 1,
          backgroundColor: 'var(--main)',
          color: "white"
        }}>
          <Man2 fontSize='large' />
        </Avatar>
        <Box display={"flex"} flexDirection={"column"} position={"relative"}>
          {
            isLoading  ?
              <Skeleton variant='text' width={30} height={50} sx={{ fontSize: '1.5rem' }}  /> :
              <Typography variant='h3' marginBottom={0}>
                {dashboard.students}
              </Typography> 
          }

          <Typography variant='subtitle1' marginTop={1 / 4} >

            {t('Total Students')}

          </Typography>
          <IconButton
            onClick={() => navigate('/dashboard/student')}
            sx={{
              position: "absolute",
             
              left: {
                sm:dir === "rtl" ? "-4em" : "4em",
                lg:dir === "rtl" ? "-11.5em":"13em",
                
              },
              top: 20

            }}
          >
            <OpenInNew color='primary' />
          </IconButton>
        </Box>
      </Card>
      <Card variant='elevation' elevation={12} sx={{
        flex: "1",
        display: "flex",
        padding: "1em",
        borderRadius: "10px",
        borderBottom: "8px solid var(--main)",

        justifyContent: "flex-start",
        alignItems: "center",
        gap: "2.25em"
      }} >
        <Avatar sx={{
          scale: "1.5", mx: 1,
          backgroundColor: 'var(--main)',
          color: "white"
        }}>
          <BookTwoTone fontSize='large' />
        </Avatar>
        <Box display={"flex"} flexDirection={"column"} position={"relative"}>
          {
            isLoading ?
              <Skeleton variant='text' width={30} height={50} sx={{ fontSize: '1.5rem' }} /> :
              <Typography variant='h3' marginBottom={0}>
                {dashboard.books}
              </Typography>
          }

          <Typography variant='subtitle1' marginTop={1 / 4} >

            {t('Total Books')}

          </Typography>
          <IconButton
            onClick={() => navigate('/dashboard/book')}
            sx={{
              position: "absolute",
              left: {
                sm:dir === "rtl" ? "-4em" : "4em",
                lg:dir === "rtl" ? "-11.5em":"13em",
                
              },
              top: 20

            }}
          >
            <OpenInNew color='primary' />
          </IconButton>
        </Box>
      </Card>
      <Card variant='elevation' elevation={12} sx={{
        flex: "1",
        display: "flex",
        padding: "1em",
        borderRadius: "10px",
        borderBottom: "8px solid var(--main)",

        justifyContent: "flex-start",
        alignItems: "center",
        gap: "2.25em"
      }} >
        <Avatar sx={{
          scale: "1.5", mx: 1,
          backgroundColor: 'var(--main)',
          color: "white"
        }}>
          <CurrencyExchangeSharp fontSize='large' />
        </Avatar>
        <Box display={"flex"} flexDirection={"column"} position={"relative"}>
          {
           isLoading ?
              <Skeleton variant='text' width={30} height={50} sx={{ fontSize: '1.5rem' }} /> :
              <Typography variant='h3' marginBottom={0}>
                {dashboard.borrows}
              </Typography>
          }

          <Typography variant='subtitle1' marginTop={1 / 4} >

            {t('Total Borrows')}

          </Typography>
          <IconButton
            onClick={() => navigate('/dashboard/borrow')}
            sx={{
              position: "absolute",
              left: {
                sm:dir === "rtl" ? "-4em" : "4em",
                lg:dir === "rtl" ? "-10em":"13em",
                
              },
              top: 20

            }}
          >
            <OpenInNew color='primary' />
          </IconButton>
        </Box>
      </Card>

    </Box>

    <LineChartCard />
  </Box>
}

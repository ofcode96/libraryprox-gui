import { Box, Card, CardContent, Typography, List, ListItem, Avatar, ListItemText } from "@mui/material";
import { cyan } from "@mui/material/colors";
import { t } from "i18next";
import { useState, useEffect } from "react";
import { borrowApi, bookApi, studentApi } from "../constants/utils";
import ProgressAvaibleCard from "./ProgressAvaibleCard";





export default function LastBrrowed() {

  interface CardData {
    book: string | undefined;
    student: string | undefined;
  }

  const [borrows, setBorrows] = useState<CardData[]>([])

  useEffect(() => {
    const getBorrows = async () => {
      const borrows = (await borrowApi.all()).sort()
      const lastElements = borrows.slice(-3)
      const listLastElement = await Promise.all(lastElements?.map(async (e) => {
        const book = (await bookApi.getById(e.book_id!)).title
        const student = (await studentApi.getById(e.student_id!)).fname
        return {
          book,
          student
        }
      }))

      setBorrows(listLastElement)

    }

    getBorrows()

  }, [])



  return (
    <Box
      width={{
        xs: "10%",
        sm: "25%",
        md: "300px"
      }}
      mt={4}
       height={{
        sm: "20em",
        lg: "24em"
      }}  >

      <ProgressAvaibleCard />

      <Card elevation={12} sx={{ marginTop: 2 }}>
        <CardContent>
          <Typography variant='h5' fontWeight={600}>
            {t('Last Borrows')}
          </Typography>
          <List sx={{
            marginBlock: {
              sm: "10px",
              lg: "20px"
            }, width: '100%', maxWidth: {
              sm: 250,
              lg: 360
            }, display: "grid",
             gap: {
              sm: 1,
              lg: 3
            },
            scale:.6
          }}>

            {
              borrows.map(borrow => {
                return <ListItem

                  sx={{
                    bgcolor: "primary",
                    border: "1px solid cyan",
                    borderRadius: 5,

                  }} >
                  {/* <Avatar sx={{ mx: 1, bgcolor: cyan[800], color: "white" }} title={borrow.book} children={
                    `${borrow?.book?.split(' ')[0][0]}${borrow?.book?.split(' ')[1][0]}`
                  } /> */}
                  <ListItemText
                    primary={borrow.book}
                    secondary={borrow.student} />
                </ListItem>
              })
            }






          </List>
        </CardContent>
      </Card>
    </Box>
  )
}

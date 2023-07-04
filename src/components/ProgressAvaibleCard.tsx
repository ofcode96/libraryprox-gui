import { Card, CardContent, Typography, Box, CircularProgress } from "@mui/material"
import { t } from "i18next"
import { useState, useEffect } from "react"
import { bookApi } from "../constants/utils"


export default function ProgressAvaibleCard() {

  interface BookData {
    length: number
    avaible: number
  }

  const [booksAvaiable, setBooksAvaible] = useState<BookData>({
    length: 0,
    avaible: 0
  })

  useEffect(() => {
    const getBooks = async () => {
      const books = await bookApi.all()
      const length = books.length
      const avaible = books.filter(book => book.is_aviable).length

      setBooksAvaible({
        length,
        avaible
      })
    }

    getBooks()
  }, [])

  const avaible = (booksAvaiable.length - booksAvaiable.avaible) * (100 / booksAvaiable.length)





  return (
    <Card elevation={12} sx={{ height: "100%", width: "100%" }}>
      <CardContent>

        <Typography variant='h5' fontWeight={600}>
          {t("Books Misseds")}
        </Typography>

        <Box
          sx={{
            display: "grid",
            placeItems: "center"


          }}
        >
          <CircularProgress
            sx={{
              marginBlock: {
                sm:"10%",
                lg:"20%"
              },
              zIndex: 2,
              
            }}
            variant="determinate"
            value={avaible}
            size={"14em"}

          />
          <CircularProgress
            sx={{
              marginBlock: "20%",
              position: "absolute",
              zIndex: 1
            }}
            variant="determinate"
            color='inherit'


            value={100}
            size={"14em"}

          />
          <Typography
            position={"absolute"}
            fontSize={"50px"}
            textAlign={"center"}
            marginBottom={3}
          >
            {booksAvaiable.length - booksAvaiable.avaible}<br />
            <p style={{ fontSize: "15px",
              maxWidth:150
          }}>{t("Book is not Avaiable")}</p>

          </Typography>
        </Box>



      </CardContent>
    </Card>
  )
}


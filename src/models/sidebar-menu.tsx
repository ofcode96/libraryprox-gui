import { HomeMaxOutlined, Man, CurrencyExchange, MenuBook } from "@mui/icons-material"
import { BooksProvider } from "../contexts/BooksContext"
import Books from "../pages/books/Books"
import Borrow from "../pages/borrow/Borrow"
import HomePage from "../pages/homePage/HomePage"
import Students from "../pages/students/Students"

import { t } from "i18next"
import { StudentsProvider } from "../contexts/StudentsContext"
import { BorrowProvider } from "../contexts/BorrowContext"




export const sideListMenu = [


  {
    name: t("Home"),
    Icon: <HomeMaxOutlined />,
    nav: "/",
    page: <HomePage />
  },
  {
    name: t("Books"),
    Icon: <MenuBook />,
    nav: "/book",
    page: <BooksProvider>
      <Books />
    </BooksProvider>
  },
  {
    name: t("Students"),
    Icon: <Man />,
    nav: "/student",
    page: <StudentsProvider>
      <Students />
    </StudentsProvider>
  },
  {
    name: t("Borrow"),
    Icon: <CurrencyExchange />,
    nav: "/borrow",
    page: <BorrowProvider>
      <Borrow />
    </BorrowProvider>
  }
]
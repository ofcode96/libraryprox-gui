import { AccountBalance, ChevronLeft, CurrencyExchange, History, HomeMaxOutlined, Info, Man, MenuBook } from '@mui/icons-material';


import { IconButton, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box } from '@mui/material'
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';

import { OpenSideBar } from '../../interfaces/openSideBar';

import { NavLink, Route, Routes } from 'react-router-dom';
import { useContext, useState } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { SnackBarProvider } from '../../contexts/SnackBarContext';
import PDFViewer from '../PdfViewer/PDFViewer';
import UsersPanal from '../users/UsersPanal';
import { UsersManagmentProvider } from '../../contexts/UsersManagmentContext';
import { t } from 'i18next';
import useMe from '../../hooks/useMe';
import { BooksProvider } from '../../contexts/BooksContext';
import { BorrowProvider } from '../../contexts/BorrowContext';
import { StudentsProvider } from '../../contexts/StudentsContext';
import Books from '../books/Books';
import Borrow from '../borrow/Borrow';
import HomePage from '../homePage/HomePage';
import Students from '../students/Students';
import Logs from '../logs/Logs';
import { RequireAuth } from 'react-auth-kit';
import About from '../about/About';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

interface RootProps {
  direction?: string | null
}

const DrawerHeader = styled('div', {
  shouldForwardProp: (prop) => prop !== "direction",
  slot: 'Root',
  name: "Direction"
})<RootProps>(({ theme, direction }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: direction === "rtl" ? 'flex-start' : "flex-end",
  padding: theme.spacing(0, 2),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 1,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',

    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),

    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);



function SideList({ open, setOpen, children }: OpenSideBar) {

  const [isDisabled, setIsDisabled] = useState(false);

  const currentUser = useMe()



  const [dir,] = useContext(LanguageContext)

  const sideListMenu = [


    {
      name: t("Home"),
      Icon: <HomeMaxOutlined />,
      nav: "/dashboard/home",
      page: <HomePage />

    },
    {
      name: t("Books"),
      Icon: <MenuBook />,
      nav: "/dashboard/book",
      page: <BooksProvider>
        <Books />
      </BooksProvider>
    },
    {
      name: t("Students"),
      Icon: <Man />,
      nav: "/dashboard/student",
      page: <StudentsProvider>
        <Students />
      </StudentsProvider>
    },

    {
      name: t("Borrow"),
      Icon: <CurrencyExchange />,
      nav: "/dashboard/borrow",
      page: <BorrowProvider>
        <Borrow />
      </BorrowProvider>
    }, {
      name: t("Logs"),
      Icon: <History />,
      nav: "/dashboard/logs",
      page:
        <Logs />

    },
     {
      name: t("About"),
      Icon: <Info />,
      nav: "/dashboard/about",
      page:
        <About />

    },
  ]





  return (
    <>
      <Drawer
        anchor={dir === 'rtl' ? "right" : "left"}
        variant="permanent" open={open}>
        <DrawerHeader

          {...{ direction: dir }}
        >
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeft />
          </IconButton>
        </DrawerHeader>
        <Divider />


        <ListLinks />


        {currentUser?.is_admin && <NavLink

          rel='canonical'
          to={'/users'}
          role='button'
          is='button'
          style={{
            textAnchor: "unset",
            textDecorationLine: "none",
            color: "inherit",
            cursor: "pointer",
            pointerEvents: isDisabled ? 'none' : 'auto',

          }}
          onClick={(event) => {
            if (isDisabled) {
              event.preventDefault();
            }
          }}
        >
          <ListItem
            key={t("Users")} disablePadding sx={{
              display: 'block',
              "& :hover": {
                background: "#ffffff00"
              }
            }}
          >
            <ListItemButton
              id={`btn-users`}

              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,

              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  ml: dir === "rtl" && open ? 3 : "auto"
                }}
              >
                <AccountBalance />
              </ListItemIcon>
              <ListItemText
                primary={t("Users")}
                sx={{
                  opacity: open ? 1 : 0,
                  textAlign: dir === "rtl" ? "right" : "left"
                }} />
            </ListItemButton>
          </ListItem>
        </NavLink>
        }
      </Drawer>
      <Box
        component="main"

        sx={{
          flexGrow: 1,
          minHeight: "calc(100vh - 10px)",
          overflow: "hidden",
          py: 2,
          mt: 7,
          backgroundColor: localStorage.getItem('darkMode') == 'true' ? "light" : "#9ff2f632"

        }}>
        <DrawerHeader />

        <SnackBarProvider>
          <Box
            width={"100%"}
            mx={2}

          >

            <Routes>
              {sideListMenu.map((item, index) => <Route key={index} path={item.nav} element={item.page} />)}

              <Route path='/pdf' element={<PDFViewer />} />
              <Route path='/users' element={<UsersManagmentProvider>

                <UsersPanal />

              </UsersManagmentProvider>}

              />

            </Routes>
          </Box>
        </SnackBarProvider>

      </Box>


    </>
  )





  function ListLinks() {


    return <List sx={{ mt: 2 }}>
      <ListItem sx={{
        paddingBlock: "1em"
      }} />
      {sideListMenu
        .map((item, index) => {


          return <NavLink

            rel='canonical'
            key={index} to={item.nav}
            role='button'
            is='button'
            style={{
              textAnchor: "unset",
              textDecorationLine: "none",
              color: "inherit",
              cursor: "pointer",
              pointerEvents: isDisabled ? 'none' : 'auto',

            }}
            onClick={(event) => {
              if (isDisabled) {
                event.preventDefault();
              }
            }}
          >
            <ListItem
              key={item.name} disablePadding sx={{
                display: 'block',
                "& :hover": {
                  background: "#ffffff00"
                }
              }}
            >
              <ListItemButton
                id={`btn-${index}`}
                key={index}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,

                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    ml: dir === "rtl" && open ? 3 : "auto"
                  }}
                >
                  {item.Icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{
                    opacity: open ? 1 : 0,
                    textAlign: dir === "rtl" ? "right" : "left"
                  }} />
              </ListItemButton>
            </ListItem>
          </NavLink>;
        })}
    </List>;
  }
}

export default SideList
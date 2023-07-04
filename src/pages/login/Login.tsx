import { Box, Typography, Button, FormControl, Alert, AlertTitle, Paper } from "@mui/material";
import loginPic from "../../assets/imgs/login.svg"
import AccountCircle from '@mui/icons-material/AccountCircle';
import { RoundedInput, TopBar } from "../../components";
import LockIcon from '@mui/icons-material/Lock';
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { API_URL_BASE, getIp, initAdmin, loginApi, processApi, usersManegerApi } from "../../constants/utils";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import { useSignIn } from "react-auth-kit";
import { Radio } from "react-loader-spinner";
import { fetch } from "@tauri-apps/api/http";
import { LanguageContext } from "../../contexts/LanguageContext";




export default function Login() {

   const [username, setUserName] = useState("")
   const [password, setPassword] = useState("")
   const [error, setError] = useState(false)

   const [, setToken] = useContext(UserContext)
   const [dir] = useContext(LanguageContext)

   const navigate = useNavigate()

   const signIn = useSignIn()




   const login = async (e: React.FormEvent) => {
      e.preventDefault()

      const { error, data } = await loginApi.login(username, password)



      if (error) {
         setError(true)
         setTimeout(() => {
            setError(false)
         }, 2500);
      }
      else {
         signIn({
            token: data.access_token,
            expiresIn: 7200,
            tokenType: "Bearer"

         })
         setToken(data.access_token)
         navigate('/dashboard/home', { replace: true })
         // navigate(0)
      }

      const admin = await usersManegerApi.getById(1)
      if (!admin) {
         await usersManegerApi.getById(1)
      }



   }




   const MAX_RETRIES = 3;
   const RETRY_DELAY = 3000;

   const [loading, setLoading] = useState(true);
   const [retryCount, setRetryCount] = useState(0);
   const [run, setServerRuning] = useState(false);


   const connectToAPI = () => {
      // Make the API request here
      // Replace this with your actual API endpoint
      fetch(API_URL_BASE + '/api', { method: "GET" })
         .then((response) => {
            if (response.ok) {
               console.log('API connection success');

               setLoading(false);
            } else {
               // Retry if the response is not successful
               console.log('API connection Retry ');

               retryConnection();
            }
         })
         .catch(() => {
            // Retry if there's an error
            retryConnection();
            console.log('API connection Error');
            setServerRuning(true)

         });
   };

   const retryConnection = () => {
      if (retryCount < MAX_RETRIES) {
         // Increase the retry count
         setRetryCount((prevRetryCount) => prevRetryCount + 1);

         // Retry after a delay
         setTimeout(() => {
            connectToAPI();
         }, RETRY_DELAY);
      } else {
         // Max retries reached, handle error or display appropriate message
         setLoading(false);
         console.log('API connection failed after multiple attempts');

      }
   };

   const loginLayout = () => {
      if (document.documentElement.lang == "en" || document.documentElement.lang == "fr") {
         if (localStorage.getItem("i18nextLng") != "ar") document.dir = "ltr"
      } else {
         document.dir = "rtl"
      }
   }


   useEffect(() => {
      //iniailize Ip 
      getIp()

      connectToAPI();

      loginLayout()

   }, [])






   return (<>

      <Box

         display={"flex"} justifyContent={"space-between"}>

         <Box

            borderRight={"10px solid rgba(14, 131, 136,.25)"}
            width={"70%"} display={"grid"} justifyContent={"cnter"} alignContent={"center"} padding={"5em"}>
            <img className="roll-in-blurred-left" style={{ marginBlock: "5%" }} src={loginPic} alt="" />
         </Box>
         <Paper
         className={  dir == "ltr" ?"slide-in-left" : "slide-in-right"}
            sx={{
               minWidth: "50%",
               height: "100vh",
               maxWidth: "400px",

            }}
            elevation={24}


         >

            <Box
               height={"100vh"}
               display="flex"
               flexDirection="column"
               alignItems="center"
               gap={2}
               bgcolor={"#0E8388"}
            >
               <TopBar color="white" />
               <form onSubmit={login}>
                  <Box mx={1}>
                     <Typography 
                     className="puff-in-center"
                     color={"white"}
                        variant="h1"
                        fontSize={"calc(16px + 4.4vw)"}
                        fontWeight={"700"}
                        paddingY={1 / 3}
                        marginTop={"10%"}
                        marginX={".75em"}
                     >
                        {t("Welcome To !")}
                     </Typography>
                     <Typography
                     className="puff-in-center"
                        color={"white"}
                        fontSize={"calc(16px + 3vw)"}
                        variant="h2"
                        marginX={"1.25em"}
                        fontFamily={"serif"}
                        fontWeight={"500"}
                     >
                        {document.title}
                     </Typography>
                  </Box>
                  <Box
                     marginTop={"2%"}
                     marginX={"5em"}
                     display={"flex"}
                     flexDirection={"column"}
                     gap={3}
                     minWidth={"50%"}
                     maxWidth={"70%"}
                  >
                     {loading ?
                        <Box
                           display={"flex"}
                           justifyContent={"space-between"}
                           width={"100%"}
                        >
                           <Box>
                              <Radio
                                 visible={true}
                                 height="250"
                                 width="350"
                                 ariaLabel="radio-loading"
                                 wrapperStyle={{}}
                                 wrapperClass="radio-wrapper"
                                 colors={["white", "white", "white"]}
                              />
                              <Typography
                                 variant="h6"
                                 color={"white"}
                                 fontFamily={"serif"}
                                 textAlign={"center"}
                              >{t("waiting the server ...")}</Typography>
                           </Box>
                        </Box> :
                        <>
                           <FormControl>
                              <Box display={"flex"} justifyContent={"center"} width={"100%"} >
                                 <AccountCircle sx={{ fontSize: "12rem", color: "white", textAlign: "center", }} />
                              </Box>
                              <RoundedInput
                                 startIcon={<AccountCircle />}
                                 placeHolder={t("User Name")!}
                                 type="text"
                                 value={username}
                                 onChange={(e) => setUserName(e.target.value)}
                                 onFocus={() => initAdmin()}
                              />
                           </FormControl>
                           <RoundedInput
                              startIcon={<LockIcon />}
                              placeHolder={t("Password")!}
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)} />
                           <Button
                              sx={{
                                 color: "white",
                                 border: "5px solid white",
                                 paddingBlock: ".75em",
                                 borderRadius: "25px",
                                 "&:hover": {
                                    border: "5px solid white",
                                 }
                              }}
                              variant="outlined"
                              type="submit"
                           ><Typography> {t("Login")}</Typography>
                           </Button>
                        </>
                     }
                     {error &&
                        <Alert
                           variant="filled"
                           severity="error"
                           sx={{
                              borderRadius: "20px",
                              fontSize: "calc(7px + .25vw)"
                           }}
                        >
                           <AlertTitle>{t('Error')}</AlertTitle>
                           {t('You Username or Password is incorrect try again')} <strong>{t('Or Contact Your Admin!')}</strong>
                        </Alert>}
                  </Box>
               </form>
            </Box>
         </Paper>
      </Box>
   </>)
}

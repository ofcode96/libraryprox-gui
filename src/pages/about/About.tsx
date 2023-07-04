import { Facebook, GitHub, YouTube, YoutubeSearchedFor } from '@mui/icons-material'
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material'
import { t } from 'i18next'
import { open } from '@tauri-apps/api/shell';


export default function About() {
   return (
      <Box display={"flex"} flexDirection={"column"}>
         <Box marginTop={4} marginX={2}>
            <Card sx={{ maxWidth: "98.5%" }}>
               <CardContent>
                  <Typography
                     color={"text.primary"}
                     variant='h4'
                  > {t("About")} <span style={{
                     color: "var(--main)",
                     fontWeight: "bold"
                  }} >{document.title}</span> 💖</Typography>
                  <br />
                  <Typography
                     width={"60%"}
                     variant='h6' >
                     {t('intro about')}
                  </Typography>
                  <br />
                  <Typography variant='body1'>
                     ✅ {t('1th about')}
                  </Typography>
                  <br />
                  <Typography variant='body1'>
                     ✅ {t('2th about')}
                  </Typography>
                  <br />
                  <Typography variant='body1'>
                     ✅ {t('3th about')}
                  </Typography>
                  <br />
                  <Typography variant='body1'>
                     ✅ {t('4th about')}
                  </Typography>
                  <br />
                  <Typography variant='body1'>
                     ✅ {t('5th about')}
                  </Typography>
                  <br />
                  <Typography variant='h6'>
                     {t("summary about")}
                  </Typography>
               </CardContent>
            </Card>
         </Box>

         <Box
            marginTop={"4%"}
            alignSelf={"center"}
            display={"inline-block"}>
            <Card
               elevation={4}
               sx={{
                  padding: "10px",
                  width: "100%", height: "150px",
                  textAlign:"center"
                  
               }}>

               <Typography
                  variant='button'
                  textAlign={"center"}>
                 📞  {t("contact us")}✨ 
                  <br />
                  <span style={{
                     fontSize:"1rem",
                      color: "var(--main)"
                       }} >@ofCode</span>
               </Typography>

               <CardContent sx={{marginBlock:"-5px"}}>
                  <IconButton
                     onClick={
                        async () => await open('https://www.facbook.com/ofcode23')
                     }>
                     <Facebook />
                  </IconButton>
                  <IconButton
                     onClick={
                        async () => await open('https://www.youtube.com/ofcode23')
                     }>
                     <YouTube />
                  </IconButton>
                  <IconButton
                     onClick={
                        async () => await open('https://www.github.com/ofcode23')
                     }>
                     <GitHub />
                  </IconButton>
               </CardContent>
            </Card>
         </Box>
      </Box>
   )
}

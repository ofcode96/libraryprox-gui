import { ListItem, Card, CardContent, Typography, Divider, TextField, Input, Button } from '@mui/material'
import { t } from 'i18next'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { API_URL_BASE, enterpriceApi } from '../constants/utils'
import EnterPriseInterface from '../interfaces/enterprise'
import EnterPriseView from './EnterPriseView'
import { open } from '@tauri-apps/api/dialog';
import { readBinaryFile } from '@tauri-apps/api/fs';
import { Body } from '@tauri-apps/api/http'
import { desktopDir, resolve } from '@tauri-apps/api/path'
import path from 'path-browserify';

function EnterPrise() {

   const [enterprise, setEnterprise] = useState<EnterPriseInterface>({ name: "", subname: "", img: "" })

   const [enterpriseUp, setEnterpriseUP] = useState<{ name?: string, subname?: string, img?: any }>({})

   const [edit, setEdit] = useState(false)



   const [selectedImage, setSelectedImage] = useState<File | null>(null);
   const [imgPath, setImgPath] = useState("")


   const getAll = async () => {
      const all = await enterpriceApi.all()
      setEnterprise({
         name: all.name,
         img: all.img,
         subname: all.subname
      })

   }


   const openImage = async () => {
      const selected = await open({
         title: "Select Image",
         multiple: false,
         filters: [{
            name: "",
            extensions: ['png', 'jpg', 'svg']
         }],
         defaultPath: await desktopDir()

      })

      setImgPath(selected as string)

   }



   const update = async (e: React.FormEvent) => {
      e.preventDefault()

    


      await enterpriceApi.newAdd(
         enterpriseUp.name!,
         enterpriseUp.subname!,
         imgPath
      )

      const all = await enterpriceApi.all()
      setEnterprise({
         name: all.name,
         img: all.img,
         subname: all.subname
      })




      setEdit(false)

   }


   useEffect(() => {
      getAll()
   }, [])


   let img = new URL(API_URL_BASE + '/' + enterprise.img,
      import.meta.url
   ).href


   useEffect(() => {
      img = new URL(API_URL_BASE + '/' + enterprise.img,
         import.meta.url
      ).href + `?v=${new Date().getTime()}`
      return () => {
         img && URL.revokeObjectURL(img)
      }
   }, [edit, setEdit])


   return (
      <ListItem>
         <Card sx={{ padding: 1 }}>
            <CardContent>
               <Typography variant='h6' >
                  {t("Enterprise")}
               </Typography>
               <Divider sx={{ borderBottom: 1 / 2, paddingBlock: 1 / 2 }} />

               {!edit
                  ? <EnterPriseView {...{ enterprise, setEnterprise, edit, setEdit, img }} />


                  : <form style={{ marginTop: 2, width: "150px" }}
                     onSubmit={update} >

                     <TextField
                        fullWidth
                        label={t("name")}
                        variant="outlined"
                        onChange={e => setEnterpriseUP({
                           ...enterpriseUp,
                           name: e.target.value
                        })}
                        placeholder={enterprise.name}
                        type='text'
                        size='small'
                        sx={{ minHeight: "20px", marginBlock: 2 }}
                     />
                     <TextField
                        fullWidth
                        label={t("subname")}
                        variant="outlined"
                        onChange={e => setEnterpriseUP({
                           ...enterpriseUp,
                           subname: e.target.value
                        })}
                        placeholder={enterprise.subname}
                        type='text'
                        size='small'
                        sx={{ minHeight: "20px", marginBlock: 2 }}
                        required
                     />
                     <Button 
                     sx={{
                        marginBlock:"5px",
                        width: "100%"
                     }}
                     variant='contained' onClick={openImage}>{t("Image")}</Button>

                     <Button sx={{ width: "100%",marginTop:"1em" }} type='submit' variant='contained'>{t("Update")}</Button>

                     <Button
                        onClick={() => setEdit(false)}
                        sx={{ width: "100%", my: 1 }} variant='outlined' color='info'>
                        {t("Return")}
                     </Button>
                  </form>
               }



            </CardContent>

         </Card>
      </ListItem>
   )
}

export default EnterPrise
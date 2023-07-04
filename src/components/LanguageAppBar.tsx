
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useContext, useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import { LanguageContext } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { relaunch } from '@tauri-apps/api/process';

export default function LanguageAppBar() {
   const [language, setLag] = useState(localStorage.getItem('i18nextLng')?.toUpperCase());
   const [dir, setDir] = useContext(LanguageContext)

   const [, i18n] = useTranslation()

   const handleChange = async (e: SelectChangeEvent<string>) => {
      setLag(e.target.value);
      // await relaunch()
   };



   useEffect(() => {
      switch (language) {
         case "AR":
            setDir("rtl")
            i18n.changeLanguage(language.toLowerCase())
            break;

         case "FR":
            setDir("ltr")
            i18n.changeLanguage(language.toLowerCase())
            break;

         case "EN":
            setDir("ltr")
            i18n.changeLanguage(language.toLowerCase())
            break;

         default:
            setDir("ltr")
            break;
      }
   }, [language])

   return (


      <FormControl sx={{ m: dir === "rtl" ? -2 : 1, mr: dir === "rtl" ? 1 : -2 }} variant="outlined">
         <Avatar>
            <Select
               labelId="demo-simple-select-label"
               id="demo-simple-select"
               value={language}
               label={language}
               sx={{
                  border: "none",
                  textAlign: "center",
                  color:"white",

                  "& .MuiSvgIcon-root": {
                     display: "none",
                     visibility: "hidden"
                  },

               }}
               onChange={handleChange}
               className='language-input'
            >
               <MenuItem value={"FR"}>FR</MenuItem>
               <MenuItem value={"AR"}>AR</MenuItem>
               <MenuItem value={"EN"}>EN</MenuItem>
            </Select>
         </Avatar>
      </FormControl>

   );
}
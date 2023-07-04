import { Box, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material'
import { SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'


interface SearchBarProps {
  setSearch: (value: SetStateAction<string>) => void
  setSearchId: (value: SetStateAction<boolean>) => void
  isId?: boolean
}

export default function SearchBar({ setSearch, setSearchId, isId }: SearchBarProps) {
  const [t,] = useTranslation()

  return (
    <Box>
      <form
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          gap: "1em",
          marginTop: 3,
         
        }} >
        <TextField
          variant="outlined"
          placeholder={`${t("Search")}...`}
          size="small"
          onChange={e => setSearch(e.target.value)}
          sx={{
            width: "25em",
            border:"2px solid var(--main)"
          }}
        />

        <FormGroup sx={{
          display: "flex",
          alignItems: "center"
        }}>
          <FormControlLabel
            sx={{
              height: 1
            }}
           control={!isId ? <Checkbox

              onChange={e => {
                if (!isId){
                  setSearchId(e.target.checked) 
                } 
                
              }} />:<></>}
            label={!isId && `${t("By Id")}`}
          />

        </FormGroup>
      </form>
    </Box>
  )
}

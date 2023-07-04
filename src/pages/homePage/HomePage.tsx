import { Stack } from '@mui/material'
import LastBrrowed from '../../components/LastBrrowed';
import { CardsWithChart } from '../../components/CardsWithChart';


function HomePage() {


  return (
    <Stack direction={{
      xs:"column",
      md:"row",
      lg:"row",
    }}  
    justifyContent={{
      xs:"space-evenly",
      md:"space-between",
      lg:"space-between",
    }}
    marginX={{
      sm:3.5,
      lg:4
    }}
    
    
    >

      <CardsWithChart />

      <LastBrrowed />

    </Stack>
  )
}

export default HomePage








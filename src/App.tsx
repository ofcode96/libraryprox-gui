import Login from "./pages/login/Login"
import "./App.css"
import { useEffect, useState } from "react"
import Dashboarad from "./pages/dashboard/Dashboard"
import { ThemeChangerProvider } from "./contexts/ThemeContext"
import { Box } from "@mui/material"
import { CirclesWithBar } from "react-loader-spinner"
import { SoundProvider } from "./contexts/Soundeffect"
import { useIsAuthenticated } from 'react-auth-kit';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const quiryClient = new QueryClient()


export default function App(): JSX.Element {


  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = useIsAuthenticated()
 
  useEffect(() => {
    // simulate loading data
    let load = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(load)
  }, []);



  



  const AppLoad = () => {
    if (isLoading) {
      return <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBlock: "25%"

        }}
      >
        <CirclesWithBar
          height="100"
          color="#0E8388"
          width="300"
          visible={true}

        />
      </Box>

    }



    return !isAuthenticated() ? <Login /> : <ThemeChangerProvider>
      <SoundProvider>
        <QueryClientProvider   client={quiryClient}>
          <Dashboarad />
        </QueryClientProvider>
      </SoundProvider>

    </ThemeChangerProvider>


  }


  return (
    <div>
      {
        <AppLoad />
      }
      
    </div>
  )
}

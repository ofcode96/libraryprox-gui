import React from 'react'
import ReactDOM from 'react-dom/client'
import './i18n'
import App from './App'
import './index.css'
import { UserProvider } from './contexts/UserContext'
import { BrowserRouter } from 'react-router-dom'
import { LaguageProvider } from './contexts/LanguageContext'
import { getIp } from './constants/utils'
import { LogsProvider } from './contexts/LogContext'
import { AuthProvider } from 'react-auth-kit'
import { invoke } from '@tauri-apps/api'
import { appWindow } from "@tauri-apps/api/window"
import { exit } from '@tauri-apps/api/process';
import { Command } from '@tauri-apps/api/shell'

//iniailize Ip 
getIp()




//splashscreen window 
document.addEventListener('DOMContentLoaded', () => {
  // This will wait for the window to load, but you could
  // run this function on whatever trigger you want

  setTimeout(() => {
    invoke('close_splashscreen')
  }, 30000);


})



// appWindow.onCloseRequested(async e => {
 
//   (await Command.sidecar('./backend/server/main').spawn()).kill()
  

// })



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <LogsProvider>
          <LaguageProvider>

            <AuthProvider
              authType='cookie'
              authName='_auth'
              cookieDomain={window.location.hostname}
              cookieSecure={false}

            >
              <App />
            </AuthProvider>

          </LaguageProvider>
        </LogsProvider>
      </BrowserRouter>

    </UserProvider>
  </React.StrictMode>,
)

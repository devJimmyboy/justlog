import React from 'react'
import { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from 'react-query'
import { Page } from './components/Page'
import { StateProvider, store } from './store'
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
// import axios, { AxiosInstance } from 'axios'
import { ClientCredentialsAuthProvider } from '@twurple/auth'
import { ApiClient, HelixChatBadgeSet } from '@twurple/api'

globalThis.twitchAuth = new ClientCredentialsAuthProvider(import.meta.env.VITE_CLIENT_ID, import.meta.env.VITE_CLIENT_SECRET)

globalThis.twitchApi = new ApiClient({
  authProvider: twitchAuth,
})
twitchApi.chat.getGlobalBadges().then((badges) => {
  globalThis.badges = badges
})

declare global {
  var twitchApi: ApiClient
  var twitchAuth: ClientCredentialsAuthProvider
  var badges: HelixChatBadgeSet[]
}

const pageTheme = createMuiTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  const { state } = useContext(store)

  return (
    <QueryClientProvider client={state.queryClient}>
      <Page />
    </QueryClientProvider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <StateProvider>
      <ThemeProvider theme={pageTheme}>
        <App />
      </ThemeProvider>
    </StateProvider>
  </React.StrictMode>
)

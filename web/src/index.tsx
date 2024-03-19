import { ClientCredentialsAuthProvider } from '@twurple/auth'
import { ApiClient, HelixChatBadgeSet } from '@twurple/api'
import 'react-link-previewer/src/style.css'

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
import { StrictMode } from 'react'
import { useContext } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from 'react-query'
import { Page } from './components/Page'
import { StateProvider, store } from './store'
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'

const pageTheme = createTheme({
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

const container = document.getElementById('root') as Element
const root = createRoot(container)

root.render(
  <StrictMode>
    <StateProvider>
      <ThemeProvider theme={pageTheme}>
        <App />
      </ThemeProvider>
    </StateProvider>
  </StrictMode>
)

import React from 'react'
import { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from 'react-query'
import { Page } from './components/Page'
import { StateProvider, store } from './store'
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { Buffer } from 'buffer'
window.Buffer = Buffer

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

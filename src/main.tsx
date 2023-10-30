import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux"
import { store } from "./store/store"
import App from './App.tsx'

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './theme.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
)

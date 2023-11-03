import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux"
import { store } from "./store/store"
import App from './App.tsx'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'

import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  polygonMumbai,
  baseGoerli,
  goerli,
  arbitrumGoerli

} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';


const { chains, publicClient } = configureChains(
  [arbitrumGoerli, polygonMumbai, baseGoerli, goerli],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider showRecentTransactions={true} chains={chains} theme={darkTheme({
        accentColor: '#5ee192',
        accentColorForeground: 'black',
        fontStack: 'system',
        overlayBlur: 'small',
      })}>
        <Provider store={store}>
          <ChakraProvider>
            <ColorModeScript />
            <App />
          </ChakraProvider>
        </Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)

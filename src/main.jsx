import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import WagmiWrapper from './WagmiWrapper'
import { ChakraProvider, extendTheme } from '@chakra-ui/react';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiWrapper >
      <App />
    </WagmiWrapper>
  </React.StrictMode>,
)

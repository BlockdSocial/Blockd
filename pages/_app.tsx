import React from 'react';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { store } from '../stores/rootStore';
import { Provider } from 'react-redux';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';

function getLibrary(provider: any) {
  return new Web3(provider)
}

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <ThemeProvider enableSystem={true} attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </Web3ReactProvider>
  )
}

export default MyApp

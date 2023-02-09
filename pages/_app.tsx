import React, { useEffect } from 'react';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { store } from '../stores/rootStore';
import { Provider } from 'react-redux';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';
import { useChannel, configureAbly } from '@ably-labs/react-hooks';
import Ably from 'ably/promises';

function getLibrary(provider: any) {
  return new Web3(provider)
}

function MyApp({ Component, pageProps }: AppProps) {
  configureAbly({ key: 'SGspkA.hkA1-w:xQcIQuax6oUPd6kvaYaipwsIvhjS_dL58l4zkoJwFBg' });
  const rest = new Ably.Rest('SGspkA.hkA1-w:xQcIQuax6oUPd6kvaYaipwsIvhjS_dL58l4zkoJwFBg');

  const [channel, ably] = useChannel('notifications', (message) => {
    console.log(message);
    checkUserNotification(message.data);
  });

  const checkUserNotification = async (data: object) => {
    console.log('data: ', data);
  }

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

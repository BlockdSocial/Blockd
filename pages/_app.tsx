import React, { useEffect } from 'react';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { store } from '../stores/rootStore';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    const authToken = localStorage.getItem('token');
    console.log('authToken: ', authToken);
  }, []);


  return (
    <Provider store={store}>
      <ThemeProvider enableSystem={true} attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp

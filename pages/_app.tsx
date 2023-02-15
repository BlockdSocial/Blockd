import React, { useState } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { store } from "../stores/rootStore";
import { Provider } from "react-redux";
import useIsMounted from "../hooks/useIsMounted"

/******** Rainbow Kit  **********/

import {
  RainbowKitProvider,
  connectorsForWallets,
  lightTheme
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import {
  injectedWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

/********* Wagmi ************/

import { WagmiConfig, configureChains, createClient } from "wagmi";
import { polygon } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const { chains, provider } = configureChains([polygon], [publicProvider()]);
const connectors = connectorsForWallets([
  {
    groupName: "Popular",
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ chains }),
      rainbowWallet({ chains }),
      walletConnectWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  const mounted= useIsMounted();

  console.log(mounted);

  const [queryClient] = React.useState(() => new QueryClient());
  if( !mounted) {
    return null;
  }
  return (
    
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          theme={lightTheme({
            accentColor: '#FD7F20',
            accentColorForeground: 'white',
            borderRadius: 'small',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
          
          chains={[polygon]}
          initialChain={polygon}
          modalSize="compact"
          id="rainbow"
        >
          <Provider store={store}>
            <ThemeProvider enableSystem={true} attribute="class">
              <Component {...pageProps} />
            </ThemeProvider>
          </Provider>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
   
  );
}

export default MyApp;

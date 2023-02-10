import React, { useState } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { store } from "../stores/rootStore";
import { Provider } from "react-redux";
import { useChannel, configureAbly } from "@ably-labs/react-hooks";
import Ably from "ably/promises";

/******** Rainbow Kit  **********/

import {
  RainbowKitProvider,
  connectorsForWallets,
  darkTheme,
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
  configureAbly({
    key: "SGspkA.hkA1-w:xQcIQuax6oUPd6kvaYaipwsIvhjS_dL58l4zkoJwFBg",
  });
  const rest = new Ably.Rest(
    "SGspkA.hkA1-w:xQcIQuax6oUPd6kvaYaipwsIvhjS_dL58l4zkoJwFBg"
  );

  const [channel, ably] = useChannel("notifications", (message) => {
    console.log(message);
    checkUserNotification(message.data);
  });

  const checkUserNotification = async (data: object) => {
    console.log("data: ", data);
  };

  const [queryClient] = React.useState(() => new QueryClient());

  return (
    // <Web3ReactProvider getLibrary={getLibrary}>
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          theme={darkTheme({
            fontStack: "system",
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
    // </Web3ReactProvider>
  );
}

export default MyApp;

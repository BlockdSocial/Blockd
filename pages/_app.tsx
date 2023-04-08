import React, { useState } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { store } from "../stores/rootStore";
import { Provider } from "react-redux";
import useIsMounted from "../hooks/useIsMounted";
import Script from "next/script";
import { GID } from "../constants";
import { useRouter } from "next/router";

/******** Rainbow Kit  **********/

import {
  RainbowKitProvider,
  connectorsForWallets,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import {
  injectedWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
  coinbaseWallet,
  argentWallet,
  ledgerWallet,
  braveWallet,
} from "@rainbow-me/rainbowkit/wallets";

/********* Wagmi ************/

import { WagmiConfig, configureChains, createClient } from "wagmi";
import { polygon } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "../components/Layout";
import Head from "next/head";

const { chains, provider } = configureChains([polygon], [publicProvider()]);
const connectors = connectorsForWallets([
  {
    groupName: "Popular",
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ chains }),
      walletConnectWallet({ chains }),
      coinbaseWallet({ chains, appName: "Block'd" }),
      rainbowWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const mounted = useIsMounted();
  if (process.env.NODE_ENV === "production") console.log = function () {};

  const [queryClient] = React.useState(() => new QueryClient());
  if (!mounted) {
    console.log(GID);
    return null;
  }
  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon.ico"
        ></link>
      </Head>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-QW4Q5G8G4K"
      />
      <Script>
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-QW4Q5G8G4K');
        `}
      </Script>

      <QueryClientProvider client={queryClient}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            theme={lightTheme({
              accentColor: "#FD7F20",
              accentColorForeground: "white",
              borderRadius: "small",
              fontStack: "system",
              overlayBlur: "small",
            })}
            chains={[polygon]}
            initialChain={polygon}
            modalSize="compact"
            id="rainbow"
          >
            <Provider store={store}>
              <ThemeProvider enableSystem={true} attribute="class">
                {router.pathname === "/auth/signin" ||
                router.pathname === "/auth/signup" ||
                router.pathname === "/auth/infographic" ||
                router.pathname === "/dashboard/myChatrooms" ||
                router.pathname === "/dashboard/myChatrooms2" ? (
                  <Component {...pageProps} />
                ) : (
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                )}
              </ThemeProvider>
            </Provider>
          </RainbowKitProvider>
        </WagmiConfig>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;

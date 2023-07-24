import {
  ArrowDownRightIcon,
  ArrowTrendingUpIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/outline";
import { getPairInformationByChain } from "dexscreener-api";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function LiveChart() {
  let [BTCPrice, setBTCPrice] = useState<any>();
  let [BTCUrl, setBTCUrl] = useState<any>();
  let [BTCPriceChange, setBTCPriceChange] = useState<any>();
  let [ETHPrice, setETHPrice] = useState<any>();
  let [ETHUrl, setETHUrl] = useState<any>();
  let [ETHPriceChange, setETHPriceChange] = useState<any>();
  let [MATICPrice, setMATICPrice] = useState<any>();
  let [MATICUrl, setMATICUrl] = useState<any>();
  let [MATICPriceChange, setMATICPriceChange] = useState<any>();
  let [BNBPrice, setBNBPrice] = useState<any>();
  let [BNBUrl, setBNBUrl] = useState<any>("");
  let [BNBPriceChange, setBNBPriceChange] = useState<any>();
  let [SOLPrice, setSOLPrice] = useState<any>();
  let [SOLUrl, setSOLUrl] = useState<any>("");
  let [SOLPriceChange, setSOLPriceChange] = useState<any>();
  let [AVAXPrice, setAVAXPrice] = useState<any>();
  let [AVAXUrl, setAVAXUrl] = useState<any>("");
  let [AVAXPriceChange, setAVAXPriceChange] = useState<any>();

  const MINUTE_MS = 100000;

  //Get the Token Price
  useEffect(() => {
    //dispatch(fetchUser())
  });
  const fetchData = async () => {
    //Get pair information by chain
    const BTCResponse = await getPairInformationByChain(
      "bsc",
      "0x46cf1cf8c69595804ba91dfdd8d6b960c9b0a7c4"
    );

    const ETHResponse = await getPairInformationByChain(
      "ethereum",
      "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640"
    );

    const MATICResponse = await getPairInformationByChain(
      "polygon",
      "0x9B08288C3Be4F62bbf8d1C20Ac9C5e6f9467d8B7"
    );

    const BNBResponse = await getPairInformationByChain(
      "bsc",
      "0x16b9a82891338f9ba80e2d6970fdda79d1eb0dae"
    );

    const SOLResponse = await getPairInformationByChain(
      "solana",
      "83v8ipyzihdejddy8rdzddyznyutxngz69lgo9kt5d6d"
    );

    const AVAXResponse = await getPairInformationByChain(
      "avalanche",
      "0xfae3f424a0a47706811521e3ee268f00cfb5c45e"
    );

    //Get pairs matching base token address
    //const tokensResponse = await getPairsMatchingBaseTokenAddress("0x1DF2C6DF4d4E7F3188487F4515587c5E8b75dbfa");

    BTCPrice = await BTCResponse.pair.priceUsd;
    BTCUrl = await BTCResponse.pair.url;
    BTCPriceChange = await BTCResponse.pair.priceChange.h1;
    ETHUrl = await ETHResponse.pair.url;
    ETHPrice = await ETHResponse.pair.priceUsd;
    ETHPriceChange = await ETHResponse.pair.priceChange.h1;
    MATICUrl = await MATICResponse.pair.url;
    MATICPrice = await MATICResponse.pair.priceUsd;
    MATICPriceChange = await MATICResponse.pair.priceChange.h1;
    MATICPriceChange = await MATICResponse.pair.priceChange.h1;
    BNBUrl = await BNBResponse.pair.url;
    BNBPrice = await BNBResponse.pair.priceUsd;
    BNBPriceChange = await BNBResponse.pair.priceChange.h1;
    SOLUrl = await SOLResponse.pair.url;
    SOLPrice = await SOLResponse.pair.priceUsd;
    SOLPriceChange = await SOLResponse.pair.priceChange.h1;
    AVAXUrl = await AVAXResponse.pair.url;
    AVAXPrice = await AVAXResponse.pair.priceUsd;
    AVAXPriceChange = await AVAXResponse.pair.priceChange.h1;

    // priceChange = pairsResponse.pairs[0].priceChange.h24;

    return {
      BTCPrice,
      ETHPrice,
      MATICPrice,
      BNBPrice,
      SOLPrice,
      AVAXPrice,
      BTCPriceChange,
      ETHPriceChange,
      MATICPriceChange,
      BNBPriceChange,
      SOLPriceChange,
      AVAXPriceChange,
      BTCUrl,
      ETHUrl,
      MATICUrl,
      BNBUrl,
      SOLUrl,
      AVAXUrl,
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData().then(() => {
        const BTC = BTCPrice;
        setBTCPrice(BTC);
        const BTCChange = BTCPriceChange;
        setBTCPriceChange(BTCChange);
        const BtcUrl = BTCUrl;
        setBTCUrl(BtcUrl);
        const ETH = ETHPrice;
        setETHPrice(ETH);
        const ETHChange = ETHPriceChange;
        setETHPriceChange(ETHChange);
        const EthUrl = ETHUrl;
        setETHUrl(EthUrl);
        const MATIC = MATICPrice;
        setMATICPrice(MATIC);
        const MATICChange = MATICPriceChange;
        setMATICPriceChange(MATICChange);
        const MaticUrl = MATICUrl;
        setMATICUrl(MaticUrl);
        const BNB = BNBPrice;
        setBNBPrice(BNB);
        const BNBChange = BNBPriceChange;
        setBNBPriceChange(BNBChange);
        const BnbUrl = BNBUrl;
        setBNBUrl(BnbUrl);
        const SOL = SOLPrice;
        setSOLPrice(SOL);
        const SOLChange = SOLPriceChange;
        setSOLPriceChange(SOLChange);
        const SolUrl = SOLUrl;
        setSOLUrl(SolUrl);
        const AVAX = AVAXPrice;
        setAVAXPrice(AVAX);
        const AVAXChange = AVAXPriceChange;
        setAVAXPriceChange(AVAXChange);
        const AvaxUrl = AVAXUrl;
        setAVAXUrl(AvaxUrl);
      });
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchData().then(() => {
      const BTC = BTCPrice;
      setBTCPrice(BTC);
      const BTCChange = BTCPriceChange;
      setBTCPriceChange(BTCChange);
      const BtcUrl = BTCUrl;
      setBTCUrl(BtcUrl);
      const ETH = ETHPrice;
      setETHPrice(ETH);
      const ETHChange = ETHPriceChange;
      setETHPriceChange(ETHChange);
      const EthUrl = ETHUrl;
      setETHUrl(EthUrl);
      const MATIC = MATICPrice;
      setMATICPrice(MATIC);
      const MATICChange = MATICPriceChange;
      setMATICPriceChange(MATICChange);
      const MaticUrl = MATICUrl;
      setMATICUrl(MaticUrl);
      const BNB = BNBPrice;
      setBNBPrice(BNB);
      const BNBChange = BNBPriceChange;
      setBNBPriceChange(BNBChange);
      const BnbUrl = BNBUrl;
      setBNBUrl(BnbUrl);
      const SOL = SOLPrice;
      setSOLPrice(SOL);
      const SOLChange = SOLPriceChange;
      setSOLPriceChange(SOLChange);
      const SolUrl = SOLUrl;
      setSOLUrl(SolUrl);
      const AVAX = AVAXPrice;
      setAVAXPrice(AVAX);
      const AVAXChange = AVAXPriceChange;
      setAVAXPriceChange(AVAXChange);
      const AvaxUrl = AVAXUrl;
      setAVAXUrl(AvaxUrl);
    });
  }, []);

  return (
    <div className="flex flex-col space-y-2 mt-8 bg-gray-100 dark:bg-lightgray m-2 rounded-md">
      <div className="p-2 flex items-center justify-start space-x-2 w-full">
        <ArrowTrendingUpIcon className="w-5 h-5" />
        <p>Live Chart</p>
      </div>
      {BTCPrice && (
        <Link
          href={BTCUrl}
          target="_blank"
          className="flex items-center justify-between space-x-2 w-full p-2 hover:bg-gray-200 hover:dark:bg-[#1F2022]"
        >
          <img src="/images/logo/btc-logo.png" className="w-7 h-7" />
          <p
            className={`${
              BTCPriceChange > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {BTCPrice}
          </p>
          {BTCPriceChange > 0 ? (
            <ArrowUpRightIcon className="w-4 h-4 stroke-[3px] text-green-600" />
          ) : (
            <ArrowDownRightIcon className="w-4 h-4 stroke-[3px] text-red-600" />
          )}
        </Link>
      )}
      {ETHPrice && (
        <Link
          href={ETHUrl}
          target="_blank"
          className="flex items-center justify-between space-x-2 w-full p-2 hover:bg-gray-200 hover:dark:bg-[#1F2022]"
        >
          <img src="/images/logo/eth-logo-2.png" className="w-7 h-7" />
          <p
            className={`${
              ETHPriceChange > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {ETHPrice}
          </p>
          {ETHPriceChange > 0 ? (
            <ArrowUpRightIcon className="w-4 h-4 stroke-[3px] text-green-600" />
          ) : (
            <ArrowDownRightIcon className="w-4 h-4 stroke-[3px] text-red-600" />
          )}
        </Link>
      )}
      {BNBPrice && (
        <Link
          href={BNBUrl}
          target="_blank"
          className="flex items-center justify-between space-x-2 w-full p-2 hover:bg-gray-200 hover:dark:bg-[#1F2022]"
        >
          <img src="/images/logo/bnb-logo.png" className="w-7 h-7" />
          <p
            className={`${
              BNBPriceChange > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {BNBPrice}
          </p>
          {BNBPriceChange > 0 ? (
            <ArrowUpRightIcon className="w-4 h-4 stroke-[3px] text-green-600" />
          ) : (
            <ArrowDownRightIcon className="w-4 h-4 stroke-[3px] text-red-600" />
          )}
        </Link>
      )}
      {MATICPrice && (
        <Link
          href={MATICUrl}
          target="_blank"
          className="flex items-center justify-between space-x-2 w-full p-2 hover:bg-gray-200 hover:dark:bg-[#1F2022]"
        >
          <img src="/images/logo/matic-logo.png" className="w-7 h-7" />
          <p
            className={`${
              MATICPriceChange > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {MATICPrice}
          </p>
          {MATICPriceChange > 0 ? (
            <ArrowUpRightIcon className="w-4 h-4 stroke-[3px] text-green-600" />
          ) : (
            <ArrowDownRightIcon className="w-4 h-4 stroke-[3px] text-red-600" />
          )}
        </Link>
      )}
      {SOLPrice && (
        <Link
          href={SOLUrl}
          target="_blank"
          className="flex items-center justify-between space-x-2 w-full p-2 hover:bg-gray-200 hover:dark:bg-[#1F2022]"
        >
          <img src="/images/logo/solana-logo.png" className="w-7 h-7" />
          <p
            className={`${
              SOLPriceChange > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {SOLPrice}
          </p>
          {SOLPriceChange > 0 ? (
            <ArrowUpRightIcon className="w-4 h-4 stroke-[3px] text-green-600" />
          ) : (
            <ArrowDownRightIcon className="w-4 h-4 stroke-[3px] text-red-600" />
          )}
        </Link>
      )}
      {AVAXPrice && (
        <Link
          href={AVAXUrl}
          target="_blank"
          className="flex items-center justify-between space-x-2 w-full p-2 hover:bg-gray-200 hover:dark:bg-[#1F2022]"
        >
          <img src="/images/logo/avax-logo.png" className="w-7 h-7" />
          <p
            className={`${
              AVAXPriceChange > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {AVAXPrice}
          </p>
          {AVAXPriceChange > 0 ? (
            <ArrowUpRightIcon className="w-4 h-4 stroke-[3px] text-green-600" />
          ) : (
            <ArrowDownRightIcon className="w-4 h-4 stroke-[3px] text-red-600" />
          )}
        </Link>
      )}
    </div>
  );
}

export default LiveChart;

import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/outline";
import { getPairInformationByChain } from "dexscreener-api";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"]; // Replace with your actual items

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [items.length]);

  let [BTCPrice, setBTCPrice] = useState<any>();
  let [BTCUrl, setBTCUrl] = useState<any>("");
  let [BTCPriceChange, setBTCPriceChange] = useState<any>();
  let [ETHPrice, setETHPrice] = useState<any>();
  let [ETHUrl, setETHUrl] = useState<any>("");
  let [ETHPriceChange, setETHPriceChange] = useState<any>();
  let [MATICPrice, setMATICPrice] = useState<any>();
  let [MATICUrl, setMATICUrl] = useState<any>("");
  let [MATICPriceChange, setMATICPriceChange] = useState<any>();
  let [BNBPrice, setBNBPrice] = useState<any>();
  let [BNBUrl, setBNBUrl] = useState<any>("");
  let [BNBPriceChange, setBNBPriceChange] = useState<any>();

  const MINUTE_MS = 100000;

  //Get the Token Price

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
    BNBUrl = await BNBResponse.pair.url;
    BNBPrice = await BNBResponse.pair.priceUsd;
    BNBPriceChange = await BNBResponse.pair.priceChange.h1;

    // priceChange = pairsResponse.pairs[0].priceChange.h24;

    return {
      BTCPrice,
      ETHPrice,
      MATICPrice,
      BNBPrice,
      BTCPriceChange,
      ETHPriceChange,
      MATICPriceChange,
      BNBPriceChange,
      BTCUrl,
      ETHUrl,
      MATICUrl,
      BNBUrl
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
    });
  }, []);

  return (
    <div className="flex w-[100vw] md:hidden slider r_to_l h-14 bg-gradient-to-r from-orange-300 via-orange-400 to-blockd">
      <div className="slider_inner min-w-[100vw] flex">
        <Link
          href={BTCUrl}
          target="_blank"
          className="flex items-center justify-center space-x-2 w-[50%] p-2"
        >
          <div className="p-1 bg-white dark:bg-lightgray w-fit rounded-full">
            <img src="/images/logo/btc-logo.png" className="w-7 h-7" />
          </div>
          <div className="flex items-center justify-center p-1 px-3 bg-white rounded-md dark:bg-lightgray space-x-2">
            <p
              className={`${
                BTCPriceChange > 0 ? "text-green-600 " : "text-red-600"
              }`}
            >
              {BTCPrice}
            </p>
            {BTCPriceChange > 0 ? (
              <ArrowUpRightIcon className="w-4 h-4 stroke-[3px] text-green-600" />
            ) : (
              <ArrowDownRightIcon className="w-4 h-4 stroke-[3px] text-red-600" />
            )}
          </div>
        </Link>
        <Link
          href={ETHUrl}
          target="_blank"
          className="flex items-center justify-center space-x-2 w-[50%] p-2"
        >
          <div className="p-1 bg-white dark:bg-lightgray w-fit rounded-full">
            <img src="/images/logo/eth-logo-2.png" className="w-7 h-7" />
          </div>
          <div className="flex items-center justify-center p-1 px-3 bg-white rounded-md dark:bg-lightgray space-x-2">
            <p
              className={`${
                ETHPriceChange > 0 ? "text-green-600 " : "text-red-600"
              }`}
            >
              {ETHPrice}
            </p>
            {ETHPriceChange > 0 ? (
              <ArrowUpRightIcon className="w-4 h-4 stroke-[3px] text-green-600" />
            ) : (
              <ArrowDownRightIcon className="w-4 h-4 stroke-[3px] text-red-600" />
            )}
          </div>
        </Link>
      </div>
      <div className="slider_inner min-w-[100vw] flex">
        <Link
          href={BNBUrl}
          target="_blank"
          className="flex items-center justify-center space-x-2 w-[50%] p-2"
        >
          <div className="p-1 bg-white dark:bg-lightgray w-fit rounded-full">
            <img src="/images/logo/bnb-logo.png" className="w-7 h-7" />
          </div>
          <div className="flex items-center justify-center p-1 px-3 bg-white rounded-md dark:bg-lightgray space-x-2">
            <p
              className={`${
                BNBPriceChange > 0 ? "text-green-600 " : "text-red-600"
              }`}
            >
              {BNBPrice}
            </p>
            {BNBPriceChange > 0 ? (
              <ArrowUpRightIcon className="w-4 h-4 stroke-[3px] text-green-600" />
            ) : (
              <ArrowDownRightIcon className="w-4 h-4 stroke-[3px] text-red-600" />
            )}
          </div>
        </Link>
        <Link
          href={MATICUrl}
          target="_blank"
          className="flex items-center justify-center space-x-2 w-[50%] p-2"
        >
          <div className="p-1 bg-white dark:bg-lightgray w-fit rounded-full">
            <img src="/images/logo/matic-logo.png" className="w-7 h-7" />
          </div>
          <div className="flex items-center justify-center p-1 px-3 bg-white rounded-md dark:bg-lightgray space-x-2">
            <p
              className={`${
                MATICPriceChange > 0 ? "text-green-600 " : "text-red-600"
              }`}
            >
              {MATICPrice}
            </p>
            {MATICPriceChange > 0 ? (
              <ArrowUpRightIcon className="w-4 h-4 stroke-[3px] text-green-600" />
            ) : (
              <ArrowDownRightIcon className="w-4 h-4 stroke-[3px] text-red-600" />
            )}
          </div>
        </Link>
      </div>
    </div>
    // <div
    //   className={`flex md:hidden items-center justify-center h-10 bg-gradient-to-r ${bg[currentIndex]} py-6`}
    // >
    //   <button
    //     className="mr-2 hidden bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    //     onClick={goToPreviousSlide}
    //   >
    //     Previous
    //   </button>
    //   <Link
    //     href={url[currentIndex]}
    //     target="_blank"
    //     className="flex items-center justify-evenly space-x-4 w-full p-2"
    //   >
    //     <div className="p-1 bg-white dark:bg-lightgray rounded-full">
    //       <img src={images[currentIndex]} className="w-7 h-7" />
    //     </div>
    //     <p
    //       className={`p-1 px-1 bg-white rounded-md dark:bg-lightgray ${
    //         priceChange[currentIndex] > 0 ? "text-green-600 " : "text-red-600"
    //       }`}
    //     >
    //       {price[currentIndex]}
    //     </p>
    //     <div className="p-2 bg-white dark:bg-lightgray rounded-full">
    //       {priceChange[currentIndex] > 0 ? (
    //         <ArrowUpRightIcon className="w-4 h-4 stroke-[3px] text-green-600" />
    //       ) : (
    //         <ArrowDownRightIcon className="w-4 h-4 stroke-[3px] text-red-600" />
    //       )}
    //     </div>
    //   </Link>
    //   {/* <h1 className="text-4xl">{slides[currentIndex]}</h1> */}
    //   <button
    //     className="ml-2 hidden bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    //     onClick={goToNextSlide}
    //   >
    //     Next
    //   </button>
    // </div>
  );
}

export default Slider;

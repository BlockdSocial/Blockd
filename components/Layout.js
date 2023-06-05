import Head from "next/head";
import React, { ReactElement } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import UnAuthSidebar from "./Sidebar/UnAuthSidebar";
import Widgets from "./Widgets/Widgets";
import { useAppSelector } from "../stores/hooks";
import { isEmpty } from "lodash";

// @ts-ignore
export default function Layout({ children }) {
  const { authUser } = useAppSelector((state) => state.authUserReducer);
  return (
    <div className="bg-white dark:bg-darkgray flex flex-col items-start justify-start mx-auto h-screen overflow-hidden">
      <Head>
        <title>Blockd</title>
      </Head>
      <Toaster />
      <Navbar />
      <div className="bg-white dark:bg-darkgray grid grid-cols-9 mx-auto xl:max-w-[80%] overflow-hidden w-full flex-1">
        {!isEmpty(authUser) ? <Sidebar /> : <UnAuthSidebar />}
        {children}
        <Widgets />
      </div>
    </div>
  );
}

import Head from "next/head";
import React from "react";
import { Toaster } from "react-hot-toast";
import MessagesPage from "../../components/Messages/MessagesPage";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Widgets from "../../components/Widgets/Widgets";

function messages() {
  return <MessagesPage />;
}

export default messages;

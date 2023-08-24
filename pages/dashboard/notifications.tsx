import Head from "next/head";
import React from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "../../components/Navbar/Navbar";
import NotificationsPage from "../../components/Notifications/NotificationsPage";
import Sidebar from "../../components/Sidebar/Sidebar";
import Widgets from "../../components/Widgets/Widgets";

function notifications() {
  return <NotificationsPage />;
}

export default notifications;

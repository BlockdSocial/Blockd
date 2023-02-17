import Head from "next/head";
import React from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Widgets from "../../../components/Widgets/Widgets";
import Navbar from "../../../components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import CommentPage from "../../../components/Post/CommentPage";

function comment() {
  return <CommentPage />;
}

export default comment;

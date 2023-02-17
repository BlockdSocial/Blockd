import Head from "next/head";
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import PeoplePage from "../components/Search/PeoplePage";
import Sidebar from "../components/Sidebar/Sidebar";
import Widgets from "../components/Widgets/Widgets";

function people() {
  return <PeoplePage />;
}

export default people;

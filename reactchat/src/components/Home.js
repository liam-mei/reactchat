import React from "react";
import { Link } from "react-router-dom";

import Login from "./Login";
import HomeNav from "./HomeNav";

export default function Home() {
  return (
    <>
      <HomeNav />
      <Login />
    </>
  );
}

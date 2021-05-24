import './App.css';

import React from "react"
import { HydraAdmin } from "@api-platform/admin";
import Home from "./pages/Home";
import {AppLayout} from "./Layout";

import '@fontsource/roboto'

function App() {
  if(typeof window !== "undefined")
  {
      return <HydraAdmin layout={AppLayout} entrypoint={window.origin} dashboard={Home}/>;
  }

  return <></>;
}

export default App;

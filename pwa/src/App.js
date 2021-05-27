import './App.css';

import React from "react";

import AdminPage from "./pages/Admin";

import "@fontsource/roboto"

function App() {
  if(typeof window !== "undefined")
  {
      return <AdminPage />;
  }

  return <></>;
}

export default App;

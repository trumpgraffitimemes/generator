import React, { useState, useContext } from "react";
import Header from "./components/header/Header";
import QuickNav from "./components/quicknav/QuickNav";
import Canvas from "./components/canvas/Canvas";
import Form from "./components/form/Form";
import ToolBar from "./components/toolbar/Toolbar";
import { StateContext } from "./components/statecontext/stateContext";

import "./App.css";

function App() {
  const { theme } = useContext(StateContext);

  

  return (
    <div id="main" className={`App ${theme}`}>
      <Header />
      <QuickNav />
      <Form  />
      <Canvas  />
      <ToolBar />
    </div>
  );
}

export default App;

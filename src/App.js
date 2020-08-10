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

  const [toptexte, setToptexte] = useState("");
  const [bottomtexte, setBottomtexte] = useState("");

  function toptextf(e) {
    setToptexte(e);
  }

  function bottomtextf(e) {
    setBottomtexte(e);
  }

  return (
    <div id="main" className={`App ${theme}`}>
      <Header />
      <QuickNav />
      <Form toptext={toptextf} bottomtext={bottomtextf} />
      <Canvas toptext={toptexte} bottomtext={bottomtexte} />
      <ToolBar />
    </div>
  );
}

export default App;

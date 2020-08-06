import React, { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import QuickNav from "./components/quicknav/QuickNav";
import TopImages from "./components/topimages/TopImages";
import Form from "./components/form/Form";
import Canvas from "./components/canvas/Canvas";

function App() {
  const [toptexte, setToptexte] = useState();
  const [bottomtexte, setBottomtexte] = useState();

  const [picID, setPicID] = useState(0);

  function toptextf(e) {
    setToptexte(e);
  }

  function bottomtextf(e) {
    setBottomtexte(e);
  }

  function picidf(e) {
    setPicID(e);
  }

  return (
    <div id="main">
      <Header />
      <QuickNav picid={picidf} />
      <TopImages />
      <Canvas toptext={toptexte} bottomtext={bottomtexte} picid={picID} />
      <Form toptext={toptextf} bottomtext={bottomtextf} />
      {/* <Downloader /> */}
    </div>
  );
}

export default App;

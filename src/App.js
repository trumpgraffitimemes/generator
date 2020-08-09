import React, { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import QuickNav from "./components/quicknav/QuickNav";
// import TopImages from "./components/topimages/TopImages";
import Canvas from "./components/canvas/Canvas";
import Form from "./components/form/Form";

function App() {
  const [toptexte, setToptexte] = useState("");
  const [bottomtexte, setBottomtexte] = useState("");

  function toptextf(e) {
    setToptexte(e);
  }

  function bottomtextf(e) {
    setBottomtexte(e);
  }

  return (
    <div id="main">
      <Header />
      <QuickNav />
      {/* <TopImages /> */}
      <Form toptext={toptextf} bottomtext={bottomtextf} />
      <Canvas toptext={toptexte} bottomtext={bottomtexte} />
      {/* <Downloader /> */}
    </div>
  );
}

export default App;

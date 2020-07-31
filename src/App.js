import React from "react";
import "./App.css";

import Header from "./components/header/Header";
import QuickNav from "./components/quicknav/QuickNav";
import TopImages from "./components/topimages/TopImages";
import Form from "./components/form/Form";
//import Quote from "./components/quote/Quote"
import Canvas from "./components/canvas/Canvas"

function App() {
  return (
    <div id="main">
      <Header />
      <QuickNav />
      <TopImages />
      <Canvas />
      <Form />
      {/* <Downloader /> */}
    </div>
      

  );
}

export default App;

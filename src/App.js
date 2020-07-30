import React from "react";
import "./App.css";

import Header from "./components/header/Header";
import QuickNav from "./components/quicknav/QuickNav";
import TopImages from "./components/topimages/TopImages";

function App() {
  return (
    <div id="main">
      <Header />
      <QuickNav />
      <TopImages />
    </div>
  );
}

export default App;

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
      <div className="flex-header-container">
        <Header className="flex-header-left" />
        <ToolBar />
      </div>
      <div className="flex-body-container">
        <Form className="flex-wrapper-left" />
        <Canvas className="flex-wrapper-right" />
      </div>
      <QuickNav />
      <div className="yellowBanner">
        <p>
          Share your memes on{" "}
          <a href="https://twitter.com/hashtag/trumpgraffitimemes">
            #trumpgraffitimemes
          </a>{" "}
          and please don't forget to vote on <span>3rd November 2020</span>!
        </p>
        <p className="privacyAndInfo">
          ❤️{" "}
          <a href="https://github.com/trumpgraffitimemes/generator/blob/master/README.md">
            Attribution
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;

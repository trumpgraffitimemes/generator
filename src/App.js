import React, {useState} from "react";
import "./App.css";

import Header from "./components/header/Header";
import QuickNav from "./components/quicknav/QuickNav";
import TopImages from "./components/topimages/TopImages";
import Form from "./components/form/Form";

//import Quote from "./components/quote/Quote"
import Canvas from "./components/canvas/Canvas";

function App() {
  const [toptexte, setToptexte]=useState();
  const [bottomtexte, setBottomtexte]=useState();
  const [generatee, setGeneratee]=useState();
   
   
  function toptextf(e){
     setToptexte(e) 
   }

   function bottomtextf(e){
    setBottomtexte(e) 
  }

  function generatef(){
    setGeneratee(true) 
  }
 

  return (
    <div id="main">
      <Header />
      <QuickNav />
      <TopImages />
      <Canvas toptext={toptexte} bottomtext={bottomtexte} generate={generatee}/>
      <Form toptext={toptextf} bottomtext={bottomtextf} generate={generatef}/>
      {/* <Downloader /> */}
    </div>
  );
}

export default App;

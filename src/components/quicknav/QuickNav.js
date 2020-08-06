import React, {useContext, useState, useEffect} from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import QuickListData from "../../data/QuickListData";
import "react-tabs/style/react-tabs.css";
import { StateContext } from "../statecontext/stateContext";

function HideAndShowDivOnClick () {
  const { picdatanew, setPicID, colorList, setTextColor, setGrafitiColor, fontSize, setFontSize } = useContext(StateContext)
  const [showDiv, setShowDiv] = useState(false)
  const [chips, setChips] = useState()
 
function getInfo(e){
    setPicID(e.target.id)

}

useEffect(()=>{
    if(picdatanew!==undefined){
      setChips(picdatanew.map((v, i) => (
            <img key={i} id={i} onClick={getInfo} type="image" src={v.previewURL} alt="choice image" className="quicklist-pic"/>
      ))) }}, [picdatanew])


      //{(colorList.map((v, i) => (
        //          <input key={i} id={i} onClick={(e)=>setTextColor(e.target.id)} alt="color" Style={"background-color:"+v}  className="quicklist-pic"/>
          //    )))}
 return (
      <div className="quicklist-container">
        {showDiv && (
          <Tabs>
            <TabList>
              <Tab>Donald</Tab>
              <Tab>Text-style</Tab>
              <Tab>Graffiti-style</Tab>
            </TabList>
            
              <TabPanel >
                <ul className="quicklist-content">
                 {chips}                  
                </ul>
              </TabPanel>
              <TabPanel>
                
               <input type="color" onChange={(e)=>setTextColor(e.target.value)}/><p>TEXT COLOR</p>
        <input type="range" onChange={(e)=>setFontSize(e.target.value)} value = {fontSize} min="10" max="50"/><p>FONT SIZE: {fontSize}px</p>
              </TabPanel>
              <TabPanel>
              {(colorList.map((v, i) => (
                  <input key={i} id={i} onClick={(e)=>setGrafitiColor(e.target.id)} alt="color" Style={"background-color:"+v}  className="quicklist-pic"/>
              )))}
              </TabPanel>
          </Tabs>
        )}
   

        <button
          className="quicklist-btn"
          onClick={() => setShowDiv(!showDiv )}
        >
          {showDiv ? "Hide" : "Quicklist"}
        </button>
      </div>
    );
  }


export default HideAndShowDivOnClick;

import React, {useContext, useState, useEffect} from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
//import QuickListData from "../../data/QuickListData";
import "react-tabs/style/react-tabs.css";
import { StateContext } from "../statecontext/stateContext";
import Styles from "./QuickNav.module.css";

function HideAndShowDivOnClick () {
  const { picdatanew, setPicID, grafitiParam, setGrafitiParam, textParam, setTextParam, setTabIndex, icons, setIconID } = useContext(StateContext)
  const [showDiv, setShowDiv] = useState(false)
  const [chips, setChips] = useState()
  const [fish, setFish] = useState()
  const [hideFontList, setHideFontList] = useState(Styles.hide)
 
function getInfo(e){
    setPicID(e.target.id)

}

function IconID(e){
  setIconID(e.target.id)

}

useEffect(()=>{
    if(picdatanew!==undefined){
      setChips(picdatanew.map((v, i) => (
            <img key={i} id={i} onClick={getInfo} onTouchStart={getInfo} type="image" src={v.previewURL} alt="choose donald" className="quicklist-pic"/>
      ))) }}, [picdatanew])

useEffect(()=>{
        if(icons!==undefined){
          setFish(icons.map((v, i) => (
                <img key={i} id={i} onClick={IconID} onTouchStart={IconID} type="image" src={v.previewURL} alt="choose donald" className="quicklist-pic"/>
          ))) }}, [icons])


      //{(colorList.map((v, i) => (
        //          <input key={i} id={i} onClick={(e)=>setTextColor(e.target.id)} alt="color" Style={"background-color:"+v}  className="quicklist-pic"/>
          //    )))}
 return (
      <div className="quicklist-container">
        {showDiv && (
          <Tabs defaultIndex={0} onSelect={index=>setTabIndex(index)}>
            <TabList>
              <Tab >Donald</Tab>
              <Tab >Text-style</Tab>
              <Tab >Graffiti-style</Tab>
              <Tab >Icons</Tab>
            </TabList>
            
              <TabPanel >
                <ul className="quicklist-content">
                 {chips}    
                </ul>
              </TabPanel>
              <TabPanel>
                <div className= {Styles.container}>
                  <div className = {Styles.boxes}>
                    <input type="color" value={textParam.textColor} onChange={(e)=>setTextParam({...textParam, textColor: e.target.value})}/><label>TEXT COLOR</label>
                  </div>
                  <div className = {Styles.boxes}>
                    <input type="range" value={textParam.fontSize} onChange={(e)=>setTextParam({...textParam, fontSize: e.target.value})}  min="10" max="50"/><label>FONT SIZE: {textParam.fontSize}px</label>
                  </div>
                  <div className = {Styles.boxes}>
                    <input type="range" value={textParam.blurWidth} onChange={(e)=>setTextParam({...textParam, blurWidth: e.target.value})}  min="0" max="40"/><label>BLUR WIDTH: {textParam.blurWidth}</label>
                  </div>
                  <div className = {Styles.boxes}>
                    <input type="color" value={textParam.blurColor} onChange={(e)=>setTextParam({...textParam, blurColor: e.target.value})}/><label>BLUR COLOR</label>
                  </div>
                  <div className = {Styles.boxes}>
                    <input type="color" value={textParam.threeDColor} onChange={(e)=>setTextParam({...textParam, threeDColor: e.target.value})}/><label>3D COLOR</label>
                  </div>
                  <div>
                  <p onClick={()=> {hideFontList===Styles.hide?setHideFontList(Styles.list):
                  setHideFontList(Styles.hide)}
                  }>Font Choice</p>
                  <ul className={hideFontList}>
                   <li onClick = {()=>setTextParam({...textParam, font: "Indie Flower"})} className={Styles.indieFlower}>Indie Flower</li>
                   <li onClick = {()=>setTextParam({...textParam, font: "Kaushan Script"})}className={Styles.kaushanScript}>Kaushan Script</li>
                   <li onClick = {()=>setTextParam({...textParam, font: "Pacifico"})}className={Styles.pacifico}>Pacifico</li>
                   <li onClick = {()=>setTextParam({...textParam, font: "Homemade Apple"})}className={Styles.homemadeApple}>Homemade Apple</li>
                   <li onClick = {()=>setTextParam({...textParam, font: "Wallpoet"})}className={Styles.wallpoet}>Wallpoet</li>
                   <li onClick = {()=>setTextParam({...textParam, font: "Roboto Mono"})}className={Styles.robotoMono}>Roboto Mono</li>
                   <li onClick = {()=>setTextParam({...textParam, font: "Bebas Neue"})}className={Styles.bebasNeue}>Bebas Neue</li>
                   <li onClick = {()=>setTextParam({...textParam, font: "Monoton"})}className={Styles.monoton}>Monoton</li>
                   <li onClick = {()=>setTextParam({...textParam, font: "Press Start 2P"})}className={Styles.pressStart2P}>Press Start 2P</li>
                   <li onClick = {()=>setTextParam({...textParam, font: "Bangers"})}className={Styles.bangers}>Bangers</li>
                   <li onClick = {()=>setTextParam({...textParam, font: "Piedra"})}className={Styles.piedra}>Piedra</li>
                   <li onClick = {()=>setTextParam({...textParam, font: "Fredericka the Great"})}className={Styles.frederickaTheGreat}>Fredericka the Great</li>
                   <li onClick = {()=>setTextParam({...textParam, font: "VT323"})}className={Styles.vt323}>VT323</li>
                   <li onClick = {()=>setTextParam({...textParam, font: "Vast Shadow"})}className={Styles.vastShadow}> Vast Shadow</li>
                  </ul>
                  </div>
                </div>                
              </TabPanel>
              <TabPanel>
                <div className= {Styles.container}>
                  <div className = {Styles.boxes}>
                    <input type="color" value={grafitiParam.Color} onChange={(e)=>setGrafitiParam({...grafitiParam, Color: e.target.value})}/><label>Grafiti COLOR</label>
                  </div>
                  <div className = {Styles.boxes}>
                    <input type="range" value={grafitiParam.Width} onChange={(e)=>setGrafitiParam({...grafitiParam, Width: e.target.value})}  min="1" max="40"/><label>Grafiti WIDTH: {grafitiParam.Width}</label>
                  </div>
                </div>
                
              </TabPanel>
              <TabPanel>
              <ul className="quicklist-content">
                 {fish}    
                </ul>

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

 import React from "react";
 import Styles from "./Canvas.module.css";
 import { ReactComponent as Donald } from 'assets/donald_1d.jpg';
 
 export default function Canvas() {

    
   return (
     <div className={Styles.Container}>
       <div>
         <img src={require('./logo192.png')} />
         <Donald />
       </div>
       <div><img src={require("./DSC05523.JPG")}/></div>
       <div><img src={require("./assets/donald_1a.jpg")}/></div>
       <div className={Styles.Wrapper}>
          <div><img src={require("./assets/donald_1a.jpg")}/></div>
          <div><img src={require("./assets/donald_1b.jpg")}/></div>
          </div>
          <div className={Styles.Wrapper}>
          <div><img src={require("./assets/donald_1c.jpg")}/></div>
          <div><img src={require("./assets/donald_1d.jpg")}/></div>
        </div> 
     </div>
   );
 }
 
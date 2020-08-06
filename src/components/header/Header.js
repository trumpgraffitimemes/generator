import React, {useContext, useState, useEffect} from "react";
// import './App.css';
import { StateContext } from "../statecontext/stateContext";
import Styles from "./Header.module.css"

export default function Header() {
  const { quotenew } = useContext(StateContext)
  const [singquote, setSingquote] = useState()
  
  useEffect(()=>{
    singlequote()
  function singlequote(){
   if(quotenew.length !==0){
     const long = quotenew.messages.non_personalized.length-1 
     const randomnume = Math.floor(Math.random()*long)
     setSingquote(quotenew.messages.non_personalized[randomnume])
  setInterval(()=>{ 
      const randomnum = Math.floor(Math.random()*long)
    setSingquote(quotenew.messages.non_personalized[randomnum])
  }, 30000)} 
  }}, [quotenew])

  return (
    <div className={Styles.container}>
      <h1>Master Trump Memes Graffiti</h1>
      <h3>King Of Memes</h3>
      <h3>{singquote}</h3>
      <img src={require("../../assets/trump-lightning.gif")} alt="test" className={Styles.img} />
    </div>
  );
}

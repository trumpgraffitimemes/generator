import React, { useContext, useState, useEffect } from "react";
// import './App.css';
import { StateContext } from "../statecontext/stateContext";
import Styles from "./Header.module.css";

export default function Header() {
  const { quotenew } = useContext(StateContext);
  const [singquote, setSingquote] = useState();

  useEffect(() => {
    singlequote();
    function singlequote() {
      if (quotenew.length !== 0) {
        const long = quotenew.messages.non_personalized.length - 1;
        const randomnume = Math.floor(Math.random() * long);
        setSingquote(quotenew.messages.non_personalized[randomnume]);
        setInterval(() => {
          const randomnum = Math.floor(Math.random() * long);
          setSingquote(quotenew.messages.non_personalized[randomnum]);
        }, 30000);
      }
    }
  }, [quotenew]);
  //<h3>King Of Memes</h3>
  return (
    <div className={Styles.container}>
      <div className={Styles.titleFlex}>
        <img
          src={require("../../assets/trump-lightning.gif")}
          alt="trump"
          className={Styles.img}
        />
        <h1>
          Trump <span className={Styles.graffitiText}>GRAFFITI</span> Memes
        </h1>
      </div>
      <h3 className={Styles.quotes}>
        <span className={Styles.quotemark}>" </span>
        {singquote}
        <span className={Styles.quotemark}> "</span>
      </h3>
    </div>
  );
}

import React, { useContext } from "react";
import Styles from "./Form.module.css";
import { StateContext } from "../statecontext/stateContext";

export default function Form() {
  const {
    textInput, setTextInput, setPers, setRandomQuoteName
  } = useContext(StateContext);


  return (
    <div>
      <form className="meme-form">
        <input
          type="text"
          name="topText"
          placeholder="ENTER YOUR"
          onChange={(e) => setTextInput({...textInput, toptext: e.target.value})}
        />
        <input
          type="text"
          name="bottomText"
          placeholder="TEXT HERE"
          onChange={(e) => setTextInput({...textInput, bottomtext: e.target.value})}
        />
      </form>
      <div className={Styles.startcontainer}>
        <h4>Or, Generate A Random Quote ...</h4>
      </div>
      <div className={Styles.buttoncontainer}>
        <input
          type="text"
          placeholder="Enter *name* for quote"
          className={Styles.input}
          onChange={(e) => setRandomQuoteName(e.target.value)}
        />
        <button className={Styles.button} onClick={() => setPers(true)}>
          Generate
        </button>
      </div>
    </div>
  );
}

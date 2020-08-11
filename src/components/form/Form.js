import React, { useContext } from "react";
import Styles from "./Form.module.css";
import { StateContext } from "../statecontext/stateContext";

export default function Form() {
  const {
    textInput, setTextInput, setPers, setRandomQuoteName
  } = useContext(StateContext);


  return (
    <div>
      <form  className={Styles.forminp}>
        <input
          className={Styles.inputinp}
          type="text"
          name="topText"
          placeholder="ENTER YOUR"
          onChange={(e) => setTextInput({...textInput, toptext: e.target.value})}
        />
        <input
          className={Styles.inputinp}
          type="text"
          name="bottomText"
          placeholder="TEXT HERE"
          onChange={(e) => setTextInput({...textInput, bottomtext: e.target.value})}
        />
      </form>
      <div>
        <h4>Or, Generate A Random Quote ...</h4>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter *name* for quote"
          className={Styles.inputinp}
          onChange={(e) => setRandomQuoteName(e.target.value)}
        />
        <button onClick={() => setPers(true)}>
          Generate
        </button>
      </div>
    </div>
  );
}

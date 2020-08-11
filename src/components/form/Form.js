import React, { useContext } from "react";
import Styles from "./Form.module.css";
import { StateContext } from "../statecontext/stateContext";

export default function Form() {
  const {
    textInput, setTextInput
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
    </div>
  );
}

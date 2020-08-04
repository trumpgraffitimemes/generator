import React, { useState } from "react";
// import Styles from "./Form.module.css";

export default function Form() {
  const [inputText, setInputText] = useState({
    topText: "",
    bottomText: "",
  });
  const handleChange = (e) => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div>
      <form className="meme-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="topText"
          placeholder="ENTER YOUR"
          value={inputText.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          name="bottomText"
          placeholder="TEXT HERE"
          value={inputText.bottomText}
          onChange={handleChange}
        />

        <button>Generate</button>
      </form>
    </div>
  );
}

import React, { useState } from "react";
import Styles from "./Form.module.css";

export default function Form({ toptext, bottomtext }) {
  return (
    <div>
      <form className="meme-form">
        <input
          type="text"
          name="topText"
          placeholder="ENTER YOUR"
          onChange={(e) => toptext(e.target.value)}
        />
        <input
          type="text"
          name="bottomText"
          placeholder="TEXT HERE"
          onChange={(e) => bottomtext(e.target.value)}
        />
      </form>
    </div>
  );
}

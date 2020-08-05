
//import React from "react";
import React, { useState } from "react";
import Styles from "./Form.module.css";

export default function Form({toptext, bottomtext, generate}) {

  function clickHandle(){
    generate()
  }


  return (
    <div>
      <form className="meme-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="topText"
          placeholder="ENTER YOUR"
<
          onChange={(e) => toptext(e.target.value)}

        />
        <input
          type="text"
          name="bottomText"
          placeholder="TEXT HERE"

          onChange={(e) => bottomtext(e.target.value)}

        />

        <button onClick={clickHandle}>Generate</button>
      </form>
    </div>
  );
}

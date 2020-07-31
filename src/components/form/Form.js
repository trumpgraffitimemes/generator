import React, { useState } from "react";
import Styles from "./Form.module.css";

export default function Form(props) {
  return (
    <div>
                <form className="meme-form">
                    <input 
                        type="text"
                        name="topText"
                        placeholder="ENTER YOUR"
                        /*onChange={(e) => setValue(e.target.value)}*/
                        /> 
                    <input 
                        type="text"
                        name="bottomText"
                        placeholder="TEXT HERE"
                        /*onChange={(e) => setValue(e.target.value)}*/
                        /> 
                
                    <button>Generate</button>
                </form>
            </div>
  );
}
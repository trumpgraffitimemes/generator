import React from "react";
import Styles from "./Canvas.module.css";

export default function Canvas() {
  return (
    <div className={Styles.Container}>
      <div>
        <img src={require("./logo192.png")} />
      </div>
      <div>
        <img src={require("./logo192.png")} />
      </div>
      <div className={Styles.Wrapper}>
        <div>
          <img src={require("./logo192.png")} />
        </div>
        <div>
          <img src={require("./logo192.png")} />
        </div>
      </div>
      <div className={Styles.Wrapper}>
        <div>
          <img src={require("./logo192.png")} />
        </div>
        <div>
          <img src={require("./logo192.png")} />
        </div>
      </div>
    </div>
  );
}

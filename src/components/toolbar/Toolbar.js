import React, { useContext } from "react";
import { StateContext } from "../statecontext/stateContext";

// create a separate css module file here still
import Styles from "./Toolbar.module.css";

export default function ToolBar() {
  const { theme, setTheme } = useContext(StateContext);

  const setNewTheme = (themeName) => {
    setTheme(themeName);
  };

  //src={require("../../assets/trumpshaddow.svg")}

  return (
    <div className={Styles.Toolbar}>
      {theme === "light" ? (
        <button
          type="image"
          className={theme === "dark" ? Styles.active : ""}
          onClick={() => setNewTheme("dark")}
        >
          🌙
        </button>
      ) : (
        <button
          type="image"
          className={theme === "light" ? Styles.active : ""}
          onClick={() => setNewTheme("light")}
        >
          💡
        </button>
      )}
    </div>
  );
}

import React, { useContext } from "react";
import { StateContext } from "../statecontext/stateContext";
import Styles from "./Toolbar.module.css";

export default function ToolBar() {
  const { theme, setTheme } = useContext(StateContext);

  const setNewTheme = (themeName) => {
    setTheme(themeName);
  };

  return (
    <div className={Styles.Toolbar}>
      {theme === "light" ? (
        <button
          // type="image"
          className={theme === "dark" ? Styles.active : ""}
          onClick={() => setNewTheme("dark")}
        >
          🌙
        </button>
      ) : (
        <button
          // type="image"
          className={theme === "light" ? Styles.active : ""}
          onClick={() => setNewTheme("light")}
        >
          💡
        </button>
      )}
    </div>
  );
}

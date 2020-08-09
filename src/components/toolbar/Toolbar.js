import React, { useContext } from "react";
// import { ThemeContext } from "./themeContext";
// import {StateContext} from "..stateContext";
// import { StateContext } from "./components/statecontext/stateContext";
import { StateContext } from "../statecontext/stateContext";

// import { StateContext } from "./components/statecontext/stateContext";
// import "./styles.css";
import "../../App.css";

export default function ToolBar() {
  const { theme, setTheme } = useContext(StateContext);

  const setNewTheme = (themeName) => {
    setTheme(themeName);
  };

  return (
    <div className="Toolbar">
      <button
        className={theme === "dark" ? "active" : ""}
        onClick={() => setNewTheme("dark")}
      >
        dark
      </button>
      <button
        className={theme === "light" ? "active" : ""}
        onClick={() => setNewTheme("light")}
      >
        light
      </button>
    </div>
  );
}

import React, { useContext } from "react";
import { StateContext } from "../statecontext/stateContext";

// create a separate css module file here still
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

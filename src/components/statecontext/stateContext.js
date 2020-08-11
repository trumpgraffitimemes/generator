import React, { createContext, useState, useEffect } from "react";

export const StateContext = createContext({});
// export const StateContext = createContext();

export default function StateContextProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [picdatanew, setPicdatanew] = useState([]);
  const [quotenew, setQuotenew] = useState([]);
  const [picID, setPicID] = useState(0);
  //const [iconID, setIconID] = useState(0);
  const [grafitiParam, setGrafitiParam] = useState({
    Color: "#FFFF00",
    Width: 10,
  });
  const [grafitiColor, setGrafitiColor] = useState(0);
  const [textParam, setTextParam] = useState({
    textColor: "#FFFFFF",
    fontSize: 40,
    blurWidth: 10,
    blurColor: "#000000",
    threeDColor: "#737a75",
    font: "Arial",
  });
  const[textInput, setTextInput] = useState({toptext: "", bottomtext: ""})

  useEffect(() => {
    fetch(
      "https://pixabay.com/api/?key=17706064-dbf47c15f3ffee1df9f90dd47&q=donald+trump&image_type=all&per_page=40"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (rep) {
        const memes = rep.hits;
        setPicdatanew(memes);
      });
  }, []);

  useEffect(() => {
    fetch("https://api.whatdoestrumpthink.com/api/v1/quotes")
      .then(function (response) {
        return response.json();
      })
      .then(function (rep) {
        setQuotenew(rep);
      });
  }, []);

  return (
    <StateContext.Provider
      value={{
        picdatanew,
        quotenew,
        picID,
        setPicID,
        grafitiParam,
        setGrafitiParam,
        textParam,
        setTextParam,
        theme,
        setTheme,
        textInput, 
        setTextInput
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

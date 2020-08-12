import React, { createContext, useState, useEffect } from "react";

export const StateContext = createContext({});
// export const StateContext = createContext();

export default function StateContextProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [picdatanew, setPicdatanew] = useState([]);
  const [quotenew, setQuotenew] = useState([]);
  const [picID, setPicID] = useState(0);
  const [randomQuoteName, setRandomQuoteName] = useState("Robert");
  const [pers, setPers] = useState(false);
  //const [iconID, setIconID] = useState(0);
  const [grafitiParam, setGrafitiParam] = useState({
    Color: "#FFFF00",
    Width: 10,
  });
  const [textParam, setTextParam] = useState({
    textColor: "#FFFFFF",
    fontSize: 40,
    blurWidth: 10,
    blurColor: "#000000",
    threeDColor: "#737a75",
    font: "Arial",
  });
  const [textInput, setTextInput] = useState({ toptext: "", bottomtext: "" });
  const [myImage, setMyImage] = useState();

  // Medium sized image with a maximum width or height of 640 px (webformatWidth x webformatHeight).
  // URL valid for 24 hours. Replace '_640' in any webformatURL value to access other image sizes:
  // Replace with '_180' or '_340' to get a 180 or 340 px tall version of the image, respectively.
  // Replace with '_960' to get the image in a maximum dimension of 960 x 720 px.

  useEffect(() => {
    fetch(
      "https://pixabay.com/api/?key=17706064-dbf47c15f3ffee1df9f90dd47&q=donald+trump&image_type=all&per_page=200"
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
        setTextInput,
        pers,
        setPers,
        randomQuoteName,
        setRandomQuoteName,
        myImage,
        setMyImage,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

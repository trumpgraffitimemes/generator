import React, {createContext, useState, useEffect} from "react"

export const StateContext = createContext({})



function StateContextProvider({children}){


    const [picdatanew, setPicdatanew] = useState([]);
    const [quotenew, setQuotenew]=useState([]);
    const [picID, setPicID]=useState(0);
    const [colorList, setColorList] = useState(["red", "blue", "pink", "yellow", "green", "purple", "gold", "orange", "brown", "black"])
    const [textColor, setTextColor] = useState("#FF0000")
    const [grafitiColor, setGrafitiColor] = useState(0)
    const [fontSize, setFontSize] = useState(30)
 
    useEffect(() => {
        fetch("https://pixabay.com/api/?key=17706064-dbf47c15f3ffee1df9f90dd47&q=donald+trump&image_type=all&per_page=200")
          .then(function (response) {
            return response.json();
          })
          .then(function (rep) {
            const memes = rep.hits;
            //console.log(memes)
            //setPics(memes);
            setPicdatanew(memes);
            //setZz(Math.floor(Math.random() * memes.length - 1));
          });
      }, []);  


      useEffect(() => {     
        fetch('https://api.whatdoestrumpthink.com/api/v1/quotes')
          .then(function (response) {
            return response.json();
          })
          .then(function (rep) {
            setQuotenew(rep);            
        });
          
        }, []);

return (
    <StateContext.Provider value={{picdatanew, quotenew, picID, setPicID, colorList, setTextColor, textColor, grafitiColor, setGrafitiColor, fontSize, setFontSize}}>
        {children}
    </StateContext.Provider>
    );
}

export default StateContextProvider
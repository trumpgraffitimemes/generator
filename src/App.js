import React from "react";
import "./App.css";

import Header from "./components/header/Header";
import QuickNav from "./components/quicknav/QuickNav";
import TopImages from "./components/topimages/TopImages";
import Form from "./components/form/Form";

//import Quote from "./components/quote/Quote"
import Canvas from "./components/canvas/Canvas"


function App() {
  /*const [memes, setMemes] = useState([]);
  const [currentImg, setCurrentImg] = useState(new Image());

  useEffect(() => {
    fetch("https://pixabay.com/api/?key=17706064-dbf47c15f3ffee1df9f90dd47&q=donald+trump&image_type=all&per_page=50")
      .then(function (response) {
        return response.json();
      })
      .then(function (rep) {
        const memes = rep.hits;
        //console.log(memes)
        //setPics(memes);
        setMemes(memes);
        //setZz(Math.floor(Math.random() * memes.length - 1));
      });
  }, []);

  const onChangeImgButtonClick = () {
    currentImg.src = // pic random from memes
    setCurrentImg(currentImg);
  }

  const uploadImg = (uploadedImg) {
    setCurrentImg(uploadedImg)
  }

  const onChooseImgFromQuickNav = (img) {
    setCurrentImg(img)
  }*/

  return (
    <div id="main">
      <Header />
      {/* {if memes.length && <QuickNav memes={memes} action={onChooseImgFromQuickNav} />} */}
      <QuickNav />
      <TopImages />
      {/* <Canvas image={currentImg} /> */}
      <Canvas />
      <Form />
      {/* <ChangePictureButton action={onChangeImgButtonClick} /> */}
      {/* <Downloader /> */}
    </div>
  );
}

export default App;

import React, { useEffect /*, useState*/ } from "react";
//import styles from "./PictureSource.module.css";

export default function PictureSource({ picdata }) {
  //const [pics, setPics] = useState();
  //const [numberg, setNumberg] = useState(0);
  //const [zz, setZz] = useState(0);
  //picdata = pics

  useEffect(() => {
    fetch(
      "https://pixabay.com/api/?key=17706064-dbf47c15f3ffee1df9f90dd47&q=donald+trump&image_type=all&per_page=50"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (rep) {
        const memes = rep.hits;
        //console.log(memes)
        //setPics(memes);
        picdata(memes);
        //setZz(Math.floor(Math.random() * memes.length - 1));
      });
  }, []);

  /*function onhandle() {
    const long = pics.length;

    if (zz === long) {
      setNumberg(0);
    } else if (zz === 0) {
      setNumberg(long);
    } else {
      setNumberg(zz);
      setZz(zz + 1);
    }
  }*7

/*  {pics ? (
        <img src={pics[numberg].url} alt="meme" className={styles.pics} />
      ) : (
        <></>*/
  //<button onClick={onhandle}>Change pic</button>
  return <div></div>;
}

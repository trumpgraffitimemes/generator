import React, { useRef, useEffect, useState } from "react";
import styles from "./Canvas.module.css";
import PictureSource from "../picturesource/PictureSource";
import Quote from "../quote/Quote";

export default function Canvas() {
  const contextRef = useRef(null);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvassize, setCanvasSize] = useState({ width: 800, height: 800 });
  const [zz, setZz] = useState(0);
  const [pics, setPics] = useState();
  const [numberg, setNumberg] = useState(0);
  //const [qstate, setQstate] = useState()
  const [previousstate, setPreviousstate] = useState();
  //const [picturedata, setPicturedata] = useState();
  //const pictureload = []

  //set the basic canvas properties

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    contextRef.current = context;
    contextRef.current.font = "bold 20px Roman";
    //console.log(contextRef)
    setPreviousstate(contextRef);
  }, []);

  // function call for the first picture
  function picdata(memes) {
    const img = new Image(); // Create new img element
    //const randomnumber=Math.floor(Math.random() * memes.length - 1)
    img.src = memes[numberg].webformatURL;
    setCanvasSize({
      width: memes[numberg].webformatWidth,
      height: memes[numberg].webformatHeight,
    });
    if (memes !== undefined) {
      setTimeout(() => {
        contextRef.current.drawImage(
          img,
          0,
          0,
          memes[numberg].webformatWidth,
          memes[numberg].webformatHeight
        );
        setPics(memes);
      }, 2000);

      //const imut = contextRef
      //setPreviousstate(imut)
      //console.log(contextRef.current)
    }
  }

  //show the next picture when numberg changes
  useEffect(() => {
    //console.log(prevstate)
    const img = new Image(); // Create new img element
    if (pics !== undefined) {
      img.src = pics[numberg].webformatURL;
      setCanvasSize({
        width: pics[numberg].webformatWidth,
        height: pics[numberg].webformatHeight,
      });
      setTimeout(() => {
        contextRef.current.drawImage(
          img,
          0,
          0,
          pics[numberg].webformatWidth,
          pics[numberg].webformatHeight
        );
      }, 2000);
      //setPreviousstate(contextRef)
    }
  }, [numberg]);

  // draw, set a starting point and an end point
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineWidth = 10;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  // make the text more interesting
  // how to clear the quote properly when the next one is loaded (2canvasses?)
  // if 2 canvases how to add them together when extracting data
  //useEffect(() =>console.log(previousstate))
  //console.log(previousstate)

  //useEffect((pers) => {

  function quotep(pers) {
    console.log(previousstate);

    //setPrevstate(contextRef.current)

    retry();
    //setQstate(contextRef.current)
    //const [contRef, setContref]= useState(contextRef.current)
    function retry() {
      const lengt = pers.length;
      const randomnum = Math.floor(Math.random() * lengt - 1);
      const singleq = pers[randomnum];

      //console.log(singleq)

      contextRef.current.font = "bold 30px Arial";
      const message = "Robert" + singleq;
      const long = Math.floor(contextRef.current.measureText(message).width);
      const start = canvassize.width / 2 - long / 2;

      if (long < canvassize.width) {
        //const height = Math.floor(contextRef.current.measureText(message).height)
        //var rectangle = new Path2D();
        //contextRef.current.fillStyle = "White"
        //contextRef.current.fillRect(start, 15, (long+10), 45);
        //contextRef.current.save();
        contextRef.current.shadowColor = "black";
        contextRef.current.shadowBlur = 10;
        contextRef.current.fillStyle = "black";
        contextRef.current.fillText(
          "Robert " + singleq,
          start + 1,
          50 + 1,
          canvassize.width - 30
        );
        contextRef.current.fillText(
          "Robert " + singleq,
          start + 2,
          50 + 2,
          canvassize.width - 30
        );
        contextRef.current.fillStyle = "pink";
        contextRef.current.fillText(
          "Robert " + singleq,
          start,
          50,
          canvassize.width - 30
        );
        //console.log(contextRef.current.fillText)
      } else {
        retry();
      }
    }
  }
  //[quotep()])

  //navigate up and down the pictures
  function handleUp() {
    const long = pics.length - 1;

    if (zz === long) {
      setNumberg(0);
      setZz(0);
    } else {
      setNumberg(zz);
      setZz(zz + 1);
    }
  }

  function handleDown() {
    const long = pics.length - 1;
    if (zz === 0) {
      setNumberg(long);
      setZz(long);
    } else {
      setNumberg(zz);
      setZz(zz - 1);
    }
  }

  // var canvas = document.getElementById("canvas");
  // const canvas = canvasRef.current;

  // function download_img(el) {
  //   const image = canvasRef.toDataURL("image/png");
  //   image.crossOrigin = "Anonymous";
  //   el.href = image;
  // }

  // var button = document.getElementById("btn-download");
  // button.addEventListener("click", function (e) {
  //   var dataURL = canvasRef.toDataURL("image/png");
  //   button.href = dataURL;
  // });

  // const TempImage = window.Image;

  // const download_img = function () {
  //   const img = new TempImage();
  //   img.crossOrigin = "anonymous";
  //   return img;
  // };

  function download() {
    var canvas = document.getElementById("canvas");
    canvas.crossOrigin = "Anonymous";
    var url = canvas.toDataURL("image/png");
    var link = document.createElement("a");
    link.download = "filename.png";
    link.href = document.getElementById("canvas").toDataURL();
    link.click();
  }

  return (
    <div>
      <PictureSource picdata={picdata} />
      <Quote quotep={quotep} />
      <div className={styles.Container}>
        <button onClick={handleUp} className={styles.button}>
          Up
        </button>
        <div>
          <canvas
            id="canvas"
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            width={canvassize.width}
            height={canvassize.height}
          ></canvas>
        </div>
        <button onClick={handleDown} className={styles.button}>
          Down
        </button>
      </div>

      <div>
        {/* <a
          id="btn-download"
          className="button"
          download="myImage.jpg"
          crossorigin="anonymous"
          href=""
          onClick={download_img}
        >
          Download to myImage.jpg
        </a> */}
        <button onClick={download}>Download!</button>
      </div>
    </div>
  );
}

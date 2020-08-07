import React, { useRef, useEffect, useState, useContext } from "react";
import styles from "./Canvas.module.css";
// import PictureSource from "../picturesource/PictureSource";
// import Quote from "../quote/Quote";
import { StateContext } from "../statecontext/stateContext";

export default function Canvas({ toptext, bottomtext, generate }) {
  const { picdatanew, quotenew } = useContext(StateContext);

  const contextRef = useRef(null);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvassize, setCanvasSize] = useState({ width: 800, height: 800 });
  const [zz, setZz] = useState(0);
  //const [pics, setPics] = useState();
  const [numberg, setNumberg] = useState(0);
  //const [qstate, setQstate] = useState()
  //const [previousstate, setPreviousstate] = useState()
  const [myImage, setMyImage] = useState();
  const [picturedata, setPicturedata] = useState();
  const [line, setLine] = useState();
  //const pictureload = []
  //set the basic canvas properties

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    contextRef.current = context;
    contextRef.current.font = "bold 20px Roman";
  }, []);

  //show the next picture when numberg changes
  useEffect(() => {
    const img = new Image(); // Create new img element
    if (picdatanew !== undefined) {
      // console.log(picdatanew);
      img.src = picdatanew[numberg].webformatURL;
      img.setAttribute("crossorigin", "anonymous");
      setCanvasSize({
        width: picdatanew[numberg].webformatWidth,
        height: picdatanew[numberg].webformatHeight,
      });
      setPicturedata(img);
      setTimeout(() => {
        contextRef.current.drawImage(
          img,
          0,
          0,
          picdatanew[numberg].webformatWidth,
          picdatanew[numberg].webformatHeight
        );
      }, 2000);
    }
  }, [numberg, picdatanew]);

  // draw, set a starting point and an end point.
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineWidth = 10;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };
  //const fishX = [];
  //const fishY = [];
  //const xx = []
  //const yy = []

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    //var x=offsetX
    //var y=offsetY
    //fishX.map((bob)=>{...bob, offsetX})
    //fishY.map(...fishY, offsetY)
    //setLine({...fishX, fishX})
    //console.log(...offsetX)
  };

  const finishDrawing = () => {
    //contextRef.current.closePath();
    setIsDrawing(false);
  };

  // make the text more interesting

  //function generater(){
  useEffect(() => {
    if (toptext !== undefined && bottomtext !== undefined) {
      contextRef.current.font = "bold 50px Arial";
      const longtop = Math.floor(contextRef.current.measureText(toptext).width);
      const starttop = canvassize.width / 2 - longtop / 2;
      const longbottom = Math.floor(
        contextRef.current.measureText(bottomtext).width
      );
      const startbottom = canvassize.width / 2 - longbottom / 2;

      contextRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      contextRef.current.drawImage(picturedata, 0, 0);
      //contextRef.current.stroke(line)
      contextRef.current.shadowColor = "black";
      contextRef.current.shadowBlur = 10;
      contextRef.current.fillStyle = "black";
      contextRef.current.fillText(
        toptext,
        starttop + 1,
        50 + 1,
        canvassize.width - 30
      );
      contextRef.current.fillText(
        toptext,
        starttop + 2,
        50 + 2,
        canvassize.width - 30
      );
      contextRef.current.fillText(
        bottomtext,
        startbottom + 1,
        canvassize.height - 49,
        canvassize.width - 30
      );
      contextRef.current.fillText(
        bottomtext,
        startbottom + 2,
        canvassize.heigth - 48,
        canvassize.width - 30
      );
      contextRef.current.fillStyle = "pink";
      contextRef.current.fillText(toptext, starttop, 50, canvassize.width - 30);
      contextRef.current.fillText(
        bottomtext,
        startbottom,
        canvassize.height - 50,
        canvassize.width - 30
      );
    }
  }, [toptext, bottomtext]);

  function quotep(pers) {
    retry();
    function retry() {
      const lengt = pers.length;
      const randomnum = Math.floor(Math.random() * lengt - 1);
      const singleq = pers[randomnum];

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
        contextRef.current.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        contextRef.current.drawImage(picturedata, 0, 0);
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
      } else {
        retry();
      }
    }
  }

  //navigate up and down the pictures
  function handleUp() {
    const long = picdatanew.length - 1;

    if (zz === long) {
      setNumberg(0);
      setZz(0);
    } else {
      setNumberg(zz);
      setZz(zz + 1);
    }
  }

  function handleDown() {
    const long = picdatanew.length - 1;
    if (zz === 0) {
      setNumberg(long);
      setZz(long);
    } else {
      setNumberg(zz);
      setZz(zz - 1);
    }
  }

  function downloa(el) {
    var image = canvasRef.current.toDataURL("image/jpg");
    //const fish = contextRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height).data;
    //console.log(fish)
    setMyImage(image);
  }

  function handleClick() {
    setTimeout(() => {
      quotep(quotenew.messages.personalized);
    }, 100);
  }

  //<PictureSource picdata={picdata}/><Quote quotep={quotep}/>

  return (
    <div>
      <div className={styles.Container}>
        <button onClick={handleUp} className={styles.button}>
          Up
        </button>
        <div>
          <canvas
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
      <a download="myimage.jpg" href={myImage} onClick={downloa}>
        "Download to myImage.jpg"
      </a>
      <button className={styles.button}>Generate</button>
      <button className={styles.button} onClick={handleClick}>
        Random Quote
      </button>
    </div>
  );
}

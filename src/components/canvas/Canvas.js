import React, { useRef, useEffect, useState, useContext } from "react";
import Styles from "./Canvas.module.css";
import { StateContext } from "../statecontext/stateContext";

export default function Canvas({ toptext, bottomtext }) {
  const { picdatanew, quotenew, picID, grafitiParam, textParam } = useContext(
    StateContext
  );
  const contextRef = useRef(null);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvassize, setCanvasSize] = useState({ width: 800, height: 800 });

  const [myImage, setMyImage] = useState();
  const [picturedata, setPicturedata] = useState();
  const [lined, setLined] = useState([]);
  //const [startstop, setStartstop] = useState({});
  const [wholedata, setWholedata] = useState([]);
  const [startpos, setStartpos] = useState([]);
  const [randomQuoteName, setRandomQuoteName] = useState("Robert");
  const [pers, setPers] = useState(false);

  //set the basic canvas properties

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    contextRef.current = context;
    contextRef.current.font = "bold 20px Roman";
  }, []);

  //show the selected picture
  useEffect(() => {
    const img = new Image(); // Create new img element
    if (picdatanew.length !== 0) {
      img.src = picdatanew[picID].webformatURL;
      img.setAttribute("crossorigin", "anonymous");
      setCanvasSize({
        width: picdatanew[picID].webformatWidth,
        height: picdatanew[picID].webformatHeight,
      });
      setPicturedata(img);
      setWholedata([]);

      setTimeout(() => {
        contextRef.current.drawImage(
          img,
          0,
          0,
          picdatanew[picID].webformatWidth,
          picdatanew[picID].webformatHeight
        );
      }, 2000);
    }
  }, [picID, picdatanew]);

  // draw, set a starting point and an end point
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.strokeStyle = grafitiParam.Color;
    contextRef.current.lineWidth = grafitiParam.Width;
    contextRef.current.shadowBlur = 0;
    contextRef.current.lineCap = "round";
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    setStartpos([]);
    setLined([]);
    const LineColor = grafitiParam.Color;
    const LineWidth = grafitiParam.Width;
    const xy = [offsetX, offsetY, LineColor, LineWidth];

    setStartpos((previous) => [...previous, xy]);
  };

  // folow the cursor and draw
  let nn = 0;
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    nn = nn + 1;

    const fishX = { offsetX, offsetY };
    if (nn % 1 === 0) {
      setLined((gp) => [...gp, fishX]);
    }
  };

  //finish the drawing process and construct the data Array
  const finishDrawing = () => {
    const newStartStop = { movT: startpos, lineT: lined };
    //setStartstop(newStartStop);
    setWholedata((ln) => [...ln, newStartStop]);
    //contextRef.current.closePath()
    setIsDrawing(false);
  };

  // make the text more interesting
  //function generater(){
  useEffect(() => {
    if (toptext.length !== 0 && bottomtext.length !== 0) {
      contextRef.current.font =
        "bold " + textParam.fontSize + "px " + textParam.font;
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

      drawagainline();

      function drawagainline() {
        contextRef.current.shadowBlur = 0;
        var z;
        for (z = 0; z < wholedata.length; z++) {
          contextRef.current.lineWidth = wholedata[z].movT[0][3];
          contextRef.current.strokeStyle = wholedata[z].movT[0][2];
          contextRef.current.lineCap = "round";
          contextRef.current.beginPath();

          // const i = [];
          var i;
          contextRef.current.moveTo(
            wholedata[z].movT[0][0],
            wholedata[z].movT[0][1]
          );

          for (i = 0; i < wholedata[z].lineT.length; i++) {
            contextRef.current.lineTo(
              wholedata[z].lineT[i].offsetX,
              wholedata[z].lineT[i].offsetY
            );
            contextRef.current.stroke();
          }
        }
      }

      contextRef.current.shadowColor = textParam.blurColor;
      contextRef.current.shadowBlur = textParam.blurWidth;
      contextRef.current.fillStyle = "black";
      contextRef.current.fillText(
        toptext,
        starttop + 6,
        50 + 6,
        canvassize.width - 30
      );
      contextRef.current.fillText(
        bottomtext,
        startbottom + 6,
        canvassize.height - 44,
        canvassize.width - 30
      );
      contextRef.current.fillStyle = textParam.threeDColor;
      contextRef.current.fillText(
        toptext,
        starttop + 4,
        50 + 4,
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
        startbottom + 4,
        canvassize.height - 46,
        canvassize.width - 30
      );
      contextRef.current.fillText(
        bottomtext,
        startbottom + 2,
        canvassize.height - 48,
        canvassize.width - 30
      );
      contextRef.current.fillStyle = textParam.textColor;
      contextRef.current.fillText(toptext, starttop, 50, canvassize.width - 30);
      contextRef.current.fillText(
        bottomtext,
        startbottom,
        canvassize.height - 50,
        canvassize.width - 30
      );
    }
  }, [toptext, bottomtext, textParam]);

  useEffect(() => {
    if (quotenew.length !== 0) {
      retry();
    }

    function retry() {
      const lengt = quotenew.messages.personalized.length;
      const randomnum = Math.floor(Math.random() * lengt - 1);
      const singleq = quotenew.messages.personalized[randomnum];

      contextRef.current.font =
        "bold " + textParam.fontSize + "px " + textParam.font;
      const message = randomQuoteName + " " + singleq;
      const long = Math.floor(contextRef.current.measureText(message).width);
      const start = canvassize.width / 2 - long / 2;

      if (long < canvassize.width) {
        contextRef.current.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        contextRef.current.drawImage(picturedata, 0, 0);

        drawagain();
        function drawagain() {
          contextRef.current.shadowBlur = 0;

          if (wholedata.length !== 0) {
            var z;
            for (z = 0; z < wholedata.length; z++) {
              contextRef.current.lineWidth = wholedata[z].movT[0][3];
              contextRef.current.strokeStyle = wholedata[z].movT[0][2];
              contextRef.current.lineCap = "round";
              contextRef.current.beginPath();

              var i;
              contextRef.current.moveTo(
                wholedata[z].movT[0][0],
                wholedata[z].movT[0][1]
              );

              for (i = 0; i < wholedata[z].lineT.length; i++) {
                contextRef.current.lineTo(
                  wholedata[z].lineT[i].offsetX,
                  wholedata[z].lineT[i].offsetY
                );
              }
              contextRef.current.stroke();
            }
          }
        }

        contextRef.current.shadowColor = textParam.blurColor;
        contextRef.current.shadowBlur = textParam.blurWidth;
        contextRef.current.fillStyle = "black";
        contextRef.current.fillText(
          randomQuoteName + " " + singleq,
          start + 6,
          50 + 6,
          canvassize.width - 30
        );
        contextRef.current.fillStyle = textParam.threeDColor;
        contextRef.current.fillText(
          randomQuoteName + " " + singleq,
          start + 4,
          50 + 4,
          canvassize.width - 30
        );
        contextRef.current.fillText(
          randomQuoteName + " " + singleq,
          start + 2,
          50 + 2,
          canvassize.width - 30
        );

        contextRef.current.fillStyle = textParam.textColor;
        contextRef.current.fillText(
          randomQuoteName + " " + singleq,
          start,
          50,
          canvassize.width - 30
        );
      } else {
        retry();
      }
    }
  }, [pers]);

  function downloa(el) {
    var image = canvasRef.current.toDataURL("image/jpg");

    setMyImage(image);
  }

  return (
    <div>
      <div className={Styles.startcontainer}>
        <h4>Or, Generate A Random Quote ...</h4>
      </div>
      <div className={Styles.buttoncontainer}>
        <input
          type="text"
          placeholder="Enter *name* for quote"
          className={Styles.input}
          onChange={(e) => setRandomQuoteName(e.target.value)}
        />
        <button className={Styles.button} onClick={() => setPers(!pers)}>
          Generate
        </button>
      </div>

      <div className={Styles.container}>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          width={canvassize.width}
          height={canvassize.height}
          className={Styles.canvas}
        ></canvas>
      </div>

      <div className={Styles.buttoncontainer}>
        <a
          download="myimage.jpg"
          href={myImage}
          onClick={downloa}
          className={Styles.button}
        >
          Download
        </a>
      </div>
    </div>
  );
}

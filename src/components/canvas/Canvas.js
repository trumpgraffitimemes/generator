import React, { useRef, useEffect, useState, useContext } from "react";
import Styles from "./Canvas.module.css";
import { StateContext } from "../statecontext/stateContext";

export default function Canvas() {
  const { picdatanew, quotenew, picID, grafitiParam, textParam, textInput, setTextInput, pers, setPers, randomQuoteName, setMyImage } = useContext(
    StateContext
  );
  const contextRef = useRef(null);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvassize, setCanvasSize] = useState({ width: 800, height: 800 });

  //const [myImage, setMyImage] = useState();
  const [picturedata, setPicturedata] = useState();
  const [lined, setLined] = useState([]);
  const [wholedata, setWholedata] = useState([]);
  const [startpos, setStartpos] = useState([]);
  // const [randomQuoteName, setRandomQuoteName] = useState("Robert");
  // const [pers, setPers] = useState(false);
  const [singleQ, setSingleQ] = useState("")
  const [mouseTouch, setMouseTouch] = useState(true)



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
        var image = canvasRef.current.toDataURL("image/jpg");
        setMyImage(image);
      }, 2000);
    }
    
  }, [picID, picdatanew]);

  // draw, set a starting point and an end point
  const startDrawing = ({ nativeEvent }) => {
    
    contextRef.current.strokeStyle = grafitiParam.Color;
    contextRef.current.lineWidth = grafitiParam.Width;
    contextRef.current.shadowBlur = 0;
    contextRef.current.lineCap = "round";
    contextRef.current.beginPath();
    const LineColor = grafitiParam.Color;
    const LineWidth = grafitiParam.Width;
    setIsDrawing(true);
    setStartpos([]);
    setLined([]);
   

    if(mouseTouch){
      const { offsetX, offsetY } = nativeEvent;
      const xy = [offsetX, offsetY, LineColor, LineWidth] 
      contextRef.current.moveTo(xy[0], xy[1]);
      setStartpos(previous=>[...previous, xy])
    }

    else {
      const nn = nativeEvent.targetTouches[0]
      const xy = [nn.pageX-nn.target.offsetLeft, nn.pageY-nn.target.offsetTop, LineColor, LineWidth]
      contextRef.current.moveTo(xy[0], xy[1]);
      setStartpos(previous=>[...previous, xy])}
  };

  // folow the cursor and draw
  
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
  
    if(mouseTouch){
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    const fishX = { offsetX, offsetY };
    setLined((gp) => [...gp, fishX]);
    }
    
    else{
    const offsetX = nativeEvent.targetTouches[0].pageX-nativeEvent.targetTouches[0].target.offsetLeft
    const offsetY = nativeEvent.targetTouches[0].pageY-nativeEvent.targetTouches[0].target.offsetTop
    contextRef.current.lineTo(offsetX, offsetY);
    const fishX = {offsetX, offsetY};
    setLined(gp=>[...gp, fishX]);

    }
    
    
    
   
    contextRef.current.stroke();
    
    
      
    
  };

  //finish the drawing process and construct the data Array
  const finishDrawing = () => {
    const newStartStop = { movT: startpos, lineT: lined };
    setWholedata((ln) => [...ln, newStartStop]);
    setIsDrawing(false);
    var image = canvasRef.current.toDataURL("image/jpg");
    setMyImage(image);
  };

  
  //function generater(){
  useEffect(() => {
    if (textInput.toptext.length !== 0 || textInput.bottomtext.length !== 0) {
      contextRef.current.font =
        "bold " + textParam.fontSize + "px " + textParam.font;
      const longtop = Math.floor(contextRef.current.measureText(textInput.toptext).width);
      const starttop = canvassize.width / 2 - longtop / 2;
      const longbottom = Math.floor(
        contextRef.current.measureText(textInput.bottomtext).width
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
        textInput.toptext,
        starttop + 6,
        50 + 6,
        canvassize.width - 30
      );
      contextRef.current.fillText(
        textInput.bottomtext,
        startbottom + 6,
        canvassize.height - 44,
        canvassize.width - 30
      );
      contextRef.current.fillStyle = textParam.threeDColor;
      contextRef.current.fillText(
        textInput.toptext,
        starttop + 4,
        50 + 4,
        canvassize.width - 30
      );
      contextRef.current.fillText(
        textInput.toptext,
        starttop + 2,
        50 + 2,
        canvassize.width - 30
      );
      contextRef.current.fillText(
        textInput.bottomtext,
        startbottom + 4,
        canvassize.height - 46,
        canvassize.width - 30
      );
      contextRef.current.fillText(
        textInput.bottomtext,
        startbottom + 2,
        canvassize.height - 48,
        canvassize.width - 30
      );
      contextRef.current.fillStyle = textParam.textColor;
      contextRef.current.fillText(textInput.toptext, starttop, 50, canvassize.width - 30);
      contextRef.current.fillText(
        textInput.bottomtext,
        startbottom,
        canvassize.height - 50,
        canvassize.width - 30
      );
    }
    var image = canvasRef.current.toDataURL("image/jpg");
    setMyImage(image);
  }, [textInput, textParam]);

  useEffect(() => {
    if (quotenew.length !== 0) {
      retry();
    }
    
    function retry() {
      const lengt = quotenew.messages.personalized.length;
      const randomnum = Math.floor(Math.random() * lengt - 1);
      const singleq = quotenew.messages.personalized[randomnum];

      contextRef.current.font =
        "bold 50px " + textParam.font;
      const message = randomQuoteName + " " + singleq;
      const long = Math.floor(contextRef.current.measureText(message).width);
      contextRef.current.font =
        "bold " + textParam.fontSize + "px " + textParam.font;
    

      if (long < canvassize.width) {
        setSingleQ(singleq)
        drawforrandom(singleq)
        setPers(false)
        setTextInput({toptext: "", bottomtext: ""})
      } 
      else {
        retry();
        
      }
    }
  }, [pers]);

  useEffect(()=>{
    if(textInput.toptext.length===0&&textInput.bottomtext.length===0){
    contextRef.current.font="bold "+textParam.fontSize+"px "+ textParam.font;
    drawforrandom(singleQ);}
    
  }, [textInput, textParam])



  function drawforrandom(singleq){
    if(picturedata!==undefined||singleQ!==""){
     contextRef.current.font="bold "+textParam.fontSize+"px "+ textParam.font;
     const message= randomQuoteName + " " + singleq   
     const long = Math.floor(contextRef.current.measureText(message).width)
     const start = (canvassize.width/2)-(long/2)
     const starth = 50;
     contextRef.current.clearRect(0,0, canvasRef.current.width, canvasRef.current.height)
     contextRef.current.drawImage(picturedata, 0, 0)

     drawagain()
     function drawagain(){
     contextRef.current.shadowBlur=0
     contextRef.current.lineWidth = 10;
     if (wholedata.length!==0){
       console.log(wholedata.length)
     var z
     for(z=0; z<wholedata.length; z++){
     contextRef.current.lineWidth = wholedata[z].movT[0][3];
     contextRef.current.strokeStyle = wholedata[z].movT[0][2];
     contextRef.current.lineCap = "round"
  
     contextRef.current.beginPath();
     
     var i 
     contextRef.current.moveTo(wholedata[z].movT[0][0], wholedata[z].movT[0][1])

     for(i=0; i<wholedata[z].lineT.length; i++){
     contextRef.current.lineTo(wholedata[z].lineT[i].offsetX, wholedata[z].lineT[i].offsetY);
     
     }
     contextRef.current.stroke()  
   
     }}
     
   }
   contextRef.current.shadowColor= textParam.blurColor;
   contextRef.current.shadowBlur= textParam.blurWidth;
   contextRef.current.fillStyle = "black"
   contextRef.current.fillText(randomQuoteName + " " + singleq, start + 6, starth + 6 , canvassize.width - 30)
   contextRef.current.fillStyle = textParam.threeDColor
   contextRef.current.fillText(randomQuoteName + " " + singleq, start + 4, starth + 4 , canvassize.width - 30)
   contextRef.current.fillText(randomQuoteName + " " + singleq, start + 2, starth + 2 , canvassize.width - 30)
     
   contextRef.current.fillStyle = textParam.textColor
   contextRef.current.fillText(randomQuoteName + " " + singleq, start, starth, canvassize.width - 30)
  
   var image = canvasRef.current.toDataURL("image/jpg");
   setMyImage(image);
  }}

  function downloa(el) {
    var image = canvasRef.current.toDataURL("image/jpg");
    console.log("123")

    setMyImage(image);
  }

  return (
    <div>

      
      {/*<div className={Styles.startcontainer}>
        <h4>Or, Generate A Random Quote ...</h4>
      </div>
      <div className={Styles.buttoncontainer}>
        <input
          type="text"
          placeholder="Enter *name* for quote"
          className={Styles.input}
          onChange={(e) => setRandomQuoteName(e.target.value)}
        />
        <button className={Styles.button} onClick={() => setPers(true)}>
          Generate
        </button>
  </div>*/}



      <div className={Styles.container}>
        <canvas
          ref={canvasRef}
          onMouseDown={(e)=>{
            startDrawing(e);
            document.getElementsByTagName("body")[0].style="overflow: visible"
            setMouseTouch(true);}}
          onMouseUp={(e)=>{finishDrawing(e);
            document.getElementsByTagName("body")[0].style="overflow: visible"
            setMouseTouch(true)}}
          onMouseMove={(e)=>{draw(e);
            setMouseTouch(true)}}
          onTouchStart={(e)=>{startDrawing(e);
            document.getElementsByTagName("body")[0].style="overflow: hidden";
          setMouseTouch(false)}}
          onTouchEnd={(e)=>{finishDrawing(e);
            document.getElementsByTagName("body")[0].style="overflow: visible"
          setMouseTouch(false)}}
          onTouchMove={(e)=>{draw(e);
          setMouseTouch(false)}}
          width={canvassize.width}
          height={canvassize.height}
          className={Styles.canvas}
        ></canvas>
      </div>

      

    </div>
  );
}

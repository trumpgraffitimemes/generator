 import React, {useRef, useEffect, useState} from "react";
 import styles from "./Canvas.module.css";
 import PictureSource from "../picturesource/PictureSource"
 import Quote from "../quote/Quote"
 
 export default function Canvas() {
  const contextRef = useRef(null);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvassize, setCanvasSize] = useState({width: 800, height: 800});
  const [zz, setZz] = useState(0);
  const [pics, setPics] = useState();
  const [numberg, setNumberg] = useState(0);
  const [qstate, setQstate] = useState()
  //const [picturedata, setPicturedata] = useState();
  //const pictureload = []
  
  //set the basic canvas properties

    useEffect(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      contextRef.current = context;
    }, []);
  
    // function call for the first picture
    function picdata(memes){
      const img = new Image(); // Create new img element
      //const randomnumber=Math.floor(Math.random() * memes.length - 1)
      //console.log(memes[numberg].webformatWidth)
      img.src = memes[numberg].webformatURL;
      setCanvasSize({width: memes[numberg].webformatWidth, height: memes[numberg].webformatHeight})
      if(memes !==undefined){
      setTimeout(() => {    
        contextRef.current.drawImage(img, 0, 0, memes[numberg].webformatWidth, memes[numberg].webformatHeight);
        setPics(memes);
      }, 300);}

    }

    //show the next picture when numberg changes
    useEffect(() => {
      contextRef.current.restore();
      const img = new Image(); // Create new img element
      //console.log(numberg)
     
      if(pics !==undefined){

       img.src = pics[numberg].webformatURL;
      setCanvasSize({width: pics[numberg].webformatWidth, height: pics[numberg].webformatHeight})
      setTimeout(() => {    
        contextRef.current.drawImage(img, 0, 0, pics[numberg].webformatWidth, pics[numberg].webformatHeight);
      }, 300);}
    }, [numberg])

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
    // need to control process if quote is too wide for canvas - probably should filter first to only make fitting quotes available
    // if 2 canvases how to add them together when extracting data

    function quotep(pers){
      //setQstate(contextRef.current)
      contextRef.current.font="bold 30px Arial";
      const message= "Robert" + pers    
      const long = Math.floor(contextRef.current.measureText(message).width)
      const start = (canvassize.width/2)-(long/2)-10
      
      if(long < canvassize.width ){
      //const height = Math.floor(contextRef.current.measureText(message).height)
      //var rectangle = new Path2D();
      //contextRef.current.fillStyle = "White"
      //contextRef.current.fillRect(start, 15, (long+10), 45); 
      //contextRef.current.save();
      contextRef.current.shadowColor="black";
      contextRef.current.shadowBlur=10;
      contextRef.current.fillStyle = "black"
      contextRef.current.fillText("Robert " + pers, start + 1, 50 + 1 , canvassize.width - 30)
      contextRef.current.fillText("Robert " + pers, start + 2, 50 + 2 , canvassize.width - 30)
      contextRef.current.fillStyle = "pink"
      contextRef.current.fillText("Robert " + pers, start, 50, canvassize.width - 30)
      
      
      
      ;}
      //else{quotep()}
  }
      
    //navigate up and down the pictures
    function handleUp(){
      const long = pics.length-1;
      
    if (zz === long) {
      setNumberg(0);
      setZz(0)
    } else {
      setNumberg(zz);
      setZz(zz + 1);
    }}

    function handleDown(){
      const long = pics.length-1;
    if (zz === 0) {
      setNumberg(long);
      setZz(long)
    } else {
      setNumberg(zz);
      setZz(zz - 1);
    }}

   return (
     <div>
      <PictureSource picdata={picdata}/>
      <Quote quotep={quotep}/>
      <div className={styles.Container}>
         <button onClick={handleUp} className={styles.button}>Up</button>
         <div>
          <canvas 
            ref={canvasRef} 
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            width={canvassize.width} height={canvassize.height}></canvas>
        </div>
        <button onClick={handleDown} className={styles.button}>Down</button>
      </div>
    </div>
   );
 }
 
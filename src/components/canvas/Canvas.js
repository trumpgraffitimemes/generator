
 import React, {useRef, useEffect, useState, useContext} from "react";
 import Styles from "./Canvas.module.css";
 //import PictureSource from "../picturesource/PictureSource"
 //import Quote from "../quote/Quote"
 import { StateContext } from "../statecontext/stateContext";
 
 export default function Canvas({toptext, bottomtext}) {
  const {picdatanew, quotenew, picID, colorList, grafitiColor, textParam} = useContext(StateContext)
  const contextRef = useRef(null);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvassize, setCanvasSize] = useState({width: 800, height: 800});
 
  const [myImage, setMyImage]=useState()
  const [picturedata, setPicturedata] = useState();
  const [lined, setLined] = useState([]);
  const [startstop, setStartstop] = useState({});
  const [wholedata, setWholedata] = useState([]);
  const [startpos, setStartpos] = useState([]);
  const [randomQuoteName, setRandomQuoteName] = useState("Robert")
  const [pers, setPers]= useState(false)

  //set the basic canvas properties
  

    useEffect(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      contextRef.current = context;
      contextRef.current.font="bold 20px Roman";
    }, []);
  

    //show the selected picture
    useEffect(() => {
      const img = new Image(); // Create new img element
      if(picdatanew.length !==0){

       img.src = picdatanew[picID].webformatURL;
       img.setAttribute("crossorigin", "anonymous")
      setCanvasSize({width: picdatanew[picID].webformatWidth, height: picdatanew[picID].webformatHeight})
      setPicturedata(img)
      setWholedata([])
     
      setTimeout(() => {    
        contextRef.current.drawImage(img, 0, 0, picdatanew[picID].webformatWidth, picdatanew[picID].webformatHeight);
         console.log(wholedata)
      }, 2000);
      
    }
    }, [picID, picdatanew])

  
    // draw, set a starting point and an end point
    const startDrawing = ({ nativeEvent }) => {
     
      const { offsetX, offsetY } = nativeEvent;
      contextRef.current.strokeStyle = colorList[grafitiColor]
      contextRef.current.lineWidth = 10;
      contextRef.current.shadowBlur=0;
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      setIsDrawing(true);
      setStartpos(pre=>[...pre, [offsetX, offsetY]])
    };
    

    // folow the cursor and draw
    let nn=0
    const draw = ({ nativeEvent }) => {
      if (!isDrawing) {
        return;
      }
      const { offsetX, offsetY } = nativeEvent;
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
      nn=nn+1
     
      const fishX = {offsetX, offsetY};
      if(nn%5 === 0){
      setLined(gp=>[...gp, fishX]);}
    };

    //finish the drawing process and construct the data Array
    const finishDrawing = () => {
      const newStartStop = {movT: startpos, lineT: lined};
      setStartstop(newStartStop)
      setWholedata(ln=>[...ln, newStartStop])
      //contextRef.current.closePath()
      setIsDrawing(false);
    };
    //console.log(wholedata)
    // make the text more interesting
    //function generater(){
    useEffect(()=>{  
    if (toptext.length !== 0 && bottomtext.length !== 0) {
      
      
      contextRef.current.font="italic "+textParam.fontSize+"px "+textParam.font
      const longtop = Math.floor(contextRef.current.measureText(toptext).width)
      const starttop = (canvassize.width/2)-(longtop/2)
      const longbottom = Math.floor(contextRef.current.measureText(bottomtext).width)
      const startbottom = (canvassize.width/2)-(longbottom/2)

      contextRef.current.clearRect(0,0, canvasRef.current.width, canvasRef.current.height);
      contextRef.current.drawImage(picturedata, 0, 0);
      
      let n = 0
      drawagain()
      function drawagain(){
      var z
      for(z=n; z<wholedata.length; z++){
      //const dog = wholedata[z]
      
      if (wholedata.length!==0){
      var i 
      contextRef.current.moveTo(wholedata[z].movT[0].offsetX, wholedata[z].movT[0].offsetY)
      for(i=0; i<wholedata[z].lineT.length; i++){
      contextRef.current.lineTo(wholedata[z].lineT[i].offsetX, wholedata[z].lineT[i].offsetY);
      contextRef.current.stroke()
      }}else{
        n=n+1;
        drawagain();}
    }}
      //console.log(textParam)

      contextRef.current.shadowColor= textParam.blurColor;
      contextRef.current.shadowBlur= textParam.blurWidth;
      contextRef.current.fillStyle = "black"
      contextRef.current.fillText(toptext, starttop + 6, 50 + 6, canvassize.width - 30)
      contextRef.current.fillText(bottomtext, startbottom + 6, canvassize.height-44 , canvassize.width - 30)
      contextRef.current.fillStyle = textParam.threeDColor
      contextRef.current.fillText(toptext, starttop + 4, 50 + 4 , canvassize.width - 30)
      contextRef.current.fillText(toptext, starttop + 2, 50 + 2 , canvassize.width - 30)
      contextRef.current.fillText(bottomtext, startbottom + 4, canvassize.height-46 , canvassize.width - 30)
      contextRef.current.fillText(bottomtext, startbottom + 2, canvassize.height-48 , canvassize.width - 30)
      contextRef.current.fillStyle = textParam.textColor
      contextRef.current.fillText(toptext, starttop, 50, canvassize.width - 30)
      contextRef.current.fillText(bottomtext, startbottom, canvassize.height-50, canvassize.width - 30)
     }
   }, [toptext, bottomtext, textParam])
    
  
    //function quotep(pers){
    useEffect(()=>{
      if(quotenew.length!==0)
        {retry()}
      
      function retry(){
      //console.log(quotenew)
      const lengt = quotenew.messages.personalized.length
      const randomnum=Math.floor(Math.random()*lengt-1)
      const singleq = quotenew.messages.personalized[randomnum]
      
      contextRef.current.font="bold "+textParam.fontSize+"px "+ textParam.font;
      const message= randomQuoteName + " " + singleq    
      const long = Math.floor(contextRef.current.measureText(message).width)
      const start = (canvassize.width/2)-(long/2)
      



      if(long < canvassize.width ){
      // const height = Math.floor(contextRef.current.measureText(message).height)
      // var rectangle = new Path2D();
      // contextRef.current.fillStyle = "White"
      // contextRef.current.fillRect(start, 15, (long+10), 45); 
      // contextRef.current.save();
      
      
      
      contextRef.current.clearRect(0,0, canvasRef.current.width, canvasRef.current.height)
      contextRef.current.drawImage(picturedata, 0, 0)

      let n = 0
        drawagain()
        function drawagain(){
        var z
        for(z=n; z<wholedata.length; z++){
        //const dog = wholedata[z]
      
        if (wholedata.length!==0){
        var i 
        contextRef.current.moveTo(wholedata[z].movT[0].offsetX, wholedata[z].movT[0].offsetY)
        //console.log(z)
        for(i=0; i<wholedata[z].lineT.length; i++){
        contextRef.current.lineTo(wholedata[z].lineT[i].offsetX, wholedata[z].lineT[i].offsetY);
        
        contextRef.current.stroke()
        }}else{
          n=n+1;
          drawagain();}
        //contextRef.current.fillStyle = "blue";
      }}
      





      contextRef.current.shadowColor= textParam.blurColor;
      contextRef.current.shadowBlur= textParam.blurWidth;
      contextRef.current.fillStyle = "black"
      contextRef.current.fillText(randomQuoteName + " " + singleq, start + 6, 50 + 6 , canvassize.width - 30)
      contextRef.current.fillStyle = textParam.threeDColor
      contextRef.current.fillText(randomQuoteName + " " + singleq, start + 4, 50 + 4 , canvassize.width - 30)
      contextRef.current.fillText(randomQuoteName + " " + singleq, start + 2, 50 + 2 , canvassize.width - 30)
        
      contextRef.current.fillStyle = textParam.textColor
      contextRef.current.fillText(randomQuoteName + " " + singleq, start, 50, canvassize.width - 30)
     
      ;} 
      //else if(long > canvassize.width ){};
      else{ retry()}
    }
  }, [pers] )
      

    function downloa(el){
      var image = canvasRef.current.toDataURL("image/jpg")
      //const fish = contextRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height).data;
      //console.log(fish)
      setMyImage(image)
    }

    /*function handleClick(){ 
      setTimeout(()=>{
          quotep(quotenew.messages.personalized)
      }, 100)}     */

//<PictureSource picdata={picdata}/><Quote quotep={quotep}/>
//<button className={styles.button}>Generate</button>
   return (
     <div>     
      
      <div className={Styles.buttoncontainer}>
        <a download="myimage.jpg" href={myImage} onClick={downloa} className={Styles.button}>DOWNLOAD TO myImage</a>
        <button className={Styles.button} onClick={()=>setPers(!pers)}>Random Quote</button>   
        <input type="text" placeholder="name" className={Styles.input} onChange={(e)=>setRandomQuoteName(e.target.value)}/>
      </div>
      
      <div className={Styles.container}>
         <div>
          <canvas 
            ref={canvasRef} 
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            width={canvassize.width} height={canvassize.height}
            className={Styles.canvas}
            ></canvas>
        </div>
      </div>
       
    </div>
   );
 }
 


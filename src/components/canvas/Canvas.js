
 import React, {useRef, useEffect, useState, useContext} from "react";
 import Styles from "./Canvas.module.css";
 //import PictureSource from "../picturesource/PictureSource"
 //import Quote from "../quote/Quote"
 import { StateContext } from "../statecontext/stateContext";
 
 export default function Canvas({toptext, bottomtext}) {
  const {picdatanew, quotenew, picID, grafitiParam, textParam, tabIndex, icons, iconID} = useContext(StateContext)
  const contextRef = useRef(null);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvassize, setCanvasSize] = useState({width: 800, height: 800});
  const [myImage, setMyImage]=useState()
  const [picturedata, setPicturedata] = useState();
  const [lined, setLined] = useState([]);
  //const [startstop, setStartstop] = useState({});
  const [wholedata, setWholedata] = useState([]);
  const [startpos, setStartpos] = useState([]);
  const [randomQuoteName, setRandomQuoteName] = useState("Robert")
  const [pers, setPers]= useState(false)
  const [offSet, setOffSet] = useState({posoffsetx: 0, posoffsety: 0})
  const [textPos, setTextPos] = useState({bleft: 50 , bdown: 50, width: 100, height: 50 })
  const [drag, setDrag] = useState(false)
  const [singleQ, setSingleQ] = useState("")

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
      //setStartstop([])
      setWholedata([])
     
      setTimeout(() => {    
        contextRef.current.drawImage(img, 0, 0, picdatanew[picID].webformatWidth, picdatanew[picID].webformatHeight);
         //console.log(wholedata)
      }, 2000);
      
    }
    }, [picID, picdatanew])

  
    // draw, set a starting point and an end point

    
    const startDrawing = ({ nativeEvent }) => {
    if (tabIndex===2){
      //console.log(nativeEvent.touches[0])

      const { offsetX, offsetY } = nativeEvent;
      contextRef.current.strokeStyle = grafitiParam.Color
      contextRef.current.lineWidth = grafitiParam.Width
      contextRef.current.shadowBlur=0;
      contextRef.current.lineCap = "round"
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      //contextRef.current.moveTo(nativeEvent.touches[0].clientX-nativeEvent.touches[0].target.offsetLeft, nativeEvent.touches[0].clientY-nativeEvent.touches[0].target.offsetHeight);
      setIsDrawing(true);
      setStartpos([])
      setLined([])
      const LineColor = grafitiParam.Color
      const LineWidth = grafitiParam.Width
      const xy = [offsetX, offsetY, LineColor, LineWidth]
      //const xy = [nativeEvent.touches[0].clientX-nativeEvent.touches[0].target.offsetLeft, nativeEvent.touches[0].clientY-nativeEvent.touches[0].target.offsetHeigth, LineColor, LineWidth]
      setStartpos(pre=>[...pre, xy])}
      else if (tabIndex===3) {
        const imgicon = new Image(); // Create new img element
      if(picdatanew.length !==0){

       imgicon.src = icons[iconID].previewURL;
       imgicon.setAttribute("crossorigin", "anonymous")
      //setCanvasSize({width: picdatanew[picID].webformatWidth, height: picdatanew[picID].webformatHeight})
      //setPicturedata(img)
      //setStartstop([])
      //setWholedata([])
     
      setTimeout(() => {    
        contextRef.current.drawImage(imgicon, nativeEvent.offsetX-35, nativeEvent.offsetY-35, 70, 70);
         //console.log(wholedata)
      }, 300);
      }}

      else{
        if ((textPos.bleft+textPos.width+offSet.posoffsetx)>nativeEvent.offsetX&&nativeEvent.offsetX>textPos.bleft+offSet.posoffsetx
        &&(textPos.bdown-textPos.height+offSet.posoffsety)<nativeEvent.offsetY&&nativeEvent.offsetY<textPos.bdown+offSet.posoffsety)
       {
        setOffSet({...offSet, posoffsetx: nativeEvent.offsetX-textPos.bleft, posoffsety: nativeEvent.offsetY-textPos.bdown})
        setDrag(true)}}
    };
    

    // folow the cursor and draw
    let nn=0
    const draw = ({ nativeEvent }) => {  
      if (tabIndex===2){
      if (!isDrawing) {
        return;
      }
      const { offsetX, offsetY } = nativeEvent;
      contextRef.current.lineTo(offsetX, offsetY);

      //contextRef.current.lineTo(nativeEvent.touches[0].clientX-nativeEvent.touches[0].target.offsetLeft, nativeEvent.touches[0].pageY-nativeEvent.touches[0].clientY);
      contextRef.current.stroke();
      nn=nn+1
      
      const fishX = {offsetX, offsetY};
      //const fishX = {nativeEvent.touches[0].clientX-nativeEvent.touches[0].target.offsetLeft, offsetY};
      if(nn%1 === 0){
      setLined(gp=>[...gp, fishX]);}
    } else{
      if(drag){
        nn=nn+1
       
        if(nn%5 === 0){ 
          //console.log(offSet)
          //console.log(textPos)
          setOffSet({...offSet, posoffsetx: nativeEvent.offsetX-textPos.bleft, posoffsety: nativeEvent.offsetY-textPos.bdown})}
    
    }
      //console.log(, )
     



    }}

    //finish the drawing process and construct the data Array
    const finishDrawing = () => {
      if (tabIndex===2){
      const newStartStop = {movT: startpos, lineT: lined};
      //setStartstop(newStartStop)
      setWholedata(ln=>[...ln, newStartStop])
      //contextRef.current.closePath()
      setIsDrawing(false);
    }  else{
      setDrag(false)
    } }
  
  

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
      
      //console.log(textParam)
      drawagain()
        function drawagain(){
        contextRef.current.shadowBlur=0
        
        if (wholedata.length!==0){
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
      //if(!drag){
      const randomnum=Math.floor(Math.random()*lengt-1)
      //setRand(randomnum)
      setOffSet({posoffsetx: 0, posoffsety: 0})
    //}
      const singleq = quotenew.messages.personalized[randomnum]
      contextRef.current.font="italic "+textParam.fontSize+"px "+ textParam.font;
      const message= randomQuoteName + " " + singleq    
      const long = Math.floor(contextRef.current.measureText(message).width)
      const start = (canvassize.width/2)-(long/2)
      const starth = 50;
      setSingleQ(singleq)
      



      if(long < canvassize.width ){
      // const height = Math.floor(contextRef.current.measureText(message).height)
      // var rectangle = new Path2D();
      // contextRef.current.fillStyle = "White"
      // contextRef.current.fillRect(start, 15, (long+10), 45); 
      // contextRef.current.save();
      
      
      
      contextRef.current.clearRect(0,0, canvasRef.current.width, canvasRef.current.height)
      contextRef.current.drawImage(picturedata, 0, 0)
        console.log(wholedata)
        drawagain()
        function drawagain(){
        contextRef.current.shadowBlur=0
        contextRef.current.lineWidth = 10;
        if (wholedata.length!==0){
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
      contextRef.current.fillText(randomQuoteName + " " + singleq, start+offSet.posoffsetx + 6, starth+offSet.posoffsety + 6 , canvassize.width - 30)
      contextRef.current.fillStyle = textParam.threeDColor
      contextRef.current.fillText(randomQuoteName + " " + singleq, start+offSet.posoffsetx + 4, starth+offSet.posoffsety + 4 , canvassize.width - 30)
      contextRef.current.fillText(randomQuoteName + " " + singleq, start+offSet.posoffsetx + 2, starth+offSet.posoffsety + 2 , canvassize.width - 30)
        
      contextRef.current.fillStyle = textParam.textColor
      contextRef.current.fillText(randomQuoteName + " " + singleq, start+offSet.posoffsetx, starth+offSet.posoffsety, canvassize.width - 30)
      setTextPos({...textPos, bleft: start, bdown: starth, width: long, height: textParam.fontSize })
     
      ;} 
      //else if(long > canvassize.width ){};
      else{ retry()}
    }
  }, [pers] )


  useEffect(()=>{
    if(drag){
    contextRef.current.font="italic "+textParam.fontSize+"px "+ textParam.font;
    contextRef.current.clearRect(0,0, canvasRef.current.width, canvasRef.current.height);
    //console.log(offSet)
    contextRef.current.drawImage(picturedata, 0, 0);
      
    drawagain()
    function drawagain(){
    contextRef.current.shadowBlur=0
    contextRef.current.lineWidth = 10;
    if (wholedata.length!==0){
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
    contextRef.current.fillText(randomQuoteName + " " + singleQ,textPos.bleft+offSet.posoffsetx + 6, textPos.bdown+offSet.posoffsety + 6 , canvassize.width - 30)
    contextRef.current.fillStyle = textParam.threeDColor
    contextRef.current.fillText(randomQuoteName + " " + singleQ, textPos.bleft+offSet.posoffsetx + 4, textPos.bdown+offSet.posoffsety + 4 , canvassize.width - 30)
    contextRef.current.fillText(randomQuoteName + " " + singleQ, textPos.bleft+offSet.posoffsetx + 2, textPos.bdown+offSet.posoffsety + 2 , canvassize.width - 30)
      
    contextRef.current.fillStyle = textParam.textColor
    contextRef.current.fillText(randomQuoteName + " " + singleQ, textPos.bleft+offSet.posoffsetx, textPos.bdown+offSet.posoffsety, canvassize.width - 30)}
  }, [offSet])

  //posoffsetx: 0, posoffsety: 0

    function downloa(){
      var image = canvasRef.current.toDataURL("image/jpg")
      setMyImage(image)
    }

   /* function copyToClipboard() {
      
      canvasRef.current.copyImg()
      document.execCommand("copy")
     
    }
     {
       
       document.queryCommandSupported('copy') &&
        <div>
          <button onClick={copyToClipboard}>Copy</button> 
        </div>
      }*/





   return (
     <div>     
     
      <div className={Styles.buttoncontainer}>
        <a download="myimage.jpg" href={myImage} onClick={downloa} className={Styles.button}>DOWNLOAD TO myImage</a>
        <button className={Styles.button}  onClick={()=>setPers(!pers)}>Random Quote</button>   
        <input type="text" placeholder="name" className={Styles.input} onChange={(e)=>setRandomQuoteName(e.target.value)}/>
      </div>
      
      <div className={Styles.container}>
         <div>
          <canvas 
            id="canvas"
            ref={canvasRef} 
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            onTouchStart={startDrawing}
            onTouchEnd={finishDrawing}
            onTouchMove={draw}
            width={canvassize.width} height={canvassize.height}
            className={Styles.canvas}
            ></canvas>
        </div>
      </div>
       
    </div>
   );
 }
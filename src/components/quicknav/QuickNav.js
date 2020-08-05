//import React from "react";
import React, { useState, useContext} from "react";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import QuickListData from "../../data/QuickListData";
import "react-tabs/style/react-tabs.css";
import { StateContext } from "../statecontext/stateContext";


//class HideAndShowDivOnClick extends React.Component {
function HideAndShowDivOnClick(){
  // constructor(props) {
  //   super(props);
  //   this.state = {date: new Date()};
  // }
  const [showDiv, setShowDiv] = useState(false);
  
  const {picdatanew} = useContext(StateContext)
  
  console.log(picdatanew) 
  
  // var inner = postDetails.map(function(e) {
  //   return e.autor;
  // });
  

  // const parsed = JSON.parse({picdatanew})
  // console.log(parsed[0])


  // console.log(picdatanew)

  //onButtonPress = (event) => {
    //const id = event.target.innerHTML;
    //const quickItem = this.props.initInput.current;
    //quickItem.value = id;
    // this.props.initInput.current.focus();
  //};

  
  //render() {
  
    // const { showDiv } = this.state;

    

    return (
      <div className="quicklist-container">
        {showDiv && (
          <p>test</p>
          
        
          // map over an array to access context data
          // https://stackoverflow.com/questions/58459756/how-do-i-update-an-array-using-the-usecontext-hook

          
          // <img src={picdatanew[0].previewURL} />
          
          
          // // spread operator
          // let new_array = arr.map(function callback( currentValue[, index[, array]]) {
          //   // return element for new_array
          // }[, thisArg])
        
          // var memberWithDesignation = members.map(member => ({
          //   ...member,
          //   designation: 'Singer'
          // }));
          // console.log(memberWithDesignation[0].designation); // Will output Singer

          // const myString = 'hello';

          // const array = [...myString] // [ 'h', 'e', 'l', 'l', 'o' ]


          // import { MusicPlayerContext } from "./MusicPlayerContext";
          // const TrackList = () => {
          //   const [state, setState] = useContext(MusicPlayerContext);
          //   return (
          //     <>
          //       {state.tracks.map(track => (
          //         <div className="box">
          //           <div className="song-title">
          //             {track.name}
          //           </div>
          //         </div>
          //       ))}
          //     </>
          //   )
          // }
          // export default TrackList








          // picdatanew.current
          
          // <Tabs>
          //   <TabList>
          //     {Object.keys(QuickListData).map((v, i) => (
          //       <Tab key={i}>{v}</Tab>
          //     ))}
          //   </TabList>
          //   {Object.keys(QuickListData).map((v, index) => (
          //     <TabPanel key={index}>
          //       <ul className="quicklist-content">
          //         {QuickListData[v].map((item, itemIndex) => (
          //           <li className="quicklist-item" key={itemIndex}>
          //             <button
          //               className="quicklist-item-btn"
          //               onClick={this.onButtonPress}
          //             >
          //               {item}
          //             </button>
          //           </li>
          //         ))}
          //       </ul>
          //     </TabPanel>
          //   ))}
          // </Tabs>
        )}

        <button
          className="quicklist-btn"
          onClick={() => setShowDiv(!showDiv)}
        >
          {showDiv ? "Hide" : "Quicklist"}
        </button>
      </div>
    );
  // }
}

export default HideAndShowDivOnClick;

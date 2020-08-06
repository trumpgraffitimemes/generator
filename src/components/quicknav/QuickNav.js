import React, { useState, useContext, useEffect } from "react";
import "react-tabs/style/react-tabs.css";
import { StateContext } from "../statecontext/stateContext";

export default function QuickNav({ picid }) {
  const [showDiv, setShowDiv] = useState(false);
  const { picdatanew } = useContext(StateContext);

  // console.log();
  return (
    <div className="quicklist-container">
      {picdatanew &&
        showDiv &&
        picdatanew.map((x, i) => (
          <img
            className="selectImage"
            type="image"
            src={x.previewURL}
            id={i}
            key={i}
            width="50px"
            height="50px"
            onClick={(e) => {
              picid(e.target.id);
            }}
          />
        ))}
      <br />
      <button className="quicklist-btn" onClick={() => setShowDiv(!showDiv)}>
        {showDiv ? "Hide" : "Quicklist"}
      </button>
    </div>
  );
}

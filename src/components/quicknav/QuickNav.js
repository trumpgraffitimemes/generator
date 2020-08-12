import React, { useContext, useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { StateContext } from "../statecontext/stateContext";
import Styles from "./QuickNav.module.css";
import "react-tabs/style/react-tabs.css";

function HideAndShowDivOnClick() {
  const {
    picdatanew,
    setPicID,
    grafitiParam,
    setGrafitiParam,
    textParam,
    setTextParam,
    myImage,
  } = useContext(StateContext);
  const [showDiv, setShowDiv] = useState(false);
  const [chips, setChips] = useState();

  function getInfo(e) {
    setPicID(e.target.id);
  }

  useEffect(() => {
    if (picdatanew !== undefined) {
      setChips(
        picdatanew.map((v, i) => (
          <img
            key={i}
            id={i}
            onClick={getInfo}
            type="image"
            src={v.previewURL}
            alt="choice image"
            className={Styles.quicklistPic}
          />
        ))
      );
    }
  }, [picdatanew]);

  return (
    <div className={Styles.quicklistContainer}>
      <button
        className={Styles.quicklistBtn}
        onClick={() => setShowDiv(!showDiv)}
      >
        {showDiv ? "Hide" : "Customize"}
      </button>
      <a download="meme.jpg" href={myImage}>
        <button className={Styles.downloadBtn}>Download</button>
      </a>

      {showDiv && (
        <Tabs className={Styles.tabs}>
          <TabList>
            <Tab>Donald</Tab>
            <Tab>Text</Tab>
            <Tab>Font</Tab>
            <Tab>Graffiti</Tab>
          </TabList>

          <TabPanel>
            {/* <ul className="quicklist-content">{chips}</ul> */}
            <ul className={Styles.quicklistContent}>{chips}</ul>
          </TabPanel>
          <TabPanel>
            <div className={Styles.container}>
              <div className={Styles.boxes}>
                <input
                  className={Styles.inputs}
                  type="color"
                  value={textParam.textColor}
                  onChange={(e) =>
                    setTextParam({ ...textParam, textColor: e.target.value })
                  }
                />
                <label>TEXT COLOR</label>
              </div>
              <div className={Styles.boxes}>
                <input
                  type="color"
                  className={Styles.inputs}
                  value={textParam.blurColor}
                  onChange={(e) =>
                    setTextParam({ ...textParam, blurColor: e.target.value })
                  }
                />
                <label>BLUR COLOR</label>
              </div>
              <div className={Styles.boxes}>
                <input
                  type="color"
                  className={Styles.inputs}
                  value={textParam.threeDColor}
                  onChange={(e) =>
                    setTextParam({ ...textParam, threeDColor: e.target.value })
                  }
                />
                <label>3D COLOR</label>
              </div>

              <div className={Styles.boxes}>
                <input
                  type="range"
                  className={Styles.inputs}
                  value={textParam.fontSize}
                  onChange={(e) =>
                    setTextParam({ ...textParam, fontSize: e.target.value })
                  }
                  min="10"
                  max="50"
                />
                <label>FONT SIZE: {textParam.fontSize}px</label>
              </div>
              <div className={Styles.boxes}>
                <input
                  type="range"
                  className={Styles.inputs}
                  value={textParam.blurWidth}
                  onChange={(e) =>
                    setTextParam({ ...textParam, blurWidth: e.target.value })
                  }
                  min="0"
                  max="40"
                />
                <label>BLUR WIDTH: {textParam.blurWidth}</label>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className={Styles.fontContainer}>
              {/*<p
                className={Styles.listactive}
                  onClick={() => {
                    hideFontList === Styles.hide
                      ? setHideFontList(Styles.list)
                      : setHideFontList(Styles.hide);
                  }}
                >
                  Font Choice
                </p>*/}
              {/* <ul className={Styles.list}>
                  <li> */}
              <div className={Styles.wrapper1}>
                <p
                  className={Styles.psize}
                  onClick={() =>
                    setTextParam({ ...textParam, font: "Indie Flower" })
                  }
                  className={Styles.indieFlower}
                >
                  Indie Flower
                </p>
                <p
                  className={Styles.psize}
                  onClick={() =>
                    setTextParam({ ...textParam, font: "Kaushan Script" })
                  }
                  className={Styles.kaushanScript}
                >
                  Kaushan Script
                </p>
                <p
                  className={Styles.psize}
                  onClick={() =>
                    setTextParam({ ...textParam, font: "Pacifico" })
                  }
                  className={Styles.pacifico}
                >
                  Pacifico
                </p>
              </div>

              <div className={Styles.wrapper2}>
                <p
                  onClick={() => setTextParam({ ...textParam, font: "VT323" })}
                  className={Styles.vt323}
                >
                  VT323
                </p>
                <p
                  onClick={() =>
                    setTextParam({ ...textParam, font: "Wallpoet" })
                  }
                  className={Styles.wallpoet}
                >
                  Wallpoet
                </p>
                <p
                  onClick={() =>
                    setTextParam({ ...textParam, font: "Bebas Neue" })
                  }
                  className={Styles.bebasNeue}
                >
                  Bebas Neue
                </p>
              </div>
              <div className={Styles.wrapper3}>
                <p
                  onClick={() =>
                    setTextParam({ ...textParam, font: "Monoton" })
                  }
                  className={Styles.monoton}
                >
                  Monoton
                </p>
                <p
                  onClick={() =>
                    setTextParam({ ...textParam, font: "Bangers" })
                  }
                  className={Styles.bangers}
                >
                  Bangers
                </p>
                <p
                  onClick={() => setTextParam({ ...textParam, font: "Piedra" })}
                  className={Styles.piedra}
                >
                  Piedra
                </p>
              </div>
              <div className={Styles.wrapper4}>
                <p
                  onClick={() =>
                    setTextParam({
                      ...textParam,
                      font: "Fredericka the Great",
                    })
                  }
                  className={Styles.frederickaTheGreat}
                >
                  Fredericka the Great
                </p>
                <p
                  onClick={() =>
                    setTextParam({ ...textParam, font: "Homemade Apple" })
                  }
                  className={Styles.homemadeApple}
                >
                  Homemade Apple
                </p>
                <p
                  onClick={() =>
                    setTextParam({ ...textParam, font: "Vast Shadow" })
                  }
                  className={Styles.vastShadow}
                >
                  {" "}
                  Vast Shadow
                </p>
              </div>
              {/* </ul> */}
            </div>
          </TabPanel>
          <TabPanel>
            <div className={Styles.container}>
              <div className={Styles.boxes}>
                <input
                  type="color"
                  className={Styles.inputs}
                  value={grafitiParam.Color}
                  onChange={(e) =>
                    setGrafitiParam({ ...grafitiParam, Color: e.target.value })
                  }
                />
                <label>Grafiti COLOR</label>
              </div>
              <div className={Styles.boxes}>
                <input
                  type="range"
                  className={Styles.inputs}
                  value={grafitiParam.Width}
                  onChange={(e) =>
                    setGrafitiParam({ ...grafitiParam, Width: e.target.value })
                  }
                  min="1"
                  max="40"
                />
                <label>Grafiti WIDTH: {grafitiParam.Width}</label>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      )}
    </div>
  );
}

export default HideAndShowDivOnClick;

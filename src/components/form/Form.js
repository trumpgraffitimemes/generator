import React, { useContext } from "react";
import Styles from "./Form.module.css";
import { StateContext } from "../statecontext/stateContext";

export default function Form() {
  const {
    textInput,
    setTextInput,
    pers,
    setPers,
    setRandomQuoteName,
  } = useContext(StateContext);

  return (
    <div>
      <form className={Styles.forminp}>
        <h4>Great memes start with funny text!</h4>
        <input
          className={Styles.inputinp}
          type="text"
          name="topText"
          placeholder="Enter your"
          onChange={(e) =>
            setTextInput({ ...textInput, toptext: e.target.value })
          }
        />
        <input
          className={Styles.inputinp}
          type="text"
          name="bottomText"
          placeholder="Text here"
          onChange={(e) =>
            setTextInput({ ...textInput, bottomtext: e.target.value })
          }
        />
      </form>
      <div>
        <h4>or.. add a random quote</h4>
        <input
          type="text"
          placeholder="Enter *name* for quote here"
          className={Styles.inputinp}
          onChange={(e) => setRandomQuoteName(e.target.value)}
        />
        <button
          onClick={() => {
            setPers(!pers);
          }}
        >
          Generate
        </button>
        <p>
          (Pssst... Don't forget to{" "}
          <span className={Styles.graffitiText}>GRAFFITI</span> Donald!)
        </p>
      </div>
    </div>
  );
}

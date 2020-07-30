import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import QuickListData from "../../data/QuickListData";
import "react-tabs/style/react-tabs.css";

class HideAndShowDivOnClick extends React.Component {
  state = {
    showDiv: false,
  };

  onButtonPress = (event) => {
    const id = event.target.innerHTML;
    const quickItem = this.props.createInput.current;
    quickItem.value = id;
    this.props.createInput.current.focus();
  };

  render() {
    const { showDiv } = this.state;
    return (
      <div className="quicklist-container">
        {showDiv && (
          <Tabs>
            <TabList>
              {Object.keys(QuickListData).map((v, i) => (
                <Tab key={i}>{v}</Tab>
              ))}
            </TabList>
            {Object.keys(QuickListData).map((v, index) => (
              <TabPanel key={index}>
                <ul className="quicklist-content">
                  {QuickListData[v].map((item, itemIndex) => (
                    <li className="quicklist-item" key={itemIndex}>
                      <button
                        className="quicklist-item-btn"
                        onClick={this.onButtonPress}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </TabPanel>
            ))}
          </Tabs>
        )}

        <button
          className="quicklist-btn"
          onClick={() => this.setState({ showDiv: !showDiv })}
        >
          {showDiv ? "Hide" : "Quicklist"}
        </button>
      </div>
    );
  }
}

export default HideAndShowDivOnClick;

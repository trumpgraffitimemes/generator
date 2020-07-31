import React, { Component } from "react";
import "../../App.css";

export default class TopImages extends Component {
  constructor() {
    super();
    this.state = {
      imageURL:
        "https://reactnativecode.com/wp-content/uploads/2017/10/Guitar.jpg",
    };
  }

  render() {
    return (
      <div className="featured">
        <h1>Top Featured Memes</h1>
        <div className="featured-images-container">
          <ul className="featured-images">
            <li>
              <img
                className="prof_pic"
                src={require("./aaa.png")}
                alt="blah"
                width="100px"
                height="100px"
                onClick={() =>
                  this.setState({
                    imageURL: require("./aaa.png"),
                  })
                }
              />
            </li>
            <li>
              <img
                className="prof_pic"
                src="https://reactnativecode.com/wp-content/uploads/2017/10/Guitar.jpg"
                alt="one"
                width="100px"
                height="100px"
                onClick={() =>
                  this.setState({
                    imageURL:
                      "https://reactnativecode.com/wp-content/uploads/2017/10/Guitar.jpg",
                  })
                }
              />
            </li>
            <li>
              <img
                className="prof_pic"
                src="https://reactnativecode.com/wp-content/uploads/2018/02/motorcycle.jpg"
                alt="two"
                width="100px"
                height="100px"
                onClick={() =>
                  this.setState({
                    imageURL:
                      "https://reactnativecode.com/wp-content/uploads/2018/02/motorcycle.jpg",
                  })
                }
              />
            </li>
            <li>
              <img
                className="prof_pic"
                src={require("./aaa.png")}
                alt="blah"
                width="100px"
                height="100px"
                onClick={() =>
                  this.setState({
                    imageURL: require("./aaa.png"),
                  })
                }
              />
            </li>
            <li>
              <img
                className="prof_pic"
                src="https://reactnativecode.com/wp-content/uploads/2017/10/Guitar.jpg"
                alt="one"
                width="100px"
                height="100px"
                onClick={() =>
                  this.setState({
                    imageURL:
                      "https://reactnativecode.com/wp-content/uploads/2017/10/Guitar.jpg",
                  })
                }
              />
            </li>
            <li>
              <img
                className="prof_pic"
                src="https://reactnativecode.com/wp-content/uploads/2018/02/motorcycle.jpg"
                alt="two"
                width="100px"
                height="100px"
                onClick={() =>
                  this.setState({
                    imageURL:
                      "https://reactnativecode.com/wp-content/uploads/2018/02/motorcycle.jpg",
                  })
                }
              />
            </li>
            <li>
              <img
                className="prof_pic"
                src={require("./aaa.png")}
                alt="blah"
                width="100px"
                height="100px"
                onClick={() =>
                  this.setState({
                    imageURL: require("./aaa.png"),
                  })
                }
              />
            </li>
            <li>
              <img
                className="prof_pic"
                src="https://reactnativecode.com/wp-content/uploads/2017/10/Guitar.jpg"
                alt="one"
                width="100px"
                height="100px"
                onClick={() =>
                  this.setState({
                    imageURL:
                      "https://reactnativecode.com/wp-content/uploads/2017/10/Guitar.jpg",
                  })
                }
              />
            </li>
            <li>
              <img
                className="prof_pic"
                src="https://reactnativecode.com/wp-content/uploads/2018/02/motorcycle.jpg"
                alt="two"
                width="100px"
                height="100px"
                onClick={() =>
                  this.setState({
                    imageURL:
                      "https://reactnativecode.com/wp-content/uploads/2018/02/motorcycle.jpg",
                  })
                }
              />
            </li>
            <li>
              <img
                className="prof_pic"
                src={require("./aaa.png")}
                alt="blah"
                width="100px"
                height="100px"
                onClick={() =>
                  this.setState({
                    imageURL: require("./aaa.png"),
                  })
                }
              />
            </li>
          </ul>
        </div>

        <div className="selectedImage">
          <img
            src={this.state.imageURL}
            width="100px"
            height="100px"
            alt="blah"
          />
        </div>
      </div>
    );
  }
}

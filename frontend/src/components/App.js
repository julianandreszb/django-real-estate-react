import React, { Component } from "react";
import { render } from "react-dom";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
    };
  }

  render() {
    return (
      <h1>TEST</h1>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
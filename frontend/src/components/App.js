import React, { Component } from "react";
import { render } from "react-dom";
import { StylesProvider } from '@material-ui/styles';
import Button from "@material-ui/core/Button";

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
      <StylesProvider injectFirst>
        <Button> I am a Button </Button>
      </StylesProvider>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
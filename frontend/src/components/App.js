import React, {useState} from "react";
import ReactDOM from "react-dom";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from './theme';
import * as Constants from './Constants';
// import {Provider} from 'react-redux'
// import store from './redux/store'
import Home from './Home.js';
import SignUp from "./SignUp";


const App = () => {

    const [currentComponentName, setCurrentComponentName] = useState(Constants.HOME_WINDOW_NAME);

    function handleCurrentComponentNameChange(currentComponentName) {
        setCurrentComponentName(currentComponentName);
    }

    const classes = {
        textField: 'myTextFieldClass'
    };

    return (
        <ThemeProvider theme={theme}>
            <Home theme={theme} currentComponentName={currentComponentName} onCurrentComponentNameChange={handleCurrentComponentNameChange} />
            <SignUp classes={classes} currentComponentName={currentComponentName} />
        </ThemeProvider>
    );
};

export default App;

const container = document.getElementById("app");
ReactDOM.render(<App/>, container);
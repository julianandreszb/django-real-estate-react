import React, { useState } from "react";
import ReactDOM from "react-dom";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import  * as Constants from './Constants';
// import { Provider } from 'react-redux'
// import store from './redux/store'
import Home from './Home.js';
import SignUp from "./SignUp";


const App = () => {

    const [currentWindowName, setCurrentWindowName] = useState(Constants.SIGN_UP_WINDOW_NAME);
    const classes = {
        textField: 'myTextFieldClass'
    };

    return (
        <ThemeProvider theme={theme}>
            <Home theme={theme} currentWindowName={currentWindowName}/>
            <SignUp classes={classes} currentWindowName={currentWindowName}/>
        </ThemeProvider>
    );
};

export default App;

const container = document.getElementById("app");
ReactDOM.render(<App/>, container);
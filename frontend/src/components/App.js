import React, { useState } from "react";
import ReactDOM from "react-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import Home from './Home.js';
import  * as Constants from './Constants';

import ThemeProvider from "@material-ui/styles/ThemeProvider";

const App = () => {

    const [data, setData] = useState([]);
    const [currentWindowName, setCurrentWindowName] = useState(Constants.HOME_WINDOW_NAME);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Home theme={theme} currentWindowName={currentWindowName} />
        </ThemeProvider>
    );
};

export default App;

const container = document.getElementById("app");
ReactDOM.render(<App/>, container);
import React from "react";
import ReactDOM from "react-dom";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from './theme';
import Dashboard from './pages/dashboard/Dashboard';
import SignUp from "./pages/signup/SignUp";
import {AppContextProvider} from "./app-context";
import LogIn from "./pages/login/LogIn";

const App = () => {
    return (
        <AppContextProvider>
            <ThemeProvider theme={theme}>
                <Dashboard theme={theme}/>
                <LogIn/>
                <SignUp/>
            </ThemeProvider>
        </AppContextProvider>
    );
};

export default App;

const container = document.getElementById("app");
ReactDOM.render(<App/>, container);
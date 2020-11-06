import React, { useState } from "react";
import ReactDOM from "react-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import styled, {ThemeProvider} from 'styled-components';
import Button from "@material-ui/core/Button";
import theme from './theme';
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppBar from "@material-ui/core/AppBar";

const StyledButton = styled(Button)`
  color: ${props => props.theme.palette.primary.main};
  background: black
`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const App = () => {

    const [data, setData] = useState([]);

    const classes = useStyles(theme);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppBar position="static">
              <Toolbar>
                {/*<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">*/}
                {/*  <MenuIcon />*/}
                {/*</IconButton>*/}
                <Typography variant="h6" className={classes.title}>
                  News
                </Typography>
                <Button color="inherit">Login</Button>
              </Toolbar>
            </AppBar>
            <Container maxWidth="sm">
                <Box my={4}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Create React App v4-beta example
                    </Typography>
                    <StyledButton>Styled Button (Edited).</StyledButton>
                    <Button>Button (No edited).</Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default App;

const container = document.getElementById("app");
ReactDOM.render(<App/>, container);
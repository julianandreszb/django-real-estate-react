import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import React, {useState} from "react";
import {HOME_WINDOW_NAME} from './Constants'
import styled from "styled-components";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CssBaseline from "@material-ui/core/CssBaseline";


/**
 * @return {null}
 */
export default function (props) {

    console.log('frontend/src/components/Home.js.props', props);

    if (props.currentWindowName !== HOME_WINDOW_NAME) {
        return null;
    }

    const theme = props.theme;

    const [appTitle, setAppTitle] = useState('RealState');

    const StyledButton = styled(Button)`
      color: ${() => theme.palette.primary.main};
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

    const classes = useStyles(props.theme);

    return <>
        <CssBaseline/>
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {appTitle}
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
    </>
}
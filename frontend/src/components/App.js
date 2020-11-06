import React, { useState } from "react";
import ReactDOM from "react-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import styled, {ThemeProvider} from 'styled-components';
import Button from "@material-ui/core/Button";
import theme from './theme';
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const StyledButton = styled(Button)`
  color: ${props => props.theme.palette.primary.main};
  background: black
`;

const App = () => {

    const [data, setData] = useState([]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
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
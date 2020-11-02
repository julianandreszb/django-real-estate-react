import React, {Component} from "react";
import {render} from "react-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import styled, {ThemeProvider} from 'styled-components';
import Button from "@material-ui/core/Button";
import theme from './theme';
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const StyledButton = styled(Button)`
  color: ${props => props.theme.palette.primary.main};
`;

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
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Container maxWidth="sm">
                    <Box my={4}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Create React App v4-beta example
                        </Typography>
                        <StyledButton>Styled Button</StyledButton>
                        <Button>Button</Button>
                    </Box>
                </Container>
            </ThemeProvider>
        );
    }
}

export default App;

const container = document.getElementById("app");
render(<App/>, container);
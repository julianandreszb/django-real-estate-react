import React from 'react'
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

function CreateAdTemplate(props) {

    return (
        <Container component="main" maxWidth={false}>
            <CssBaseline/>
            {props.createAd}
        </Container>
    );
}

export {CreateAdTemplate}
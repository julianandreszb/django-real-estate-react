import React from 'react'
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";

function CreateAdTemplate(props) {

    return (
        <Container component="main" maxWidth={false}>
            <CssBaseline/>
            {props.createAd}
        </Container>
    );
}

CreateAdTemplate.propTypes = {
    "createAd": PropTypes.element.isRequired,
};

export {CreateAdTemplate}
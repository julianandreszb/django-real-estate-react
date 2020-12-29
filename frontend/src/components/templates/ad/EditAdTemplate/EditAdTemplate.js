import React from 'react'
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";

function EditAdTemplate(props) {

    return (
        <Container component="main" maxWidth={false}>
            <CssBaseline/>
            {props.EditAd}
        </Container>
    );
}

EditAdTemplate.propTypes = {
    "EditAd": PropTypes.element.isRequired,
};

export {EditAdTemplate}
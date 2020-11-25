import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import React from "react";
import PropTypes from "prop-types";

function Copyright(props) {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                {props.appName}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

Copyright.propTypes = {
    "appName": PropTypes.string.isRequired
};

export default Copyright;
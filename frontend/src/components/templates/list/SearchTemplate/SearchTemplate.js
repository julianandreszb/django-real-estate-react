import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";

function SearchTemplate(props) {

    const theme = props.theme;

    const useStyles = makeStyles((theme) => ({}));

    const classes = useStyles(theme);

    return (
        <Container maxWidth="md">
            <Box my={4}>
                {/*<Typography variant="h4" component="h1" gutterBottom>*/}
                {/*    Search ADS*/}
                {/*</Typography>*/}
                <form className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                            {props.operationTypeSelector}
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                            {props.propertyTypeSelector}
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                            {props.searchInput}
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
}

SearchTemplate.propTypes = {
    operationTypeSelector: PropTypes.element.isRequired,
    propertyTypeSelector: PropTypes.element.isRequired,
    searchInput: PropTypes.element.isRequired,
};

export {SearchTemplate}
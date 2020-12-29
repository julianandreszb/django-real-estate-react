import React from 'react'
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        // paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    pagination_container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),

    }
}));

function MyAdsTemplate(props) {

    const classes = useStyles();

    return (
        <Container className={classes.cardGrid} maxWidth={false}>
            {props.listCardItems}
            {/*<div className={classes.pagination_container}>*/}
            {/*    {props.pagination}*/}
            {/*</div>*/}
        </Container>

    );
}

MyAdsTemplate.propTypes = {
    "listCardItems": PropTypes.element.isRequired,
    // "pagination": PropTypes.element.isRequired
};

export {MyAdsTemplate}
import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types'
import {SearchResultTemplate} from "../../templates/list/SearchResultTemplate/SearchResultTemplate";
import CardHeader from "@material-ui/core/CardHeader";

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
        // paddingTop: theme.spacing(8),
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
}));

function ListCardItems(props) {

    const classes = useStyles();

    return (
        <Container className={classes.cardGrid} maxWidth="lg">
            {/* End hero unit */}
            <Grid container spacing={4}>
                {/*{cards.map((card) => (*/}
                {props.listItems.map((card) => (
                    <Grid item key={card.id} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.cardMedia}
                                image="https://source.unsplash.com/random"
                                title="Image title"
                            />
                            <CardHeader
                                title={`$ ${card.price}`}
                                subheader={`${card.total_area} m² area | ${card.rooms} room(s).`}
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography variant="body1">
                                    {card.property_type.name} for {card.operation_type.name}
                                </Typography>
                                <Typography variant="body2">
                                    {card.address}, {card.neighborhood.name}, {card.neighborhood.city.name}, {card.neighborhood.city.department.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );

}

ListCardItems.propTypes = {
    "listItems": PropTypes.arrayOf(PropTypes.object).isRequired
};

export {ListCardItems}
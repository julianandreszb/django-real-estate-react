import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
    },
}));

function GridCharacteristics(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm container>

                        <Grid item xs container direction="column" spacing={1}>
                            <Grid item>
                                <Typography variant="body2" color="textSecondary">
                                    Total area
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" style={{cursor: 'pointer'}}>
                                    {props.ad.total_area} m²
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" color="textSecondary">
                                    Bathrooms
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" style={{cursor: 'pointer'}}>
                                    {props.ad.bathrooms}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid item xs container direction="column" spacing={1}>
                            <Grid item>
                                <Typography variant="body2" color="textSecondary">
                                    Built area
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" style={{cursor: 'pointer'}}>
                                    {props.ad.built_area} m²
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" color="textSecondary">
                                    Parking lots
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" style={{cursor: 'pointer'}}>
                                    {props.ad.parking_lots}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid item xs container direction="column" spacing={1}>
                            <Grid item>
                                <Typography variant="body2" color="textSecondary">
                                    Rooms
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" style={{cursor: 'pointer'}}>
                                    {props.ad.rooms}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" color="textSecondary">
                                    Antiquity
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" style={{cursor: 'pointer'}}>
                                    {props.ad.antiquity}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid item xs container direction="column" spacing={1}>
                            <Grid item>
                                <Typography variant="body2" color="textSecondary">
                                    Address
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" style={{cursor: 'pointer'}}>
                                    {props.ad.address}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

GridCharacteristics.propTypes = {
    "ad": PropTypes.object.isRequired
};

export {GridCharacteristics}
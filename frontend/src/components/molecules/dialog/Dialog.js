import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress';
import makeStyles from "@material-ui/core/styles/makeStyles";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));



function DialogLoading(props) {

    const classes = useStyles();
    const {onClose, open, dialogContentText} = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogContent className={classes.root} >
                <DialogContentText>{dialogContentText}</DialogContentText>
                <LinearProgress />
            </DialogContent>
        </Dialog>
    );
}

DialogLoading.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  dialogContentText: PropTypes.string.isRequired,
};

export default DialogLoading;
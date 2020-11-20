import React from "react";
import PropTypes from 'prop-types'
import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import LinearProgress from "@material-ui/core/LinearProgress";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";

function LoadingDialog(props) {

    const {onClose, open, dialogTitle, dialogContentText} = props;
    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>{dialogContentText}</DialogContentText>
                <LinearProgress/>
            </DialogContent>
        </Dialog>
    );
}

LoadingDialog.propTypes = {
    "onClose": PropTypes.func.isRequired,
    "open": PropTypes.bool.isRequired,
    "dialogTitle": PropTypes.string.isRequired,
    "dialogContentText": PropTypes.string.isRequired,
};

function AlertDialog(props) {
    const {onClose, open, dialogTitle, dialogContentText, dialogContentTextList} = props;
    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
            {dialogContentText !== "" && <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {dialogContentText}
                </DialogContentText>
            </DialogContent>}
            {!!dialogContentTextList && dialogContentTextList.map(item => (
                <ListItem key={item.key}>
                    <ListItemText primary={item.value}/>
                </ListItem>
            ))}
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

AlertDialog.propTypes = {
    "onClose": PropTypes.func.isRequired,
    "open": PropTypes.bool.isRequired,
    "dialogTitle": PropTypes.string.isRequired,
    "dialogContentText": PropTypes.string.isRequired,
    "dialogContentTextList": PropTypes.arrayOf(PropTypes.object) // Optional
};

export {
    LoadingDialog,
    AlertDialog
};
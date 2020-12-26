import React, {useContext, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {requestGetAllOperationTypes} from './OperationTypeUtils';
import PropTypes from 'prop-types'
import {AppContext} from "../../app-context";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

function OperationType(props) {
    const [state, dispatch] = useContext(AppContext);
    const [operationTypes, setOperationTypes] = useState([]);

    useEffect(() => {

        const promiseOperationTypes = async () => requestGetAllOperationTypes();
        promiseOperationTypes().then(response => {
            setOperationTypes(response.data);
        });

    }, []);


    const classes = useStyles();


    const handleChange = (event) => {
        props.handleOnChange(event.target.value)
    };

    return (
        <div className={classes.root}>
            <TextField

                id="outlined-select-currency"
                select
                label="Operation Type"
                value={state.operationType}
                onChange={handleChange}
                // helperText="Please select your option"
                variant="outlined"
            >
                {operationTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </div>
    );
}

OperationType.propTypes = {
    "handleOnChange": PropTypes.func.isRequired
};

export {OperationType}
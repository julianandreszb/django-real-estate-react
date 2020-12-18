import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {requestGetAllOperationTypes} from './OperationTypeUtils';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function OperationType(props) {

    const [operationTypes, setOperationTypes] = useState([]);
    const [optionType, setOptionType] = React.useState(1);

    useEffect(() => {

        const promiseOperationTypes = async () => requestGetAllOperationTypes();
        promiseOperationTypes().then(response => {
            setOperationTypes(response.data);
        });

    }, []);


    const classes = useStyles();


    const handleChange = (event) => {
        setOptionType(event.target.value);
    };

    return (
        <div className={classes.root}>
            <TextField

                id="outlined-select-currency"
                select
                label="Operation Type"
                value={optionType}
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
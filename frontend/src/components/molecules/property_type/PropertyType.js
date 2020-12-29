import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {requestGetAllPropertyTypes} from './PropertyTypeUtils';
import PropTypes from "prop-types";


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

function PropertyType(props) {
    const [propertyTypes, setPropertyTypes] = useState([]);
    const [propertyTypeId, setPropertyTypeId] = useState(props.defaultValue);

    useEffect(() => {

        const promisePropertyTypes = async () => requestGetAllPropertyTypes();
        promisePropertyTypes().then(response => {
            setPropertyTypes(response.data);
        });

    }, []);


    const classes = useStyles();


    const handleChange = (event) => {
        setPropertyTypeId(event.target.value);
        props.handleOnChange(event.target.value);
    };

    return (
        <div className={classes.root}>
            <TextField
                id="outlined-select-currency"
                select
                label="Property Type"
                value={propertyTypeId}
                onChange={handleChange}
                // helperText="Please select your option"
                variant="outlined"
            >
                {propertyTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </div>
    );
}

PropertyType.propTypes = {
    "handleOnChange": PropTypes.func.isRequired,
    "defaultValue": PropTypes.number.isRequired,
};

export {PropertyType}
import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {requestGetAllPropertyTypes} from './PropertyTypeUtils';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function PropertyType(props) {

    const [propertyTypes, setPropertyTypes] = useState([]);
    const [optionType, setOptionType] = React.useState(1);

    useEffect(() => {

        const promisePropertyTypes = async () => requestGetAllPropertyTypes();
        promisePropertyTypes().then(response => {
            setPropertyTypes(response.data);
        });

    }, []);


    const classes = useStyles();


    const handleChange = (event) => {
        setOptionType(event.target.value);
    };

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Select"
                    value={optionType}
                    onChange={handleChange}
                    helperText="Please select your option"
                    variant="outlined"
                >
                    {propertyTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        </form>
    );
}
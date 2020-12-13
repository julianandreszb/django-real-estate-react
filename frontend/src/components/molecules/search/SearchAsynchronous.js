import React, {useContext, useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from "axios";
import PropTypes from "prop-types";
import {LoadingDialog} from "../dialogs/Dialogs";
import {AppContext} from "../../app-context";
import * as Constants from "../../Constants";

const CancelToken = axios.CancelToken;
let cancel;

function SearchAsynchronous(props) {

    const [state, dispatch] = useContext(AppContext);
    const [value, setValue] = useState({label: ''});
    const [inputValue, setInputValue] = useState('');
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleOnInputChange = (event, newInputValue) => {

        setInputValue(newInputValue);
        setOptions([]);

        if (newInputValue.length > 2 && options.length === 0) {

            setLoading(true);

            (async () => {

                if (typeof cancel !== 'undefined') {
                    cancel("Cancelling request.");
                }

                //const response = await axios(`api/test_search/${newInputValue}`, {
                const response = await axios(`${props.url}/${newInputValue}`, {
                    cancelToken: new CancelToken(function executor(c) {
                        // An executor function receives a cancel function as a parameter
                        cancel = c;
                    })
                }).catch((e) => {
                    console.log('axios.error', e);
                });

                if (typeof response !== 'undefined') {
                    const responseData = await response.data;
                    console.log('responseData', responseData);
                    setLoading(false);
                    // setOptions(Object.keys(responseData).map((key) => responseData[key].item[0]));
                    setOptions(Object.keys(responseData).map((key) => responseData[key]));
                }
            })();
        }
    };

    useEffect(() => {

    }, [loading]);

    return (
        <Autocomplete
            id="asynchronous-demo"
            freeSolo={true}
            style={{width: 300}}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionSelected={(option, value) => option.label === value.label}//Do not filter. Show all options
            // getOptionLabel={(option) => option.name}
            getOptionLabel={(option) => option.label}
            options={options}
            loading={loading}
            value={value}
            onChange={(event, newValue) => {
                event.preventDefault();
                console.log('onChange.previousValue', value);
                console.log('onChange.newValue', newValue);
                props.handleOnChange(newValue);
                setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={handleOnInputChange}
            filterOptions={(options, state) => options}
            clearOnBlur={false}// TODO if value false then it triggers a fetch/axios request once you select an AutoComplete option
            // clearOnBlur={true}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Asynchronous"
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}

SearchAsynchronous.propTypes = {
    "url": PropTypes.string.isRequired,
    "handleOnChange": PropTypes.func.isRequired
};

export {SearchAsynchronous};
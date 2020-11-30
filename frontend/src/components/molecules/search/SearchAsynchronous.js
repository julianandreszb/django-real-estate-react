import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from "axios";

const CancelToken = axios.CancelToken;
let cancel;

export default function SearchAsynchronous() {

    const [value, setValue] = useState({name: ''});
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

                const response = await axios(`api/test_search/${newInputValue}`, {
                    cancelToken: new CancelToken(function executor(c) {
                        // An executor function receives a cancel function as a parameter
                        cancel = c;
                    })
                }).catch((e) => {
                    console.log('axios.error', e);
                });

                if (typeof response !== 'undefined') {
                    const responseData = await response.data;
                    setLoading(false);
                    setOptions(Object.keys(responseData).map((key) => responseData[key].item[0]));
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
            getOptionSelected={(option, value) => option.name === value.name}//Do not filter. Show all options
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            value={value}
            onChange={(event, newValue) => {
                console.log('onChange.previousValue', value);
                console.log('onChange.newValue', newValue);
                setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={handleOnInputChange}
            filterOptions={(options, state) => options}
            clearOnBlur={false}
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

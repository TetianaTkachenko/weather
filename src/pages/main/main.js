import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import { useEffect } from 'react';
import { weatherApi } from '../../api';
import { useContext } from 'react';
import { CurrentCityContext } from '../../components/context';
import { useNavigate } from 'react-router';
import style from './main.module.css'

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export default function Asynchronous() {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;
    const [searchQuery, setSearchQuery] = useState(null)
    const [woeid, setWoeid] = useState('')
    const [, dispatch] = useContext(CurrentCityContext)
    const navigate = useNavigate()

    useEffect(() => {
        let active = true;

        if (!searchQuery) {
            return undefined;
        }

        (async () => {
            await sleep(1e3);

            if (active) {
                weatherApi.getLocationsList(searchQuery)
                    .then(res => {
                        setOptions(res.data)
                    })
            }
        })();

        return () => {
            active = false;
        };
    }, [searchQuery]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    useEffect(() => {
        if (!woeid) {
            return
        }
        dispatch({ type: 'SET_CURRENT_CITY_ID', payload: woeid })
        navigate(`/api/location/${woeid}`)
    }, [woeid, dispatch, navigate])

    const handleChange = ({ woeid }) => {
        setWoeid(woeid)
    }

    return (
        <div>
            <div className={style.wraper}>
                <div className={style.containner}>
                    <Autocomplete
                        id="asynchronous-demo"
                        sx={{ width: 600 }}
                        autoSelect='true'
                        autoComplete
                        open={open}
                        onOpen={() => {
                            setOpen(true);
                        }}
                        onClose={() => {
                            setOpen(false);
                        }}
                        renderOption={(props, option) => {
                            return (
                                <li {...props} key={option.woeid}>
                                    {option.title}
                                </li>
                            );
                        }}
                        onInputChange={(event, newInputValue) => {
                            setSearchQuery(newInputValue)
                        }}
                        onChange={(e, woeid) => {
                            handleChange(woeid)
                        }}
                        isOptionEqualToValue={(option, value) => option.title === value.title}
                        getOptionLabel={(option) => option.title}
                        options={options}
                        loading={loading}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Your city"
                                onChange={e => setSearchQuery(e.target.value)}
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                    ),
                                }}
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    );
}
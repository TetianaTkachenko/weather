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

    const handleChange = ({ woeid }) => {
        dispatch({ type: 'SET_CURRENT_CITY_ID', payload: woeid })
        navigate(`/api/location/${woeid}`)
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


/*import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useState, useEffect } from 'react';
import { weatherApi } from '../../api';
import style from './main.module.css'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CurrentCityContext } from '../../components/context';
import { Box } from '@mui/material';

export default function Main() {
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [responseListCitys, setResponseListCitys] = useState([])
    const [woeid, setWoeid] = useState('')
    const [, dispatch] = useContext(CurrentCityContext)
    console.log('weo', woeid)
    console.log('ser', search)
    console.log('responseListCitys', responseListCitys.map(item => item.title))
    useEffect(() => {
        if (!search) {
            return
        }
        weatherApi.getLocationsList(search)
            .then(res => {
                setResponseListCitys(res.data)
                setWoeid(res.data.map(id => id.woeid))
                dispatch({ type: 'SET_CURRENT_CITY_ID', payload: res.data })
            })
    }, [search, dispatch])

    const handleClick = () => {
        navigate(`/api/location/${woeid}`)
        setWoeid(null)
    }

    const flatProps = {
        options: responseListCitys.map((option) => (option.title))
    }

    return (
        <div>
            <div className={style.wraper}>
                <div className={style.containner}>
                    <Stack spacing={1} sx={{ width: 600 }}>
                        <Autocomplete
                            {...flatProps}
                            id="flat-demo"
                            options={responseListCitys}
                            getOptionLabel={responseListCitys.map((option) => (option.title))}
                            isOptionEqualToValue={(option, value) =>
                                option.title === value.title
                            }
                            noOptionsText={'We did not find your city'}
                            key={option => option.id}
                            blurOnSelect='mouse'
                            //onChange={e => setSearch(e.target.value)}

                            onChange={(blurOnSelect) => {
                                if (blurOnSelect) {
                                    handleClick()
                                }
                            }}
                            renderOption={(prop, responseListCitys) => (
                                <Box component='li' {...prop} >
                                    {responseListCitys.title}
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Your city"
                                    variant="standard"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                            )}
                        />
                    </Stack>
                    <div className={style.btnSend}>
                        <Button
                            onClick={handleClick}
                            variant="contained"
                            endIcon={<SendIcon />}>
                            Search
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
} */
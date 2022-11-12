import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { CurrentCityContext } from '../context';
import ForecastContainer from '../ForecastContainer/ForecastContainer';
import style from './Main.module.css'

export default function Main() {
    const [searchQuery, setSearchQuery] = useState('')
    const [, dispatch] = useContext(CurrentCityContext)
    const [isSearchClick, setIsSearchClick] = useState(false)

    useEffect(() => {
        if (!isSearchClick) {
            return
        }
        dispatch({ type: 'SET_SEARCH_QUERY', searchQuery: searchQuery })
        setIsSearchClick(false)
    }, [searchQuery, setIsSearchClick, dispatch, isSearchClick])

    const handleClick = () => {
        setIsSearchClick(true)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            setIsSearchClick(true)
        }
    }

    return (
        <div className={style.wraper}>
            <div className={style.mainContainer}>
                <div className={style.container}>
                    <Box
                        onKeyDown={handleKeyDown}
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '500px' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            onChange={e => setSearchQuery(e.target.value)}
                            id="standard-basic"
                            label="Your city"
                            variant="standard" />
                    </Box>
                    <Box
                        onClick={handleClick}
                        sx={{ '& > :not(style)': { m: 1 } }}>
                        <Fab
                            size="small"
                            variant="extended">
                            <SearchIcon
                                fontSize='small'
                            />
                            Search
                        </Fab>
                    </Box>
                </div>
                <ForecastContainer
                />
            </div>
        </div>
    );
}

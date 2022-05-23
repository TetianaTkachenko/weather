import React, { createContext, useReducer } from 'react'

const initialState = {
    woeid: null,
    currentDate: null
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_CURRENT_CITY_ID':
            return {
                ...state,
                woeid: action.payload
            }
        case 'SET_CURRENT_DATE':
            return {
                ...state,
                currentDate: action.payload
            }
        default:
            return state
    }
}

export const CurrentCityContext = createContext()

export const CurrentCityProvider = ({ children }) => {
    const value = useReducer(reducer, initialState)
    return (
        <CurrentCityContext.Provider value={value}>
            {children}
        </CurrentCityContext.Provider>
    )
}
import React, { createContext, useReducer } from 'react'

const initialState = {
    searchQuery: ''
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_SEARCH_QUERY':
            return {
                ...state,
                searchQuery: action.searchQuery
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
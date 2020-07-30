import React, { useReducer, useContext } from 'react'
import DataReducer, { ACTIONS } from '../reducer/DataReducer'
import { categories } from '../datas/data'


export const DataContext = React.createContext()

export function useDatas() {
    return useContext(DataContext)
}

const initialState = {
    datas: {
        login: false
    },
    providers:[],
    categories:[]
}

export function DataProvider({ children }) {
    const [ state, dispatch ] = useReducer(DataReducer, initialState)

    const addData = (name, value) => {
        dispatch({
            type: ACTIONS.ADD_DATA,
            payload: {name, value}
        })
    }
    const removeData = (name) => {
        dispatch({
            type: ACTIONS.REMOVE_DATA,
            payload: name
        })
    }
    const addAllCategories = (categories) => {
        dispatch({
            type: ACTIONS.ADDALL_CATEGORIES,
            payload: categories
        })
    }

    return (
        <DataContext.Provider value={{data: state, addData, removeData, addAllCategories}}>
            {children}
        </DataContext.Provider>
    )
}

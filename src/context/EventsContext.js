import React, { useReducer, useContext } from 'react'
import EventsReducer, { ACTIONS } from '../reducer/EventsReducer'
import Events from '../data/events'


const EventContext = React.createContext()

export function useEvents() {
    return useContext(EventContext)
}

const initialState = {
    events:Events
}

export function EventProvider({ children }) {
    const [ state, dispatch ] = useReducer(EventsReducer, initialState)

    const addEvent = (title, start, end) => {
        dispatch({
            type: ACTIONS.ADD_EVENT,
            payload: {title, start, end}
        })
    }
    const removeEvent = (id) => {
        dispatch({
            type: ACTIONS.REMOVE_EVENT,
            payload: id
        })
    }

    return (
        <EventContext.Provider value={{events: state.events, addEvent, removeEvent}}>
            {children}
        </EventContext.Provider>
    )
}

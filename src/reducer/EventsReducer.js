export const ACTIONS = {
    ADD_EVENT: 'add-event',
    REMOVE_EVENT: 'remove-event',
    DRAGNDROP_EVENT: 'drag-and-drop-event',
    RESIZE_EVENT: 'resize-event'
}

export default (state, action) => {
    switch (action.type) {
        case ACTIONS.ADD_EVENT:
            return {
                events: [...state.events, newEvent(action.payload, state.events)]
            }
        case ACTIONS.REMOVE_EVENT:
            return {
                events: state.events.filter(event => {
                    return event.id !== action.payload
                })
            }
        default:
            return state;
    }
}

function newEvent({title, start, end}, events) {
    // let idList = events.map(a => a.id)
    // let newId = Math.max(...idList) + 1
    return { id: Math.max(...events.map(a => a.id)) + 1,title, start, end }
}
import { categories } from "../datas/data"

export const ACTIONS = {
    ADD_DATA: 'add-data',
    REMOVE_DATA: 'remove-data',
    ADDALL_CATEGORIES: 'addAll-Categories'
}

export default (state, action) => {
    switch (action.type) {
        case ACTIONS.ADD_DATA:
            return {
                ...state,
                datas: {...state.datas, [action.payload.name]: action.payload.value},
            }
        case ACTIONS.REMOVE_DATA:
            return state
        case ACTIONS.ADDALL_CATEGORIES:
            return {
                ...state,
                categories: action.payload.map((category)=> {
                    return {name: category.name, id: category.id}
                })
            }
        default:
            return state
    }
}

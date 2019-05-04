import {FilterActionTypes, SET_VISIBILITY_FILTER} from "../actions";
import {FilterState} from "../models";

const initialState: FilterState = {
    filter: "SHOW_ALL"
}

export default function visibilityFilter(state = initialState, action: FilterActionTypes): FilterState {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return {
                filter: action.filter
            }
        default:
            return state
    }
}
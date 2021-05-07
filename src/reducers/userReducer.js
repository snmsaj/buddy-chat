import { combineReducers } from 'redux';
import * as actionTypes from '../actions/actionTypes';

const initialUserState = {
    currentUser: null,
    isLoading: true
}

const user_reducer = (state = initialUserState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                currentUser: action.payload.currentUser,
                isLoading: false
            }
        case actionTypes.CLEAR_USER:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
}


const initialGroupState = {
    currentGroup: null,
}

const group_reducer = (state = initialGroupState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_GROUP:
            return {
                ...state,
                currentGroup: action.payload.currentGroup,
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    user: user_reducer,
    group: group_reducer
});

export default rootReducer;
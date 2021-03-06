import * as actionTypes from './actionTypes';

export const setUser = (user) => {
    return {
        type: actionTypes.SET_USER,
        payload: {
            currentUser:user
        }
    }
}

export const clearUser = () => {
    return {
        type: actionTypes.CLEAR_USER
    }
}


export const setCurrentGroup = (group) => {
    return {
        type: actionTypes.SET_CURRENT_GROUP,
        payload: {
            currentGroup:group
        }
    }
}
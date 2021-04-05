import * as constants from "../../Constants";

const defaultState = {
    sessionID: null,
    userID: null,
    username: null,
    connected: false,
}

export default function sessionReducer(state = defaultState, action) {
    switch (action.type) {
        case constants.ADD_SESSION:
            const {sessionID, userID, username} = action.payload;
            localStorage.setItem('s.id', sessionID);
            localStorage.setItem("userID", userID);
            localStorage.setItem("username", username);
            return {...action.payload, connected: true};
        case constants.LEAVE:
            localStorage.removeItem("s.id")
            localStorage.removeItem("userID")
            localStorage.removeItem("username")
            return defaultState;
        default:
            return state;
    }
}
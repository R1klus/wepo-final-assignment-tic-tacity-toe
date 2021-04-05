import * as constants from "../../Constants";

export default function usersReducer(state = [], action) {
    switch (action.type) {
        case constants.USERS:
            const userID = localStorage.getItem("userID")
            return action.payload.filter(u => u.userID !== userID)
        case constants.CONNECTED_USER:
            let connectedUser = state.find(u => u.userID === action.payload.userID)
            if (connectedUser) {
                connectedUser.connected = true
                return [...state]
            } else {
                return [...state, action.payload];
            }
        case constants.DISCONNECTED_USER:
            let disconnectedUser = state.find(u => u.userID === action.payload)
            if (disconnectedUser) {
                disconnectedUser.connected = false
                return [...state]
            } else {
                return [...state, action.payload];
            }
        case constants.USER_LEFT:
            return state.filter(u => u.userID !== action.payload)
        default:
            return state;
    }
}

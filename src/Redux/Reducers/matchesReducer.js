import * as constants from "../../Constants";


export default function matchesReducer(state = [], action) {
    switch (action.type) {
        case constants.MATCHES:
            return action.payload;
        case constants.NEW_MATCH:
            return [...state, action.payload];
        case constants.MATCH_ENDED:
            let match = state.find(m => m.matchId === action.payload.matchId)
            match.isOngoing = false;
            match.winner = action.payload.winner
            return [...state]

        default:
            return state;
    }
}
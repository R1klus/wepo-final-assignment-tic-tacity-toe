import * as constants from "../../Constants"

const defaultState = {
    matchID: null,
    fromUser: null,
    accepted: undefined,
}

export default function challengeReducer(state = defaultState, action) {
    switch (action.type) {
        case constants.GAME_CHALLENGE_ACCEPTED:
            return {
                matchID: action.payload.matchID,
                fromUser: action.payload.fromUser,
                accepted: true,
            }
        case constants.GAME_CHALLENGE_DECLINED:
            return {
                matchID: null,
                fromUser: action.payload,
                accepted: false,
            }
        case constants.CLEAR_CHALLENGE:
            return defaultState
        default:
            return state;
    }
}
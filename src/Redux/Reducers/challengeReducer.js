import * as constants from "../../Constants"

const defaultState = {
    matchID: null,
    fromUser: null,
    accepted: false,
}

export default function challengeReducer (state = defaultState, action) {
    switch (action.type){
        case constants.GAME_CHALLENGE_ACCEPTED:
            return {
                matchID: action.payload.matchId,
                fromUser: action.payload.fromUser,
                accepted: true
            }
        case constants.GAME_CHALLENGE_DECLINED:
            return {
                matchID: null,
                fromUser: action.payload,
                accepted: false
            }
        default: return state;
    }
}
import * as constants from "../../Constants"

const defaultState = {
    symbol: null,
    idx: null,
    won: false,
    draw: false,
    winner: null,
}

export default function gameReducer(state = defaultState, action) {
    switch (action.type) {
        case constants.GAME_MOVE:
            return {
                symbol: action.payload.symbol,
                idx: action.payload.idx,
                won: false,
                draw: false,
                winner: null
            }
        case constants.MATCH_ENDED:
            if (state === defaultState) return defaultState
            const {winner} = action.payload
            if (winner === null) {
                return {
                    symbol: null,
                    idx: 0,
                    won: false,
                    draw: true,
                    winner: null
                }
            } else {
                return {
                    symbol: null,
                    idx: 0,
                    won: true,
                    draw: false,
                    winner: winner
                }
            }
        case constants.CLEAR_MATCH:
            return defaultState
        default:
            return state;
    }
}
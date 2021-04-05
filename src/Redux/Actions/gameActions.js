import * as constants from "../../Constants";

const gameMove = (matchId, symbol, index, isGameWinningMove, isDraw) => ({
    type: constants.MAKE_MOVE,
    payload: {
        matchId: matchId,
        symbol: symbol,
        idx: index,
        isGameWinningMove: isGameWinningMove,
        isDraw: isDraw
    }
})

const clearMatch = () => ({
    type: constants.CLEAR_MATCH,
})

export {
    gameMove,
    clearMatch
}
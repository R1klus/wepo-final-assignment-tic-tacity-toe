import * as constants from "../../Constants";

const acceptChallenge = (matchId, toUserId) => ({
    type: constants.ACCEPT_CHALLENGE,
    payload: {matchId: matchId, toUserId:toUserId}
})

export {
    acceptChallenge
}
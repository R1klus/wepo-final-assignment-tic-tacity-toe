import * as constants from "../../Constants"

const removeChallenge = userID => ({
    type: constants.REMOVE_CHALLENGE,
    payload: userID
})

export {
    removeChallenge
}
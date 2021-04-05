import * as constants from "../../Constants";

const clearSession = session => ({
    type: constants.CLEAR_SESSION,
    payload: session
})

const leave = () => ({
    type: constants.LEAVE
})

export {
    clearSession,
    leave,
}
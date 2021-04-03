import * as constants from "../../Constants";

const addSession = session => ({
    type: constants.ADD_SESSION,
    payload: session
})

const clearSession = session => ({
    type: constants.CLEAR_SESSION,
    payload: session
})

const leave = () => ({
    type: constants.LEAVE
})

export {
    addSession,
    clearSession,
    leave,
}
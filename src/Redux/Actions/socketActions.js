import * as constants from "../../Constants"

const connectSocket = info => ({
    type: constants.CONNECT_SOCKET,
    payload: info
})

const emitToSocket = (evt, body) => ({
    type: constants.SOCKET_EMISSION,
    payload: { evt, body }
})

export {
    connectSocket,
    emitToSocket,
}
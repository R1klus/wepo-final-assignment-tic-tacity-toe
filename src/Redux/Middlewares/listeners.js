import * as constants from "../../Constants";

export const setupListeners = (store, socket) => {
    socket.on("session", session => store.dispatch(({
        type: constants.ADD_SESSION,
        payload: session
    })));

    socket.on("users", users => store.dispatch(({
        type: constants.USERS,
        payload: users
    })));

    socket.on("connected_user", user => store.dispatch(({
        type: constants.CONNECTED_USER,
        payload: user
    })));

    socket.on("disconnected_user", userID => store.dispatch(({
        type: constants.DISCONNECTED_USER,
        payload: userID
    })));

    socket.on("user_left", userID => store.dispatch(({
        type: constants.USER_LEFT,
        payload: userID
    })));

    socket.on("game_challenge", user => store.dispatch(({
        type: constants.GAME_CHALLENGE,
        payload: user
    })));

    socket.on("game_challenge_accepted", (matchID, fromUser) => store.dispatch(({
        type: constants.GAME_CHALLENGE_ACCEPTED,
        payload: {matchID: matchID, fromUser: fromUser}
    })));

    socket.on("game_challenge_declined", fromUser => store.dispatch(({
        type: constants.GAME_CHALLENGE_DECLINED,
        payload: fromUser
    })));

    socket.on("matches", matches => store.dispatch(({
        type: constants.MATCHES,
        payload: matches
    })));

    socket.on("new_match", newMatch => store.dispatch(({
        type: constants.NEW_MATCH,
        payload: newMatch
    })));

}
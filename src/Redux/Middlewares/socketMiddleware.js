import * as constants from "../../Constants";
import {setupListeners} from "./listeners"
import io from "socket.io-client";

const socket = io("http://localhost:8080", {
    autoConnect: false
});

const socketMiddleware =
    store => {
        setupListeners(store, socket);
        return next => action => {
            if (action.type === constants.CONNECT_SOCKET){
                const {sessionID, username} = action.payload;
                socket.auth = {sessionID: sessionID, username: username};
                socket.connect()
            }

            if (action.type === constants.SOCKET_EMISSION){
                const {evt, body} = action.payload;
                socket.emit(evt, body);
            }

            if (action.type === constants.ACCEPT_CHALLENGE){
                const {matchId, toUserId} = action.payload;
                socket.emit("game_challenge_accepted", matchId, toUserId);
            }

            if (action.type === constants.LEAVE){
                socket.emit("leave");
                socket.disconnect();
            }

            if(action.type === constants.MAKE_MOVE){
                const {matchId, symbol, idx, isGameWinningMove, isDraw} = action.payload;
                socket.emit("game_move", matchId, symbol, idx, isGameWinningMove, isDraw)
            }

            return next(action);
        }
    }

export default socketMiddleware;
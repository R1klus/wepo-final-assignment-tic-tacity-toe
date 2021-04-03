import { combineReducers } from "redux";
import users from "./userReducer";
import session from "./sessionReducer";
import challenges from "./challengesReducer";
import challenge from "./challengeReducer";
import matches from "./matchesReducer";


export default combineReducers({
    users,
    session,
    challenges,
    challenge,
    matches
})

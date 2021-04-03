import * as constants from "../../Constants";

export default function matchesReducer(state = [], action){
    switch (action.type){
        case constants.MATCHES:
            return action.payload;
        case constants.NEW_MATCH:
            return [...state, action.payload];
        default: return state;
    }
}
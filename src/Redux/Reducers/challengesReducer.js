import * as constants from "../../Constants"

export default function challengesReducer (state = [], action) {
    switch (action.type){
        case constants.GAME_CHALLENGE:
            const {challenger} = action.payload
            return [...state, challenger]
        default: return state;
    }
}
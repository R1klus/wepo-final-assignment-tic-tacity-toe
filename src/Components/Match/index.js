
import './styles.scss';
import Button from "../Button";
import {useDispatch, useSelector} from "react-redux";
import {emitToSocket} from "../../Redux/Actions/socketActions";
import {acceptChallenge} from "../../Redux/Actions/challengeActions";
import {useEffect, useState} from "react";
import { v4 as uuid} from "uuid";


const Match = ({ matchId, participants, winner, isOngoing }) => {


    return (
        <div className="match">
            <div>
                {participants[0].username} : {participants[0].symbol}<br/>
                {participants[1].username} : {participants[1].symbol}
            </div>
            <div>
                {winner ? "Winner: "+winner.username : ""}
            </div>
            <div>
                {!winner && !isOngoing && "Draw"}
            </div>
            <div>
                {isOngoing ? "Is on going":"Finished"}
            </div>
        </div>
    )
}


export default Match;
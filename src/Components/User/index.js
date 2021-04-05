
import './styles.scss';
import Button from "../Button";
import {useDispatch, useSelector} from "react-redux";
import {emitToSocket} from "../../Redux/Actions/socketActions";
import {acceptChallenge} from "../../Redux/Actions/challengeActions";
import {useEffect, useState} from "react";
import { v4 as uuid} from "uuid";
import {useHistory} from "react-router-dom";


const User = ({ username, userID, connected }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const challenges = useSelector(({challenges}) => challenges)
    const [challenger, setChallenger] = useState(undefined)
    const acceptDeclineButtons = "acceptDeclineButtons" + userID
    const challengeButton = "challengeButton" + userID

    const onChallenge = () => {
        let button = document.getElementById(challengeButton)
        button.innerHTML = "Challenged"
        button.disabled = true;
        dispatch(emitToSocket('game_challenge', userID))
    }

    const onChallengeResponse = (accepted) => {
        document.getElementById(acceptDeclineButtons).style.display = "none";

        setChallenger(undefined)
        if (accepted){
            const matchID = uuid();
            dispatch(acceptChallenge(matchID, userID))
            history.push("/match/"+matchID)
        }
        else {
            dispatch(emitToSocket("game_challenge_declined", userID))
        }
    }

    useEffect(() => {
        setChallenger(challenges.find(c => c.userID === userID))
    }, [challenges, userID])

    useEffect(() => {
        setChallenger(challenger)
    }, [challenger])

    useEffect(() => {
        setChallenger(challenges.find(c => c.userID === userID))
    }, [])

    return (
        <div className="user">
            <div>
                {username}
            </div>
            <div>
                {connected ? "Connected":"Disconnected"}
            </div>
            {challenger === undefined ? <Button id={challengeButton} onClick={onChallenge}>Challenge</Button>
            :
                <div id={acceptDeclineButtons}>
                    <Button onClick={() => {onChallengeResponse(true)}}>Accept</Button>
                    <Button onClick={() => {onChallengeResponse(false)}}>Decline</Button>
                </div>
            }

        </div>
    )
}


export default User;
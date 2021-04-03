
import './styles.scss';
import Button from "../Button";
import {useDispatch, useSelector} from "react-redux";
import {emitToSocket} from "../../Redux/Actions/socketActions";
import {acceptChallenge} from "../../Redux/Actions/challengeActions";
import {useEffect, useState} from "react";
import { v4 as uuid} from "uuid";


const User = ({ username, userID, connected }) => {
    const dispatch = useDispatch();
    const challenges = useSelector(({challenges}) => challenges);
    const [challenge, setChallenge] = useState({});
    const acceptDeclineButtons = "acceptDeclineButtons" + userID
    const challengeButton = "challengeButton" + userID


    useEffect(() => {
        if (challenges.find(challenger => challenger.userID === userID)){
            setChallenge(challenges.find(challenger => challenger.userID === userID))
        }
    }, [challenges, userID])

    useEffect(() => {
        setChallenge(challenge)
    }, [challenge])


    const onChallenge = () => {
        let button = document.getElementById(challengeButton)
        button.innerHTML = "Challenged"
        button.disabled = true;
        dispatch(emitToSocket('game_challenge', userID))
    }

    const onChallengeResponse = (accepted) => {
        document.getElementById(acceptDeclineButtons).style.display = "none";

        setChallenge({})
        if (accepted){
            const matchID = uuid();
            dispatch(acceptChallenge(matchID, userID))
        }
        else {
            dispatch(emitToSocket("game_challenge_declined", userID))
        }
    }

    return (
        <div className="user">
            <div>
                {username}
            </div>
            <div>
                {connected ? "Connected":"Disconnected"}
            </div>
            {Object.keys(challenge).length === 0 && <Button id={challengeButton} onClick={onChallenge}>Challenge</Button>}
            {Object.keys(challenge).length !== 0 &&
            <div id={acceptDeclineButtons}>
                <Button onClick={() => {onChallengeResponse(true)}}>Accept</Button>
                <Button onClick={() => {onChallengeResponse(false)}}>Decline</Button>
            </div>
            }

        </div>
    )
}


export default User;
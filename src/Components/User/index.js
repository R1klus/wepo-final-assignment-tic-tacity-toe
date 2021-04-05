import './styles.scss';
import Button from "../Button";
import {useDispatch, useSelector} from "react-redux";
import {emitToSocket} from "../../Redux/Actions/socketActions";
import {acceptChallenge} from "../../Redux/Actions/challengeActions";
import {useEffect, useState} from "react";
import {v4 as uuid} from "uuid";
import {useHistory} from "react-router-dom";
import {removeChallenge} from "../../Redux/Actions/challengesActions";
import toastr from "toastr";


const User = ({username, userID, connected}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const challenges = useSelector(({challenges}) => challenges)
    const users = useSelector(({users}) => users)
    const matches = useSelector(({matches}) => matches)
    const challenge = useSelector(({challenge}) => challenge)
    const [challenger, setChallenger] = useState(undefined)
    const [busy, setBusy] = useState(false);
    const [challenged, setChallenged] = useState(false);
    const acceptDeclineButtons = "acceptDeclineButtons" + userID
    const challengeButton = "challengeButton" + userID

    const onChallenge = () => {
        setChallenged(true)
        dispatch(emitToSocket('game_challenge', userID))
    }

    const onChallengeResponse = (accepted) => {
        setChallenged(false)
        setChallenger(undefined)
        if (accepted) {
            const matchID = uuid();
            dispatch(acceptChallenge(matchID, userID))
            history.push("/match/" + matchID)
        } else {
            dispatch(emitToSocket("game_challenge_declined", userID))
        }
    }

    useEffect(() => {
        setChallenger(challenges.find(c => c.userID === userID))
    }, [challenges])

    useEffect(() => {
        setChallenger(challenger)
    }, [challenger])

    useEffect(() => {
        setChallenger(challenges.find(c => c.userID === userID))
    }, [])


    useEffect(() => {
        for (let match of matches) {
            if (match.isOngoing) {
                for (let participant of match.participants) {
                    if (participant.username === username) {
                        setBusy(true)
                        dispatch(removeChallenge(participant.userID))
                        break;
                    }
                }
                break
            } else {
                setBusy(false)
            }
        }

    }, [matches])

    useEffect(() => {
        if (challenge.fromUser !== null) {
            if (challenge.accepted && challenge.fromUser.username === username) {
                const user = users.find(u => u.userID === challenge.fromUser.userID);
                toastr.success(user.username, " has accepted your challenge!")
                setChallenged(false)
                history.push("/match/" + challenge.matchID)
            }
            if (!challenge.accepted && challenge.fromUser.username === username) {
                const user = users.find(u => u.userID === challenge.fromUser.userID);
                setChallenged(false)
                toastr.error(user.username, " has declined your challenge!")
            }
        }
    }, [challenge])

    return (
        <div className="user">
            <div>
                {username}
            </div>
            <div>
                {connected ? "Connected" : "Disconnected"}
            </div>
            {connected &&
            <div>
                {busy ? "Busy" : "Available"}
            </div>
            }
            {challenged &&
            <div>
                Challenged
            </div>
            }
            {connected && !busy && !challenged &&
            (challenger === undefined ? <Button id={challengeButton} onClick={onChallenge}>Challenge</Button>
                    :
                    <div id={acceptDeclineButtons}>
                        <Button onClick={() => {
                            onChallengeResponse(true)
                        }}>Accept</Button>
                        <Button onClick={() => {
                            onChallengeResponse(false)
                        }}>Decline</Button>
                    </div>
            )
            }
        </div>
    )
}


export default User;
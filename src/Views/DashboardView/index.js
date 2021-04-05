import './styles.scss';
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import toastr from "toastr"

import Navigation from '../../Components/Navigation';
import Users from '../../Components/Users';
import Matches from "../../Components/Matches";
import {connectSocket, emitToSocket} from '../../Redux/Actions/socketActions';
import {useHistory} from "react-router-dom";
import {clearChallenge} from "../../Redux/Actions/challengeActions";
import {clearMatch} from "../../Redux/Actions/gameActions";


const DashboardView = () => {
    const users = useSelector(({users}) => users);
    const matches = useSelector(({matches}) => matches)
    const challenge = useSelector(({challenge}) => challenge)
    const dispatch = useDispatch();
    const history = useHistory();

    if (localStorage.getItem("s.id")) {
        const sID = localStorage.getItem("s.id")
        dispatch(connectSocket({sessionID: sID}));
    }

    useEffect(() => {
        for (let user of users) {
            for (let match of matches) {
                if (match.isOngoing) {
                    for(let participant of match.participants){
                        if (participant.userID === user.userID){
                            let button = document.getElementById("challengeButton" + user.userID)
                            button.disabled = true;
                            button.innerHTML = "Busy"
                        }
                    }
                } else {
                    let button = document.getElementById("challengeButton" + user.userID)
                    if (button !== null) {
                        button.disabled = false;
                        button.innerHTML = "Challenge"
                    }

                }
            }
        }
    }, [matches])

    useEffect(() => {
        for (let user of users) {
            let button = document.getElementById("challengeButton" + user.userID)
            if (button === null) return;
            if (!user.connected) {
                button.style.display = "none";
            } else {
                button.style.display = "block";
            }
        }
    }, [users])

    useEffect(() => {
        if (challenge.accepted && challenge.fromUser !== null) {
            console.log(challenge, "this is challenge")
            const user = users.find(u => u.userID === challenge.fromUser.userID);
            let button = document.getElementById("challengeButton" + user.userID)
            button.disabled = false;
            button.innerHTML = "Challenge"
            button.style.display = "none"
            toastr.success(user.username, " has accepted your challenge!")
            console.log("going to match!")
            dispatch(clearChallenge())
            history.push("/match/" + challenge.matchID)
        }
        if (!challenge.accepted && challenge.fromUser !== null) {
            const user = users.find(u => u.userID === challenge.fromUser.userID);
            let button = document.getElementById("challengeButton" + user.userID)
            button.disabled = false;
            button.innerHTML = "Challenge"
            button.style.display = "block";
            dispatch(clearChallenge())
            toastr.error(user.username, " has declined your challenge!")
        }
    }, [challenge])

    useEffect(() => {
        dispatch(emitToSocket("users"));
        dispatch(emitToSocket("matches"));
    }, [dispatch])

    return (
        <div className="dashboard">
            <Navigation/>
            <Users users={users}/>
            <Matches matches={matches}/>
        </div>
    );
}

export default DashboardView;
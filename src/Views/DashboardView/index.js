
import './styles.scss';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useState} from "react";
import toastr from "toastr"

import Navigation from '../../Components/Navigation';
import Users from '../../Components/Users';
import Matches from "../../Components/Matches";
import {connectSocket, emitToSocket} from '../../Redux/Actions/socketActions';


const DashboardView = () => {
    const users = useSelector(({users}) => users);
    const matches = useSelector(({matches}) => matches)
    const challenge = useSelector(({challenge}) => challenge)
    const dispatch = useDispatch();


    if (localStorage.getItem("s.id")){
        const sID = localStorage.getItem("s.id")
        dispatch(connectSocket({sessionID: sID}));
    }

    useEffect(() => {

        if (challenge.accepted && challenge.fromUser !== null){
            const user = users.find(u => u.userID === challenge.fromUser.userID);
            let button = document.getElementById("challengeButton"+user.userID)
            button.disabled = false;
            button.innerHTML = "Challenge"
            toastr.success(user.username, " has accepted your challenge!")
        }
        if (!challenge.accepted && challenge.fromUser !== null){
            const user = users.find(u => u.userID === challenge.fromUser.userID);
            let button = document.getElementById("challengeButton"+user.userID)
            button.disabled = false;
            button.innerHTML = "Challenge"
            toastr.error(user.username, " has declined your challenge!")
        }
    }, [challenge])

    useEffect(() => {
        dispatch(emitToSocket("users"));
        dispatch(emitToSocket("matches"))
    }, [dispatch])

    console.log(matches)

    return (
        <div className="dashboard">
            <Navigation />
            <Users users={users} />
            <Matches matches={matches}/>
        </div>
    );
}

export default DashboardView;
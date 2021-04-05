import './styles.scss';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import Navigation from '../../Components/Navigation';
import Users from '../../Components/Users';
import Matches from "../../Components/Matches";
import {connectSocket, emitToSocket} from '../../Redux/Actions/socketActions';


const DashboardView = () => {
    const users = useSelector(({users}) => users);
    const matches = useSelector(({matches}) => matches)
    const dispatch = useDispatch();

    if (localStorage.getItem("s.id")) {
        const sID = localStorage.getItem("s.id")
        dispatch(connectSocket({sessionID: sID}));
    }

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
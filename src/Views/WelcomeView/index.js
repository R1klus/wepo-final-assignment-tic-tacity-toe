import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { connectSocket } from '../../Redux/Actions/socketActions';
import './styles.scss';
import Button from '../../Components/Button';

const WelcomeView = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");

    if (localStorage.getItem("s.id")){
        const sID = localStorage.getItem("s.id")
        dispatch(connectSocket({sessionID: sID}));
    }

    const onChooseUserName = username => {
        dispatch(connectSocket({username}));
    }

    return (
        <div className="welcome-view-container container">
            <div className="input-container">
                <label htmlFor="avatar">Choose your nickname</label>
                <input
                    autoFocus
                    id="nickname"
                    name="username"
                    type="text"
                    placeholder="Enter your username..."
                    value={username}
                    onChange={e => setUsername(e.target.value)} />
                <Button onClick={() => onChooseUserName(username)} style={{ float: 'right', marginTop: 10 }}>Select</Button>
            </div>
        </div>
    )
}

export default WelcomeView;
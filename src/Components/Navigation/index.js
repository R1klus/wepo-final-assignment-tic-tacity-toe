import './styles.scss';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from "react-router-dom";
import Button from "../Button";
import {leave} from "../../Redux/Actions/sessionActions";

const Navigation = () => {
    const session = useSelector(({session}) => session);
    const history = useHistory();
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(leave())
        history.push("/")
    }

    return (
        <nav className="navigation">
            <div className="userName">{session.username}</div>
            <Button onClick={() => logout()} style={{marginTop: 10}}>Logout</Button>
        </nav>
    );
}

export default Navigation;
import './styles.scss';
import User from '../User';

const Users = ({users}) => (
    <div className="users">
        <h2>Users</h2>
        {users.map(u => <User key={u.userID} {...u} />)}
    </div>
);

export default Users;
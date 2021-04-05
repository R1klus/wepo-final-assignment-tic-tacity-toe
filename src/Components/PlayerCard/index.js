
import "./styles.scss";

const PlayerCard = ({username, symbol}) => (
    <div className="player-card">
        <label>Username: {username}</label>
        <label>Symbol: {symbol}</label>
    </div>
);

export default PlayerCard;
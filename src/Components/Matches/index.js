import './styles.scss';
import Match from '../Match';

const Matches = ({matches}) => (
    <div className="matches">
        <h2>Matches</h2>
        {matches.map(m => <Match key={m.matchId} {...m} />)}
    </div>
);

export default Matches;
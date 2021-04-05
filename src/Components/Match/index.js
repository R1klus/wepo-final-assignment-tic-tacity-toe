import './styles.scss';


const Match = ({participants, winner, isOngoing}) => {
    return (
        <div className="match">
            <div>
                {participants[0].username} : {participants[0].symbol}<br/>
                {participants[1].username} : {participants[1].symbol}
            </div>
            <div>
                {winner ? "Winner: " + winner.username : ""}
            </div>
            <div>
                {!winner && !isOngoing && "Draw"}
            </div>
            <div>
                {isOngoing ? "Is on going" : "Finished"}
            </div>
        </div>
    )
}


export default Match;
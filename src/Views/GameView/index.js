import './styles.scss';
import Button from '../../Components/Button';
import PlayerCard from "../../Components/PlayerCard";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {emitToSocket} from "../../Redux/Actions/socketActions";
import {clearMatch, gameMove} from "../../Redux/Actions/gameActions";
import {clearChallenge} from "../../Redux/Actions/challengeActions";
import {removeChallenge} from "../../Redux/Actions/challengesActions";

const GameView = () => {
    const matches = useSelector(({matches}) => matches);
    const game = useSelector(({game}) => game);
    const users = useSelector(({users}) => users)
    const params = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const {id} = params;
    const [match, setMatch] = useState({});
    const [player, setPlayer] = useState({});
    const [opponent, setOpponent] = useState({});
    const [yourTurn, setYourTurn] = useState(false);
    const [disabledButtons, setDisabledButtons] = useState([])
    const [won, setWon] = useState(false)
    const [draw, setDraw] = useState(false)
    const [moveCounter, incrementCounter] = useState(1)
    const MAX_MOVES = 9
    const [winner, setWinner] = useState(undefined)
    const [playerMoves, setPlayerMoves] = useState
    ([
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
    ])

    const winCombos = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ]


    const findMatch = () => {
        for (let i = 0; i < matches.length; i++) {
            if (matches[i].matchId === id) {
                setMatch(matches[i]);
                assignPlayers(matches[i])
            }
        }
    }

    const assignPlayers = (match) => {
        for (let participant of match.participants) {
            if (participant.userID === localStorage.getItem("userID")) {
                setPlayer(participant)
            } else {
                setOpponent(participant)
            }
        }
    }

    const findTurnOrder = () => {
        if (player.symbol === "X") {
            setYourTurn(true);
        } else {
            setYourTurn(false)
            disableGameBoard()
        }
    }

    const makeMove = (e, idx) => {
        let tempMoves = playerMoves;
        tempMoves[idx - 1] = true;
        setPlayerMoves([...tempMoves])
        incrementCounter(moveCounter + 1)
        dispatch(gameMove(id, player.symbol, idx, checkWin(), checkDraw()))
        setYourTurn(false)
    }

    const checkWin = () => {
        for (let combo of winCombos) {
            if (playerMoves[combo[0] - 1] && playerMoves[combo[1] - 1] && playerMoves[combo[2] - 1]) {
                setWon(true)
                return true
            }
        }
        return false
    }

    const checkDraw = () => {
        if (checkWin()) return;
        if (moveCounter === MAX_MOVES) {
            setDraw(true)
            return true
        }

        return false;
    }

    const disableGameBoard = () => {
        let buttons = document.getElementsByClassName("game-buttons");
        for (let button of buttons) {
            button.disabled = true;
        }
    }

    const redirectDashboard = () => {
        dispatch(clearMatch())
        dispatch(clearChallenge())
        dispatch(removeChallenge(opponent.userID))
        console.log("going to dashboard")
        history.push("/dashboard")
    }

    useEffect(() => {
        findMatch()
    }, [matches])

    useEffect(() => {
        if (won) {
            document.getElementById("redirect-dashboard").disabled = false;
        }else if (draw) {
            document.getElementById("redirect-dashboard").disabled = false;
        }else {
            let buttons = document.getElementsByClassName("game-buttons");
            for (let button of buttons) {
                if (!disabledButtons.includes(button.id)) {
                    button.disabled = !yourTurn;
                } else {
                    button.disabled = true;
                }
            }
        }

    }, [yourTurn])

    useEffect(() => {
        findTurnOrder()
    }, [player])

    useEffect(() => {
        if (won) {
            disableGameBoard()
        }
        if (draw) {
            disableGameBoard()
        }
    }, [won, draw])

    useEffect(() => {
        if (game.idx !== null) {
            if (game.won) {
                disableGameBoard()
                console.log(game, "game inside useEffect")
                setWon(game.won)
                setWinner(game.winner.username)
                setYourTurn(false)
                document.getElementById("redirect-dashboard").disabled = false
                document.getElementById("redirect-dashboard").style.display = "block"
            } else if (game.draw) {
                disableGameBoard()
                setDraw(game.draw)
                setYourTurn(false)
                document.getElementById("redirect-dashboard").disabled = false
                document.getElementById("redirect-dashboard").style.display = "block"
            } else {
                const button = document.getElementById("gameButton" + game.idx);
                button.innerHTML = game.symbol;
                button.disabled = true;
                setDisabledButtons([...disabledButtons, button.id])
                if (game.symbol !== player.symbol) {
                    incrementCounter(moveCounter + 1)
                    setYourTurn(true)
                }
            }
        }

    }, [game])

    useEffect(() => {
        document.getElementById("redirect-dashboard").style.display = "none"
    }, [])

    useEffect(() => {
        for(let user of users){
            if (!user.connected){
                if (user.userID === opponent.userID){
                    dispatch(gameMove(id, player.symbol, null, true, false))
                }
            }
        }
    }, [users])


    return (
        <>
            {draw &&
            <div id="game-header">
                <h2>
                    Draw!
                </h2>
                <Button id="redirect-dashboard" onClick={() => {
                    redirectDashboard()
                }}>Go to Dashboard</Button>
            </div>
            }
            {won &&
            <div id="game-header">
                <h2>
                    {winner} has won!
                </h2>
                <Button id="redirect-dashboard" onClick={() => {
                    redirectDashboard()
                }}>Go to Dashboard</Button>
            </div>
            }
            {!draw && !won &&
            <div id="game-header">
                {yourTurn ?
                    <h2>
                        Your Turn!
                    </h2>
                    :
                    <h2>
                        Opponents Turn!
                    </h2>
                }
                <Button id="redirect-dashboard" onClick={() => {
                    redirectDashboard()
                }}>Go to Dashboard</Button>
            </div>
            }
            {match !== undefined &&
            <div className="game-view-container">

                <PlayerCard username={player.username} symbol={player.symbol}/>
                <div className="game-board container">
                    <Button class={"game-buttons button"} id={"gameButton" + 1} onClick={(e) => makeMove(e, 1)}/>
                    <Button class={"game-buttons button"} id={"gameButton" + 2} onClick={(e) => makeMove(e, 2)}/>
                    <Button class={"game-buttons button"} id={"gameButton" + 3} onClick={(e) => makeMove(e, 3)}/>
                    <Button class={"game-buttons button"} id={"gameButton" + 4} onClick={(e) => makeMove(e, 4)}/>
                    <Button class={"game-buttons button"} id={"gameButton" + 5} onClick={(e) => makeMove(e, 5)}/>
                    <Button class={"game-buttons button"} id={"gameButton" + 6} onClick={(e) => makeMove(e, 6)}/>
                    <Button class={"game-buttons button"} id={"gameButton" + 7} onClick={(e) => makeMove(e, 7)}/>
                    <Button class={"game-buttons button"} id={"gameButton" + 8} onClick={(e) => makeMove(e, 8)}/>
                    <Button class={"game-buttons button"} id={"gameButton" + 9} onClick={(e) => makeMove(e, 9)}/>
                </div>
                <PlayerCard username={opponent.username} symbol={opponent.symbol}/>
            </div>
            }
        </>
    )
};

export default GameView
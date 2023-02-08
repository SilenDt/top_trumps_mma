import Score from "../components/Score"
import CardDisplay from "../components/CardDisplay"

const PlayerContainer = ({score, card, setStat, currentPlayer}) => {

    if (currentPlayer === 'player') {
        return (
            <div className="player-container">
                <Score score={score}/>
                <div className="card">
                    <CardDisplay card={card} setStat={setStat} />
                </div>
            </div>
        )
    } else {

    return (
        <div className="player-container">
            <div className="side-bar">
                <h2>Player</h2>
                <Score score={score}/>
            </div>
            <CardDisplay card={card} setStat={setStat} />
        </div>
    )
}

export default PlayerContainer
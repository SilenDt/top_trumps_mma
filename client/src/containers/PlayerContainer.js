import Score from "../components/Score"
import CardDisplay from "../components/CardDisplay"

const PlayerContainer = ({score, card, setStat}) => {

    

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
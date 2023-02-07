import Score from "../components/Score"
import CardDisplay from "../components/CardDisplay"

const PlayerContainer = ({score, card, gameRound}) => {

    

    return (
        <div className="player-container">
        <Score score={score}/>
        <CardDisplay card={card} gameRound={gameRound} />
        </div>
    )
}

export default PlayerContainer
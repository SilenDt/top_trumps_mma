import Score from "../components/Score"
import CardDisplay from "../components/CardDisplay"

const PlayerContainer = ({score, card, playGame}) => {

    

    return (
        <div className="player-container">
        <Score score={score}/>
        <CardDisplay card={card} playGame={playGame} />
        </div>
    )
}

export default PlayerContainer
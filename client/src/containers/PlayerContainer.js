import Score from "../components/Score"
import CardDisplay from "../components/CardDisplay"

const PlayerContainer = ({score, card, setStat}) => {

    

    return (
        <div className="player-container">
        <Score score={score}/>
        <CardDisplay card={card} setStat={setStat} />
        </div>
    )
}

export default PlayerContainer
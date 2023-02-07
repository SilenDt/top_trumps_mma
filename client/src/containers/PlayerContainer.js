import Score from "../components/Score"
import CardDisplay from "../components/CardDisplay"

const PlayerContainer = ({score, card, setStat}) => {

    

    return (
        <div className="player-container">
            <Score score={score}/>
            <div className="card">
                <CardDisplay card={card} setStat={setStat} />
            </div>
        </div>
    )
}

export default PlayerContainer
import CardDisplay from "../components/CardDisplay"
import Score from "../components/Score"


const ComputerContainer = ({score, card}) => {


    return (
        <div className="computer-container">
            <Score score={score}/>
            <CardDisplay card={card} />
        </div>
    )
}

export default ComputerContainer
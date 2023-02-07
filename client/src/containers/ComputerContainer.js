import CardDisplay from "../components/CardDisplay"
import Score from "../components/Score"


const ComputerContainer = ({score, card}) => {


    return (
        <div className="computer-container">
            <Score score={score}/>
            <CardDisplay card={card} amIcomputer={true}/>
        </div>
    )
}

export default ComputerContainer
import CardDisplay from "../components/CardDisplay"
import Score from "../components/Score"


const ComputerContainer = ({score, card, currentPlayer}) => {

    if ( currentPlayer === 'computer' || currentPlayer === 'computer_again' ){
        return (
            <div className="computer-container">
                <Score score={score}/>
                <div className="card">
                <CardDisplay card={card} hiddenStats={false}/>
                </div>
            </div>
        )
    } else {
        return (
            <div className="computer-container">
                <Score score={score}/>
                <div className="card">
                <CardDisplay card={card} hiddenStats={true}/>
                </div>
            </div>
        )
    }

    return (
        <div className="computer-container">
            <Score score={score}/>
            <div className="card">
                <CardDisplay card={card} amIcomputer={true}/>
            </div>
        </div>
    )

}

export default ComputerContainer
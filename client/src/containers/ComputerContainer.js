import CardDisplay from "../components/CardDisplay"
import Score from "../components/Score"


const ComputerContainer = ({score, card, currentPlayer}) => {

    if ( currentPlayer === 'computer' || currentPlayer === 'computer_again' ){
        return (
            <div className="computer-container">
                <div className="side-bar">
                    <h2>Computer</h2>
                    <Score score={score}/>
                </div>
                    <CardDisplay card={card} hiddenStats={false}/>
            </div>
        )
    } else {
        return (
            <div className="computer-container">
                <div className="side-bar">
                    <h2>Computer</h2>
                    <Score score={score}/>
                </div>
                <CardDisplay card={card} hiddenStats={true}/>
            </div>
        )
    }

}

export default ComputerContainer
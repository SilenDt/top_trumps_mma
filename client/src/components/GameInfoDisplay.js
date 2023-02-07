
const GameInfoDisplay = ({currentPlayer, roundWinner, cardsInDeck}) => {
    
    const showWhosTurn = (currentPlayer) => {
        let whosTurnInfo = ""
        if (currentPlayer === "computer_again") {
            currentPlayer = "computer"
        }
        
        if (currentPlayer === "player") {
            whosTurnInfo = (<p>{currentPlayer}: It's <span className="label-player">your turn</span> pick a stat on your card!</p>)
        } else {
            whosTurnInfo = (<p>{currentPlayer}: It's the <span className="label-computer">computers turn</span>, watch out he's fierce!</p>)
        }
        return (<span className="player-message">{whosTurnInfo}</span>)
    }
    const showLastRoundWinner = (roundWinner) => {
        let roundWinnerInfo = ""
        if (roundWinner === 'first round') {
            roundWinnerInfo = (
                `first round, fight!`
            )
        }  else if (roundWinner === 'player') {
            roundWinnerInfo = (
                `the last round was won by the ${roundWinner}!`
            )
        } else if (roundWinner === 'computer') {
            roundWinnerInfo = (
                `the last round was won by the ${roundWinner}!`
            )
        } else if (roundWinner === 'draw') {
            roundWinnerInfo = (
            `the last round was a ${roundWinner}`
            )
        }
        return (<span className="last-round-message">{roundWinnerInfo}</span>)
    }
    return (
        <div>
        <h4>Turn</h4>
        {showWhosTurn(currentPlayer)}
        <h4>Last round</h4>
        {showLastRoundWinner(roundWinner)}
        <h4>Cards in deck</h4>
        {cardsInDeck}
        </div>
    )
}

export default GameInfoDisplay